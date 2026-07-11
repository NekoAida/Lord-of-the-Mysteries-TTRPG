export class LOTMActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["lotm", "sheet", "actor"],
      template: "systems/lotm/templates/actor/actor-sheet.hbs",
      width: 700,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "core" }]
    });
  }

  /** @override */
  async getData(options) {
    const context = await super.getData(options);
    
    // In V11/V12/V14, system data is accessed via actor.system
    context.system = context.actor.system;
    
    // BUG FIX: Fallback legacy data for existing actors
    context.system.proficiencyBonus = context.system.proficiencyBonus ?? 2;
    context.system.sequence = context.system.sequence ?? 10;
    
    context.encumbrance = this.actor.system.encumbrance || { value: 0, max: 0, pct: 0 };
    
    // Prepare Sequence Display Options
    context.sequenceOptions = [
      { value: 10, label: "Normal Human", selected: context.system.sequence === 10 }
    ];
    for (let i = 9; i >= 0; i--) {
      context.sequenceOptions.push({ value: i, label: `Sequence ${i}`, selected: context.system.sequence === i });
    }

    // Calculate Percentages for Vitals
    context.hpPct = Math.min(100, Math.max(0, (context.system.hp.value / (context.system.hp.max || 1)) * 100));
    context.spiritPct = Math.min(100, Math.max(0, (context.system.spirituality.value / (context.system.spirituality.max || 1)) * 100));

    // Prepare Attributes for UI
    context.attributes = {};
    for (let [key, attr] of Object.entries(context.system.attributes || {})) {
      context.attributes[key] = {
        value: attr.value,
        mod: attr.mod,
        modStr: (attr.mod >= 0 ? "+" : "") + attr.mod,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        proficient: attr.proficient || false
      };
    }

    // Prepare Skills for UI
    context.skills = {};
    const skillLabels = {
      sleightOfHand: "Sleight of Hand"
    };
    for (let [key, skill] of Object.entries(context.system.skills || {})) {
      context.skills[key] = {
        value: skill.value,
        attribute: skill.attribute,
        attrLabel: (skill.attribute || "").substring(0, 3).toUpperCase(),
        label: skillLabels[key] || (key.charAt(0).toUpperCase() + key.slice(1)),
        proficient: skill.proficient || false
      };
    }

    // Prepare items lists
    context.potionFormulas = [];
    context.sealedArtifacts = [];
    context.pathwayPowers = [];
    context.weapons = [];
    context.armors = [];
    context.gears = [];
    
    let totalWeight = 0;
    
    for ( let i of context.actor.items ) {
      if ( i.type === "potion_formula" ) context.potionFormulas.push(i);
      else if ( i.type === "sealed_artifact" ) context.sealedArtifacts.push(i);
      else if ( i.type === "pathway_power" ) context.pathwayPowers.push(i);
      else if ( i.type === "weapon" ) {
        context.weapons.push(i);
        totalWeight += (i.system.weight || 0);
      }
      else if ( i.type === "armor" ) {
        context.armors.push(i);
        totalWeight += (i.system.weight || 0);
      }
      else if ( i.type === "gear" ) {
        context.gears.push(i);
        totalWeight += (i.system.weight || 0) * (i.system.quantity || 1);
      }
    }

    const physique = context.system.attributes?.physique?.value || 10;
    const maxWeight = physique * 10;
    context.encumbrance = {
      value: Math.round(totalWeight * 10) / 10,
      max: maxWeight,
      pct: Math.min(100, Math.max(0, (totalWeight / maxWeight) * 100))
    };

    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if ( !this.isEditable ) return;

    // Item creation is handled by core foundry if we had an add button, but for now we just handle edit/delete
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      if (item) item.sheet.render(true);
    });

    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteEmbeddedDocuments("Item", [li.data("itemId")]);
    });

    // Roll Action
    html.find('.action-roll').click(ev => {
      this.actor.rollAction();
    });

    // Equip Toggle
    html.find('.item-toggle').click(async ev => {
      ev.preventDefault();
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      await item.update({"system.equipped": !item.system.equipped});
    });

    // Skill Rolls
    html.find('.skill-name').click(ev => {
      const skillKey = ev.currentTarget.closest(".skill").dataset.skill;
      this.actor.rollSkill(skillKey);
    });

    // Attribute Rolls
    html.find('.attr-name').click(ev => {
      const attrKey = ev.currentTarget.closest(".attribute").dataset.attr;
      this.actor.rollAttribute(attrKey);
    });

    // Save Rolls
    html.find('.attr-save').click(ev => {
      const attrKey = ev.currentTarget.closest(".attribute").dataset.attr;
      this.actor.rollSave(attrKey);
    });
  }

  /** @override */
  async _onDropItem(event, data) {
    if ( !this.actor.isOwner ) return false;
    const item = await Item.implementation.fromDropData(data);
    
    if (item.type === "ancestry") {
      await this.actor.update({ "system.ancestry": item.name });
    } else if (item.type === "background") {
      await this.actor.update({ "system.background": item.name });
    }
    
    return super._onDropItem(event, data);
  }
}

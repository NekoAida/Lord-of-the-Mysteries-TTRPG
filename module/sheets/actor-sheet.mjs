export class LOTMActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["lotm", "sheet", "actor"],
      template: "systems/lotm/templates/actor/actor-sheet.hbs",
      width: 600,
      height: 750,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }]
    });
  }

  /** @override */
  async getData(options) {
    const context = await super.getData(options);
    
    // In V11/V12/V14, system data is accessed via actor.system
    context.system = context.actor.system;

    // Prepare items lists
    context.potionFormulas = [];
    context.sealedArtifacts = [];
    context.pathwayPowers = [];
    
    for ( let i of context.actor.items ) {
      if ( i.type === "potion_formula" ) context.potionFormulas.push(i);
      else if ( i.type === "sealed_artifact" ) context.sealedArtifacts.push(i);
      else if ( i.type === "pathway_power" ) context.pathwayPowers.push(i);
    }

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
  }
}

export class CharacterBuilderApp extends FormApplication {
  constructor(actor, options) {
    super({}, options);
    this.actor = actor;
  }

  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["lotm", "character-builder"],
      template: "systems/lotm/templates/apps/character-builder.hbs",
      width: 600,
      height: "auto",
      title: "Character Builder",
      closeOnSubmit: true
    });
  }

  async getData() {
    const context = super.getData();
    context.actor = this.actor;
    
    // Fetch from compendiums
    const ancestryPack = game.packs.get("lotm.ancestries");
    const backgroundPack = game.packs.get("lotm.backgrounds");
    
    context.ancestries = ancestryPack ? await ancestryPack.getIndex() : [];
    context.backgrounds = backgroundPack ? await backgroundPack.getIndex() : [];
    
    return context;
  }

  async _updateObject(event, formData) {
    const ancestryId = formData.ancestry;
    const backgroundId = formData.background;
    
    const ancestryPack = game.packs.get("lotm.ancestries");
    const backgroundPack = game.packs.get("lotm.backgrounds");
    
    let itemsToCreate = [];
    let ancestryName = "";
    let backgroundName = "";
    
    if (ancestryPack && ancestryId) {
      const ancestryItem = await ancestryPack.getDocument(ancestryId);
      if (ancestryItem) {
        itemsToCreate.push(ancestryItem.toObject());
        ancestryName = ancestryItem.name;
      }
    }
    
    if (backgroundPack && backgroundId) {
      const backgroundItem = await backgroundPack.getDocument(backgroundId);
      if (backgroundItem) {
        itemsToCreate.push(backgroundItem.toObject());
        backgroundName = backgroundItem.name;
      }
    }
    
    // Create an update object for the Actor
    const updateData = {
      "system.ancestry": ancestryName,
      "system.background": backgroundName,
      "system.attributes.physique.value": formData.physique,
      "system.attributes.agility.value": formData.agility,
      "system.attributes.intellect.value": formData.intellect,
      "system.attributes.perception.value": formData.perception,
      "system.attributes.willpower.value": formData.willpower,
      "system.attributes.presence.value": formData.presence
    };

    // Update Actor data
    await this.actor.update(updateData);
    
    // Add Ancestry and Background items to inventory
    if (itemsToCreate.length > 0) {
      await this.actor.createEmbeddedDocuments("Item", itemsToCreate);
    }
  }
}

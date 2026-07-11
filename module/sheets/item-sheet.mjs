export class LOTMItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["lotm", "sheet", "item"],
      template: "systems/lotm/templates/item/item-sheet.hbs",
      width: 520,
      height: 550,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
    });
  }

  /** @override */
  async getData(options) {
    const context = await super.getData(options);
    context.system = context.item.system;
    
    // Type flags for Handlebars template conditionals
    context.isPotion = this.item.type === "potion_formula";
    context.isSealedArtifact = this.item.type === "sealed_artifact";
    context.isPathwayPower = this.item.type === "pathway_power";

    // Enrich HTML for ProseMirror editors
    context.enriched = {};
    if (context.isPotion) {
      context.enriched.ingredients = await TextEditor.enrichHTML(context.system.ingredients, { async: true });
    } else if (context.isSealedArtifact) {
      context.enriched.description = await TextEditor.enrichHTML(context.system.description, { async: true });
      context.enriched.negativeEffects = await TextEditor.enrichHTML(context.system.negativeEffects, { async: true });
    } else if (context.isPathwayPower) {
      context.enriched.powerEffect = await TextEditor.enrichHTML(context.system.powerEffect, { async: true });
    }

    return context;
  }
}

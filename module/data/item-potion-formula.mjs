const { HTMLField } = foundry.data.fields;

export class PotionFormulaData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      ingredients: new HTMLField({ required: true, initial: "" })
    };
  }
}

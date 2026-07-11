const { NumberField, BooleanField, HTMLField } = foundry.data.fields;

export class ArmorData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new HTMLField({ initial: "" }),
      defense: new NumberField({ required: true, initial: 1, integer: true }),
      equipped: new BooleanField({ required: true, initial: false }),
      weight: new NumberField({ required: true, initial: 0, min: 0 })
    };
  }
}

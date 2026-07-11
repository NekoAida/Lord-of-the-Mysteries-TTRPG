const { NumberField, HTMLField } = foundry.data.fields;

export class GearData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new HTMLField({ initial: "" }),
      quantity: new NumberField({ required: true, initial: 1, min: 0, integer: true }),
      weight: new NumberField({ required: true, initial: 0, min: 0 })
    };
  }
}

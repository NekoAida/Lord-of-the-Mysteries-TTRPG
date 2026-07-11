const { NumberField, StringField } = foundry.data.fields;

export class BeyonderData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      sequence: new NumberField({ required: true, initial: 9, min: 0, max: 9, integer: true }),
      madness: new NumberField({ required: true, initial: 0, min: 0, max: 100, integer: true }),
      anchor: new StringField({ required: true, initial: "" })
    };
  }
}

const { StringField, BooleanField, HTMLField, NumberField } = foundry.data.fields;

export class WeaponData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new HTMLField({ initial: "" }),
      damage: new StringField({ required: true, initial: "1d6+PHY" }),
      equipped: new BooleanField({ required: true, initial: false }),
      weight: new NumberField({ required: true, initial: 0, min: 0 })
    };
  }
}

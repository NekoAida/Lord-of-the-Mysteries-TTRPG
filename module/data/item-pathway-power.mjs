const { NumberField, HTMLField } = foundry.data.fields;

export class PathwayPowerData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      sequenceRequirement: new NumberField({ required: true, initial: 9, min: 0, max: 9, integer: true }),
      powerEffect: new HTMLField({ required: true, initial: "" })
    };
  }
}

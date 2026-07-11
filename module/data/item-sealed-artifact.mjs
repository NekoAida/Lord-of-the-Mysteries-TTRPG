const { HTMLField } = foundry.data.fields;

export class SealedArtifactData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new HTMLField({ required: true, initial: "" }),
      negativeEffects: new HTMLField({ required: true, initial: "" })
    };
  }
}

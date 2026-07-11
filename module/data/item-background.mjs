const { HTMLField, ArrayField, StringField, SchemaField } = foundry.data.fields;

export class BackgroundData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      description: new HTMLField({ initial: "" }),
      features: new ArrayField(new SchemaField({
        name: new StringField({ required: true }),
        description: new HTMLField({ initial: "" })
      })),
      grantedProficiencies: new ArrayField(new StringField())
    };
  }
}

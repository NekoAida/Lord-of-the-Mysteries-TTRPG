const { NumberField, StringField, HTMLField, SchemaField, BooleanField } = foundry.data.fields;

export class BeyonderData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    return {
      sequence: new NumberField({ required: true, initial: 10, min: 0, max: 10, integer: true }),
      proficiencyBonus: new NumberField({ required: true, initial: 2, min: 0, integer: true }),
      ancestry: new StringField({ initial: "" }),
      background: new StringField({ initial: "" }),
      madness: new NumberField({ required: true, initial: 0, min: 0, max: 100, integer: true }),
      anchor: new StringField({ required: true, initial: "" }),
      mutations: new HTMLField({ initial: "" }),
      hp: new SchemaField({
        value: new NumberField({ required: true, initial: 10, integer: true }),
        max: new NumberField({ required: true, initial: 10, integer: true })
      }),
      spirituality: new SchemaField({
        value: new NumberField({ required: true, initial: 100, integer: true }),
        max: new NumberField({ required: true, initial: 100, integer: true })
      }),
      attributes: new SchemaField({
        physique: new SchemaField({ value: new NumberField({ initial: 10, integer: true }), mod: new NumberField({ initial: 0, integer: true }), proficient: new BooleanField({ initial: false }) }),
        agility: new SchemaField({ value: new NumberField({ initial: 10, integer: true }), mod: new NumberField({ initial: 0, integer: true }), proficient: new BooleanField({ initial: false }) }),
        intellect: new SchemaField({ value: new NumberField({ initial: 10, integer: true }), mod: new NumberField({ initial: 0, integer: true }), proficient: new BooleanField({ initial: false }) }),
        perception: new SchemaField({ value: new NumberField({ initial: 10, integer: true }), mod: new NumberField({ initial: 0, integer: true }), proficient: new BooleanField({ initial: false }) }),
        willpower: new SchemaField({ value: new NumberField({ initial: 10, integer: true }), mod: new NumberField({ initial: 0, integer: true }), proficient: new BooleanField({ initial: false }) }),
        presence: new SchemaField({ value: new NumberField({ initial: 10, integer: true }), mod: new NumberField({ initial: 0, integer: true }), proficient: new BooleanField({ initial: false }) })
      }),
      skills: new SchemaField({
        athletics: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "physique" }), proficient: new BooleanField({ initial: false }) }),
        melee: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "physique" }), proficient: new BooleanField({ initial: false }) }),
        firearms: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "agility" }), proficient: new BooleanField({ initial: false }) }),
        stealth: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "agility" }), proficient: new BooleanField({ initial: false }) }),
        sleightOfHand: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "agility" }), proficient: new BooleanField({ initial: false }) }),
        investigation: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "intellect" }), proficient: new BooleanField({ initial: false }) }),
        mysticism: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "intellect" }), proficient: new BooleanField({ initial: false }) }),
        history: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "intellect" }), proficient: new BooleanField({ initial: false }) }),
        awareness: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "perception" }), proficient: new BooleanField({ initial: false }) }),
        insight: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "perception" }), proficient: new BooleanField({ initial: false }) }),
        survival: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "willpower" }), proficient: new BooleanField({ initial: false }) }),
        acting: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "presence" }), proficient: new BooleanField({ initial: false }) }),
        persuasion: new SchemaField({ value: new NumberField({ initial: 0, integer: true }), attribute: new StringField({ initial: "presence" }), proficient: new BooleanField({ initial: false }) })
      }),
      currency: new SchemaField({
        pounds: new NumberField({ initial: 0, min: 0, integer: true }),
        soli: new NumberField({ initial: 0, min: 0, integer: true }),
        pence: new NumberField({ initial: 0, min: 0, integer: true })
      })
    };
  }
}

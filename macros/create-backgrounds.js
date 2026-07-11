// Macro to create Background items in the lotm.backgrounds compendium

const packName = "lotm.backgrounds";
const pack = game.packs.get(packName);

if (!pack) {
  return ui.notifications.error(`Compendium ${packName} not found!`);
}

const backgrounds = [
  {
    name: "Private Detective",
    type: "background",
    img: "icons/tools/instruments/magnifying-glass.webp",
    system: {
      description: "<p>You make a living solving mysteries, tracking down bounties, or finding lost items in the foggy streets.</p>",
      features: [
        { name: "Starting Gear", description: "<p>Revolver, Note pad, Pen, Trench coat.</p>" }
      ],
      grantedProficiencies: ["investigation"]
    }
  },
  {
    name: "Backstreet Urchin",
    type: "background",
    img: "icons/equipment/head/hood-cowl-brown.webp",
    system: {
      description: "<p>You grew up on the harsh streets, learning to survive through quick fingers and staying out of sight.</p>",
      features: [
        { name: "Starting Gear", description: "<p>Dagger, Lockpicks, Tattered clothes.</p>" }
      ],
      grantedProficiencies: ["sleightOfHand"]
    }
  },
  {
    name: "Church Clergy",
    type: "background",
    img: "icons/magic/holy/chalice-glowing-gold-water.webp",
    system: {
      description: "<p>An ordained member of one of the major orthodox Churches. You have a deep understanding of history and theology.</p>",
      features: [
        { name: "Starting Gear", description: "<p>Holy Symbol, Lantern, Vestments, Holy Water.</p>" }
      ],
      grantedProficiencies: ["history"]
    }
  }
];

// Create the new items
const created = await pack.documentClass.createDocuments(backgrounds, {pack: packName});
ui.notifications.info(`Successfully created ${created.length} Backgrounds in ${packName}!`);

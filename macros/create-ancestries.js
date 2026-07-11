// Macro to create Ancestry items in the lotm.ancestries compendium

const packName = "lotm.ancestries";
const pack = game.packs.get(packName);

if (!pack) {
  return ui.notifications.error(`Compendium ${packName} not found!`);
}

const ancestries = [
  {
    name: "Loenese Human",
    type: "ancestry",
    img: "icons/environment/people/commoner.webp",
    system: {
      description: "<p>A typical human from the Loen Kingdom, known for their industrial progress and resourceful nature.</p>",
      features: [
        { name: "Resourceful", description: "<p>You have a knack for finding what you need in urban environments.</p>" }
      ],
      grantedProficiencies: ["persuasion", "firearms"]
    }
  },
  {
    name: "Sanguine",
    type: "ancestry",
    img: "icons/magic/death/blood-corruption-spatter-red.webp",
    system: {
      description: "<p>A creature of the night, gifted with supernatural agility and an affinity for blood and moonlight.</p>",
      features: [
        { name: "Darkvision", description: "<p>You can see in dim light and darkness as if it were bright light.</p>" },
        { name: "Blood Healing", description: "<p>You can consume fresh blood to rapidly heal your wounds.</p>" }
      ],
      grantedProficiencies: ["stealth", "perception"]
    }
  },
  {
    name: "Elf",
    type: "ancestry",
    img: "icons/environment/wilderness/tree-oak-green.webp",
    system: {
      description: "<p>An ancient race connected to nature, the sea, and mysticism. Often seen as graceful and arrogant.</p>",
      features: [
        { name: "Nature Affinity", description: "<p>You are naturally attuned to the chaotic forces of the natural world and storms.</p>" }
      ],
      grantedProficiencies: ["mysticism", "awareness"]
    }
  }
];

// Create the new items
const created = await pack.documentClass.createDocuments(ancestries, {pack: packName});
ui.notifications.info(`Successfully created ${created.length} Ancestries in ${packName}!`);

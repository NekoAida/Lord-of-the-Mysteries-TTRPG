// Macro to generate 22 Pathway Folders and populate The Fool's early sequences

const packName = "lotm.pathways";
const pack = game.packs.get(packName);

if (!pack) {
  return ui.notifications.error(`Compendium ${packName} not found!`);
}

// 1. Define the 22 Pathways
const pathwayNames = [
  "The Fool", "The Door", "The Error", 
  "The Visionary", "The Hanged Man", "The Sun", "The Tyrant", "The White Tower",
  "The Darkness", "The Twilight Giant", "The Death",
  "The Red Priest", "The Demoness",
  "The Wheel of Fortune",
  "The Moon", "The Mother",
  "The Hermit", "The Paragon",
  "The Abyss", "The Chained",
  "The Black Emperor", "The Justiciar"
];

// Clean up existing folders/items for a fresh start if rerunning
// (Uncomment these if you want to wipe the compendium before generating)
/*
await pack.documentClass.deleteDocuments(pack.index.map(i => i._id), {pack: packName});
const oldFolders = pack.folders.map(f => f.id);
if (oldFolders.length > 0) {
  await Folder.deleteDocuments(oldFolders, { pack: packName });
}
*/

const folderData = [];
const subFolderData = [];

// 2. Create Root Folders
for (let name of pathwayNames) {
  folderData.push({
    name: name,
    type: "Item",
    folder: null
  });
}

const createdRoots = await Folder.createDocuments(folderData, { pack: packName });
ui.notifications.info(`Created ${createdRoots.length} Root Pathway Folders.`);

// 3. Create Sub-folders
for (let root of createdRoots) {
  subFolderData.push({
    name: "Pathway Powers",
    type: "Item",
    folder: root.id
  });
  subFolderData.push({
    name: "Potions & Ingredients",
    type: "Item",
    folder: root.id
  });
}

const createdSubs = await Folder.createDocuments(subFolderData, { pack: packName });

// 4. Find the Folders for "The Fool"
const foolRoot = createdRoots.find(f => f.name === "The Fool");
const foolPowersFolder = createdSubs.find(f => f.folder === foolRoot.id && f.name === "Pathway Powers");
const foolPotionsFolder = createdSubs.find(f => f.folder === foolRoot.id && f.name === "Potions & Ingredients");

// 5. Create Items for The Fool (Seq 9 - 7)
const foolItems = [
  // Sequence 9: Seer (Potion)
  {
    name: "Sequence 9: Seer Potion",
    type: "potion_formula",
    folder: foolPotionsFolder.id,
    img: "icons/consumables/potions/potion-flask-corked-blue.webp",
    system: {
      sequence: 9,
      ingredients: "<p><strong>Main:</strong> 10ml Lavos Squid blood, 1 Stellar Aqua Vitae.<br><strong>Supplementary:</strong> 5 drops of pure water, 3 grams of Mint, 7 drops of Rose essence.</p>"
    }
  },
  // Sequence 9: Seer (Power - Danger Intuition)
  {
    name: "Danger Intuition",
    type: "pathway_power",
    folder: foolPowersFolder.id,
    img: "icons/magic/perception/eye-ringed-glow-blue.webp",
    system: {
      sequenceRequirement: 9,
      description: "<p>Grants advantage on [PER] Awareness checks to avoid ambushes or imminent danger.</p>",
      spiritualityCost: 2
    }
  },
  // Sequence 8: Clown (Potion)
  {
    name: "Sequence 8: Clown Potion",
    type: "potion_formula",
    folder: foolPotionsFolder.id,
    img: "icons/consumables/potions/potion-flask-corked-purple.webp",
    system: {
      sequence: 8,
      ingredients: "<p><strong>Main:</strong> Horn of a Mutated Maneater, Crystal of a Pure Clown.<br><strong>Supplementary:</strong> 80ml pure water, 5 grams of Jimsonweed powder.</p>"
    }
  },
  // Sequence 8: Clown (Power - Paper Figurine Substitute)
  {
    name: "Paper Figurine Substitute",
    type: "pathway_power",
    folder: foolPowersFolder.id,
    img: "icons/magic/defensive/shield-barrier-flaming-blue.webp",
    system: {
      sequenceRequirement: 8,
      description: "<p>As a reaction when hit, reduce incoming damage to 0 by swapping places with a paper figurine.</p>",
      spiritualityCost: 5
    }
  },
  // Sequence 7: Magician (Potion)
  {
    name: "Sequence 7: Magician Potion",
    type: "potion_formula",
    folder: foolPotionsFolder.id,
    img: "icons/consumables/potions/potion-flask-corked-red.webp",
    system: {
      sequence: 7,
      ingredients: "<p><strong>Main:</strong> Root of an Illusion Tree, Heart of a Six-Eared Macaque.<br><strong>Supplementary:</strong> ...</p>"
    }
  },
  // Sequence 7: Magician (Power - Flaming Jump)
  {
    name: "Flaming Jump",
    type: "pathway_power",
    folder: foolPowersFolder.id,
    img: "icons/magic/fire/projectile-fireball-blue.webp",
    system: {
      sequenceRequirement: 7,
      description: "<p>Roll [INT] Mysticism. On success, deal 2d6+INT fire damage and instantly teleport up to 30 feet to an open flame.</p>",
      spiritualityCost: 10
    }
  }
];

const createdItems = await pack.documentClass.createDocuments(foolItems, { pack: packName });
ui.notifications.info(`Successfully generated folders and created ${createdItems.length} items for The Fool!`);

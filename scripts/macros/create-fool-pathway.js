// Macro: Create 'Pathway: The Fool' Compendium
// This script creates a Compendium Pack and populates it with 'Fool' Pathway Powers.
// Execute this script in the Foundry VTT macro bar as a GM.

const createFoolPathway = async () => {
  if (!game.user.isGM) {
    return ui.notifications.error("Only the GM can run this macro.");
  }

  const packName = "pathway-the-fool";
  const packLabel = "Pathway: The Fool";
  
  // Find or Create the Compendium
  let pack = game.packs.get(`world.${packName}`);
  if (!pack) {
    ui.notifications.info(`Creating new Compendium Pack: ${packLabel}...`);
    pack = await CompendiumCollection.createCompendium({
      type: "Item",
      label: packLabel,
      name: packName,
      packageType: "world"
    });
  }

  // Define the Pathway Power Items
  const itemsData = [
    {
      name: "Sequence 9: Seer (Danger Intuition)",
      type: "pathway_power",
      img: "icons/svg/eye.svg",
      system: {
        sequenceRequirement: 9,
        powerEffect: `
          <p><strong>Effect:</strong> Grants advantage on [PER] Awareness checks to avoid ambushes.</p>
          <p><strong>Cost:</strong> 2 Spirituality.</p>
        `
      }
    },
    {
      name: "Sequence 8: Clown (Paper Figurine Substitute)",
      type: "pathway_power",
      img: "icons/svg/cowled.svg",
      system: {
        sequenceRequirement: 8,
        powerEffect: `
          <p><strong>Effect:</strong> As a reaction when hit, reduce incoming damage to 0.</p>
          <p><strong>Cost:</strong> 5 Spirituality and 1 Piece of Paper (Gear).</p>
        `
      }
    },
    {
      name: "Sequence 7: Magician (Flame Controlling / Flaming Jump)",
      type: "pathway_power",
      img: "icons/svg/fire.svg",
      system: {
        sequenceRequirement: 7,
        powerEffect: `
          <p><strong>Effect:</strong> Roll [INT] Mysticism. On success, deal 2d6+INT fire damage and teleport up to 30ft. On a Natural 1, the user's Madness increases by 1d4 (Loss of control risk).</p>
          <p><strong>Cost:</strong> 10 Spirituality.</p>
        `
      }
    }
  ];

  // Create the items inside the Compendium
  const createdItems = await Item.createDocuments(itemsData, { pack: pack.collection });
  
  ui.notifications.info(`Successfully added ${createdItems.length} powers to '${packLabel}' Compendium!`);
  console.log("LOTM | Created Compendium Items:", createdItems);
};

createFoolPathway();

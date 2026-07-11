// Macro: Create Sequence 9 Seer Items
// This script creates the initial items for the 'Fool' Pathway (Sequence 9: Seer).
// Execute this script in the Foundry VTT macro bar as a GM.

const createItems = async () => {
  if (!game.user.isGM) {
    return ui.notifications.error("Only the GM can run this macro.");
  }

  // Note: Using the exact internal types defined in the SystemDataModel (lotm.mjs & template.json)
  const itemsData = [
    {
      name: "Sequence 9: Seer Potion",
      type: "potion_formula",
      img: "icons/consumables/potions/potion-flask-corked-blue.webp",
      system: {
        ingredients: `
          <h3>Main Ingredients</h3>
          <ul>
            <li>100ml of Lavos Squid blood</li>
            <li>1 Star Crystal</li>
          </ul>
          <h3>Supplementary Ingredients</h3>
          <ul>
            <li>80ml pure water</li>
            <li>5 drops of Night Vanilla extract</li>
            <li>3 grams of Sika Grass powder</li>
            <li>1 Gold Mint leaf</li>
          </ul>
        `
      }
    },
    {
      name: "Danger Intuition & Spirit Vision",
      type: "pathway_power",
      img: "icons/magic/perception/third-eye-blue-red.webp",
      system: {
        sequenceRequirement: 9,
        powerEffect: `
          <p><strong>Danger Intuition:</strong> A spiritual premonition that warns the Seer of impending danger. It is incredibly accurate but vague on the specific details.</p>
          <p><strong>Spirit Vision:</strong> By tapping their glabella twice, the Seer can see the Auras (Ether Body) and spiritual states of beings, allowing them to gauge health, emotions, and detect supernatural entities.</p>
        `
      }
    },
    {
      name: "Grade 3 - Festering Blood",
      type: "sealed_artifact",
      img: "icons/commodities/materials/liquid-blood-vial-red.webp",
      system: {
        description: `
          <p>A small, ornate silver vial containing constantly bubbling, dark red blood. It emanates a faint scent of rust and decay. When applied to a weapon, it grants the weapon highly corrosive and anti-healing properties.</p>
        `,
        negativeEffects: `
          <p><strong>Curse of the Rotting Blood:</strong> Merely carrying this artifact causes the user's blood to slowly thicken and fester. If kept on the person for more than 4 hours, the user begins taking internal damage. If exposed to the skin, it causes immediate necrosis.</p>
        `
      }
    }
  ];

  // Create the items in the world
  const createdItems = await Item.createDocuments(itemsData);
  
  ui.notifications.info(`Successfully created ${createdItems.length} Seer pathway items! Check your Items tab.`);
  console.log("LOTM | Created Items:", createdItems);
};

createItems();

import { BeyonderData } from "./data/actor-beyonder.mjs";
import { PotionFormulaData } from "./data/item-potion-formula.mjs";
import { SealedArtifactData } from "./data/item-sealed-artifact.mjs";
import { PathwayPowerData } from "./data/item-pathway-power.mjs";
import { WeaponData } from "./data/item-weapon.mjs";
import { ArmorData } from "./data/item-armor.mjs";
import { GearData } from "./data/item-gear.mjs";
import { AncestryData } from "./data/item-ancestry.mjs";
import { BackgroundData } from "./data/item-background.mjs";
import { LOTMActorSheet } from "./sheets/actor-sheet.mjs";
import { LOTMItemSheet } from "./sheets/item-sheet.mjs";
import { LOTMActor } from "./documents/actor.mjs";

Hooks.once("init", () => {
  console.log("LOTM | Initializing Lord of the Mysteries System");

  // Register Document Classes
  CONFIG.Actor.documentClass = LOTMActor;

  // Register Data Models
  CONFIG.Actor.dataModels.beyonder = BeyonderData;
  CONFIG.Item.dataModels.potion_formula = PotionFormulaData;
  CONFIG.Item.dataModels.sealed_artifact = SealedArtifactData;
  CONFIG.Item.dataModels.pathway_power = PathwayPowerData;
  CONFIG.Item.dataModels.weapon = WeaponData;
  CONFIG.Item.dataModels.armor = ArmorData;
  CONFIG.Item.dataModels.gear = GearData;
  CONFIG.Item.dataModels.ancestry = AncestryData;
  CONFIG.Item.dataModels.background = BackgroundData;

  // Register Sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("lotm", LOTMActorSheet, { makeDefault: true });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("lotm", LOTMItemSheet, { makeDefault: true });
});

Hooks.on("renderChatMessage", (message, html, data) => {
  html.find('.push-roll').click(async ev => {
    ev.preventDefault();
    const btn = ev.currentTarget;
    const actorId = btn.dataset.actorId;
    const skillKey = btn.dataset.skillKey;
    const actor = game.actors.get(actorId);
    if (actor) {
      if (skillKey.startsWith("attr_")) {
        await actor.rollAttribute(skillKey.replace("attr_", ""), { isPushed: true });
      } else if (skillKey.startsWith("save_")) {
        await actor.rollSave(skillKey.replace("save_", ""), { isPushed: true });
      } else {
        await actor.rollSkill(skillKey, { isPushed: true });
      }
    }
  });

  html.find('.apply-madness-penalty').click(async ev => {
    ev.preventDefault();
    const btn = ev.currentTarget;
    const actorId = btn.dataset.actorId;
    const actor = game.actors.get(actorId);
    
    if (actor) {
      const roll = new Roll("1d10");
      await roll.evaluate();
      const penalty = roll.total;
      const newMadness = (actor.system.madness || 0) + penalty;
      await actor.update({ "system.madness": newMadness });
      
      ChatMessage.create({
        speaker: ChatMessage.getSpeaker({ actor }),
        content: `
        <div class="lotm-chat-message fatal-madness">
          <h2>Disastrous Failure!</h2>
          <p><strong>${actor.name}</strong> pushed their luck too far and failed!</p>
          <p>They suffer <strong>${penalty}</strong> Madness.</p>
        </div>
        `
      });
      
      btn.disabled = true;
    }
  });
});

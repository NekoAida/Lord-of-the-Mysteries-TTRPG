import { BeyonderData } from "./data/actor-beyonder.mjs";
import { PotionFormulaData } from "./data/item-potion-formula.mjs";
import { SealedArtifactData } from "./data/item-sealed-artifact.mjs";
import { PathwayPowerData } from "./data/item-pathway-power.mjs";
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

  // Register Sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("lotm", LOTMActorSheet, { makeDefault: true });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("lotm", LOTMItemSheet, { makeDefault: true });
});

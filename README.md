# Lord of the Mysteries TTRPG — FoundryVTT System

**🌐 Language / ภาษา:** [English](#features) ・ [ไทย](README.th.md)

A custom-built FoundryVTT system for the Lord of the Mysteries TTRPG, bringing Cuttlefish That Loves Diving's world of Beyonders, Sequences, and Pathways to the virtual tabletop. Created and maintained by **NekoAida**.

## Features

- **Beyonder character sheets** — full actor sheets for player characters with tabbed navigation (Core, Skills, Inventory, Powers, Biography)
- **Six core attributes** — Physique, Agility, Intellect, Perception, Willpower, and Presence with auto-calculated modifiers
- **13 rollable skills** — Athletics, Melee, Firearms, Stealth, Sleight of Hand, Investigation, Mysticism, History, Awareness, Insight, Survival, Acting, and Persuasion — each linked to a governing attribute
- **Attribute & Saving Throw rolls** — d20 + modifier with proficiency bonus support, critical hits, and fumbles
- **Push mechanic** — re-roll failed checks at the risk of gaining Madness
- **Madness system** — tracked from 0–100 with automatic Bout of Madness triggers at thresholds (25, 50, 75) and on large spikes (5+), culminating in Loss of Control at 100
- **Spirituality tracking** — resource bar for Beyonder powers with per-ability costs
- **HP & vitals** — hit points with percentage-based progress bars
- **Sequence progression** — characters advance from Normal Human through Sequence 9 down to Sequence 0
- **22 Pathways of the Divine** — The Fool, The Door, The Error, The Visionary, The Hanged Man, The Sun, The Tyrant, The White Tower, and more — organized with sub-folders for Pathway Powers and Potions & Ingredients
- **Equipment system** — Weapons, Armor, and Gear item sheets with weight tracking and equip toggling
- **Encumbrance** — auto-calculated from carried item weight against Physique-based capacity
- **Pathway Powers** — item type for Beyonder abilities with Sequence requirements and Spirituality costs
- **Potion Formulas** — item type for recording potion ingredients and Sequence associations
- **Sealed Artifacts** — dedicated item type for dangerous mystical relics
- **Ancestry & Background** — drag-and-drop compendium items that grant skill proficiencies and set character identity
- **Character Builder** — guided creation wizard that pulls from Ancestry and Background compendiums and lets players assign attribute scores
- **Proficiency system** — proficiency bonus applied to skills and saves, grantable through Ancestry, Background, or manual toggle
- **Currency** — Pounds, Soli, and Pence tracking on the character sheet
- **Styled chat cards** — custom Handlebars templates for roll results with critical/fumble highlighting and push buttons
- **Compendium packs** — pre-built compendiums for Pathways, Ancestries, and Backgrounds with macro scripts for bulk generation
- **Localization** — English and Thai (ไทย) language support

## Installation

### Manual Install

1. In Foundry VTT, go to **Game Systems → Install System**
2. Paste the following manifest URL:
   ```
   https://github.com/NekoAida/Lord-of-the-Mysteries-TTRPG/releases/latest/download/system.json
   ```
3. Click **Install**

## Compatibility

| Foundry VTT | Status   |
|-------------|----------|
| V14         | Verified |

## System Overview

### Actor Types

| Type     | Description                          |
|----------|--------------------------------------|
| Beyonder | Player character / NPC Beyonder sheet |

### Item Types

| Type           | Description                                         |
|----------------|-----------------------------------------------------|
| Weapon         | Melee and ranged weapons with weight and equip state |
| Armor          | Protective gear with weight and equip toggle         |
| Gear           | General equipment with weight and quantity            |
| Pathway Power  | Beyonder abilities tied to a Sequence and Pathway    |
| Potion Formula | Advancement potion recipes with ingredient lists     |
| Sealed Artifact| Dangerous mystical relics and cursed objects         |
| Ancestry       | Character ancestry granting proficiencies            |
| Background     | Character background granting proficiencies          |

## Source Code Structure

```
css/                    # Compiled stylesheets
└── lotm.css                    # Main system stylesheet
lang/                   # Localization files
├── en.json                     # English language strings
└── th.json                     # Thai (ไทย) language strings
macros/                 # Compendium generation macros
├── create-ancestries.js        # Bulk-creates Ancestry compendium entries
├── create-backgrounds.js       # Bulk-creates Background compendium entries
└── create-pathways.js          # Generates 22 Pathway folders and seed items
module/                 # JS modules that define the system's logic
├── apps/                       # Application windows
│   └── character-builder.mjs           # Guided character creation wizard
├── data/                       # TypeDataModel definitions
│   ├── actor-beyonder.mjs              # Beyonder actor data schema (attributes, skills, currency, madness)
│   ├── item-ancestry.mjs               # Ancestry item data schema
│   ├── item-armor.mjs                  # Armor item data schema
│   ├── item-background.mjs            # Background item data schema
│   ├── item-gear.mjs                   # Gear item data schema
│   ├── item-pathway-power.mjs          # Pathway Power data schema
│   ├── item-potion-formula.mjs         # Potion Formula data schema
│   ├── item-sealed-artifact.mjs        # Sealed Artifact data schema
│   └── item-weapon.mjs                 # Weapon item data schema
├── documents/                  # Document class overrides
│   └── actor.mjs                       # LOTMActor — derived data, rolls, Madness logic
├── sheets/                     # Sheet classes
│   ├── actor-sheet.mjs                 # LOTMActorSheet — Beyonder character sheet
│   └── item-sheet.mjs                  # LOTMItemSheet — universal item sheet
└── lotm.mjs                    # Main entrypoint — registers models, sheets, and hooks
scripts/                # Utility scripts
└── macros/                     # In-world macro scripts
    ├── create-fool-pathway.js          # Seeds The Fool pathway data
    └── create-seer-items.js            # Seeds Sequence 9 Seer items
templates/              # Handlebars HTML templates
├── actor/                      # Actor sheet templates
│   └── actor-sheet.hbs                 # Beyonder character sheet layout
├── apps/                       # Application templates
│   └── character-builder.hbs           # Character Builder form
├── chat/                       # Chat message templates
│   └── custom-roll.hbs                 # Styled roll result cards
└── item/                       # Item sheet templates
    └── item-sheet.hbs                  # Universal item sheet layout
system.json             # FoundryVTT system manifest
template.json           # Actor & Item type definitions
```

## Roadmap

- [ ] NPC / Enemy actor type with simplified sheets
- [ ] Full compendium data for all 22 Pathways (Sequences 9–0)
- [ ] Combat automation and initiative integration
- [ ] Sealed Artifact side-effect tracking
- [ ] Madness Table random roll integration
- [ ] Acting method / Potion digestion mechanics
- [ ] Mutation tracking tied to Madness thresholds

## Credits

**Created by** [NekoAida](https://github.com/NekoAida)

Based on the web novel *Lord of the Mysteries* by Cuttlefish That Loves Diving (爱潜水的乌贼).

This system is a fan-made project and is not affiliated with or endorsed by the original author or publisher.

## License

This project is licensed under the [GNU General Public License (GPL)](https://www.gnu.org/licenses/gpl-3.0.en.html). See [LICENSE](LICENSE) for details.
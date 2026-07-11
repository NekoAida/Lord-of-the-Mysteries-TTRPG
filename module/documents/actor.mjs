export class LOTMActor extends Actor {
  
  /** @override */
  _preUpdate(changed, options, user) {
    super._preUpdate(changed, options, user);
    
    // Check for Madness changes
    if (changed.system?.madness !== undefined) {
      const oldMadness = this.system?.madness || 0;
      const newMadness = changed.system.madness;
      
      const difference = newMadness - oldMadness;
      if (difference >= 5) {
        options.triggerBoutOfMadness = true;
      }
      
      const crossed25 = oldMadness < 25 && newMadness >= 25;
      const crossed50 = oldMadness < 50 && newMadness >= 50;
      const crossed75 = oldMadness < 75 && newMadness >= 75;
      
      if (crossed25 || crossed50 || crossed75) {
        options.triggerBoutOfMadness = true;
      }
    }
  }

  /** @override */
  _onUpdate(changed, options, userId) {
    super._onUpdate(changed, options, userId);
    
    if (options.triggerBoutOfMadness && game.user.id === userId) {
      ChatMessage.create({
        content: `
        <div class="lotm-chat-message fatal-madness">
          <h2>Bout of Madness!</h2>
          <p><strong>${this.name}</strong>'s mind buckles under the strain!</p>
          <p>The Gamemaster must roll on the Madness Table.</p>
        </div>
        `
      });
    }
  }

  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    const system = this.system;
    
    // Calculate attribute modifiers
    if (system.attributes) {
      for (let attr of Object.values(system.attributes)) {
        attr.mod = Math.floor((attr.value - 10) / 2);
      }
    }
  }

  /**
   * Roll a standard d20 action check and evaluate Madness
   */
  async rollAction() {
    // Access the madness stat from the actor's system data
    const madness = this.system.madness || 0;
    
    // Evaluate Madness thresholds before rolling
    if (madness >= 100) {
      ui.notifications.error(`${this.name} has completely lost control!`);
      
      const chatData = {
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
        <div class="lotm-chat-message fatal-madness">
          <h2>Loss of Control</h2>
          <p>The anchors have shattered. Reason has been consumed.</p>
          <p><strong>${this.name}</strong> has mutated into a terrifying monster!</p>
        </div>
        `
      };
      return ChatMessage.create(chatData);
    } 
    
    if (madness > 80) {
      ui.notifications.warn(`${this.name} is nearing loss of control! Whispers fill their mind...`);
    }

    // Standard d20 Roll
    const roll = new Roll("1d20");
    await roll.evaluate();

    const d20 = roll.dice[0].total;

    const templateData = {
      actor: this,
      roll: roll,
      total: roll.total,
      isCrit: d20 === 20,
      isFumble: d20 === 1
    };

    const html = await renderTemplate("systems/lotm/templates/chat/custom-roll.hbs", templateData);

    const chatData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      rolls: [roll],
      content: html,
      sound: CONFIG.sounds.dice
    };

    return ChatMessage.create(chatData);
  }

  /**
   * Roll a specific Skill check
   * @param {string} skillKey The system key for the skill
   */
  async rollSkill(skillKey, { isPushed = false } = {}) {
    const madness = this.system.madness || 0;
    
    // Evaluate Madness thresholds
    if (madness >= 100) {
      ui.notifications.error(`${this.name} has completely lost control!`);
      const chatData = {
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
        <div class="lotm-chat-message fatal-madness">
          <h2>Loss of Control</h2>
          <p>The anchors have shattered. Reason has been consumed.</p>
          <p><strong>${this.name}</strong> has mutated into a terrifying monster!</p>
        </div>
        `
      };
      return ChatMessage.create(chatData);
    } 
    
    if (madness > 80) {
      ui.notifications.warn(`${this.name} is nearing loss of control! Whispers fill their mind...`);
    }

    // Retrieve skill data
    const skill = this.system.skills[skillKey];
    if (!skill) return ui.notifications.error(`Skill ${skillKey} not found!`);
    
    // Format skill label
    let skillLabel = skillKey.charAt(0).toUpperCase() + skillKey.slice(1);
    if (skillKey === "sleightOfHand") skillLabel = "Sleight of Hand";
    
    // Calculate total modifier (Governing Attribute Mod + Skill Value + Proficiency)
    const attrKey = skill.attribute;
    const attrMod = this.system.attributes[attrKey]?.mod || 0;
    
    let isProficient = skill.proficient;
    const items = this.items.filter(i => i.type === "ancestry" || i.type === "background");
    for (const item of items) {
      if (item.system.grantedProficiencies?.includes(skillKey)) {
        isProficient = true;
      }
    }
    
    const profBonus = isProficient ? (this.system.proficiencyBonus || 0) : 0;
    const totalMod = skill.value + attrMod + profBonus;
    
    // Formulate and roll
    const modifierString = totalMod >= 0 ? `+ ${totalMod}` : `- ${Math.abs(totalMod)}`;
    const roll = new Roll(`1d20 ${modifierString}`);
    await roll.evaluate();

    const d20 = roll.dice[0].total;

    const templateData = {
      actor: this,
      actionName: skillLabel,
      roll: roll,
      total: roll.total,
      isCrit: d20 === 20,
      isFumble: d20 === 1,
      skillKey: skillKey,
      isPushed: isPushed
    };

    const html = await renderTemplate("systems/lotm/templates/chat/custom-roll.hbs", templateData);

    const chatData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      rolls: [roll],
      content: html,
      sound: CONFIG.sounds.dice
    };

    return ChatMessage.create(chatData);
  }

  /**
   * Roll an Attribute check
   * @param {string} attrKey The system key for the attribute
   */
  async rollAttribute(attrKey, { isPushed = false } = {}) {
    const madness = this.system.madness || 0;
    
    // Evaluate Madness thresholds
    if (madness >= 100) {
      ui.notifications.error(`${this.name} has completely lost control!`);
      const chatData = {
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
        <div class="lotm-chat-message fatal-madness">
          <h2>Loss of Control</h2>
          <p>The anchors have shattered. Reason has been consumed.</p>
          <p><strong>${this.name}</strong> has mutated into a terrifying monster!</p>
        </div>
        `
      };
      return ChatMessage.create(chatData);
    } 
    
    if (madness > 80) {
      ui.notifications.warn(`${this.name} is nearing loss of control! Whispers fill their mind...`);
    }

    const attr = this.system.attributes[attrKey];
    if (!attr) return ui.notifications.error(`Attribute ${attrKey} not found!`);
    
    const attrLabel = attrKey.charAt(0).toUpperCase() + attrKey.slice(1);
    
    let isProficient = attr.proficient;
    const items = this.items.filter(i => i.type === "ancestry" || i.type === "background");
    for (const item of items) {
      if (item.system.grantedProficiencies?.includes(attrKey)) {
        isProficient = true;
      }
    }
    
    const profBonus = isProficient ? (this.system.proficiencyBonus || 0) : 0;
    const mod = attr.mod + profBonus;
    const modifierString = mod >= 0 ? `+ ${mod}` : `- ${Math.abs(mod)}`;
    
    const roll = new Roll(`1d20 ${modifierString}`);
    await roll.evaluate();

    const d20 = roll.dice[0].total;

    const templateData = {
      actor: this,
      title: `rolls a ${attrLabel} Check`,
      roll: roll,
      total: roll.total,
      isCrit: d20 === 20,
      isFumble: d20 === 1,
      skillKey: `attr_${attrKey}`,
      isPushed: isPushed
    };

    const html = await renderTemplate("systems/lotm/templates/chat/custom-roll.hbs", templateData);

    const chatData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      rolls: [roll],
      content: html,
      sound: CONFIG.sounds.dice
    };

    return ChatMessage.create(chatData);
  }

  /**
   * Roll a Saving Throw
   * @param {string} attrKey The system key for the attribute
   */
  async rollSave(attrKey, { isPushed = false } = {}) {
    const madness = this.system.madness || 0;
    
    // Evaluate Madness thresholds
    if (madness >= 100) {
      ui.notifications.error(`${this.name} has completely lost control!`);
      const chatData = {
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: this }),
        content: `
        <div class="lotm-chat-message fatal-madness">
          <h2>Loss of Control</h2>
          <p>The anchors have shattered. Reason has been consumed.</p>
          <p><strong>${this.name}</strong> has mutated into a terrifying monster!</p>
        </div>
        `
      };
      return ChatMessage.create(chatData);
    } 
    
    if (madness > 80) {
      ui.notifications.warn(`${this.name} is nearing loss of control! Whispers fill their mind...`);
    }

    const attr = this.system.attributes[attrKey];
    if (!attr) return ui.notifications.error(`Attribute ${attrKey} not found!`);
    
    const attrLabel = attrKey.charAt(0).toUpperCase() + attrKey.slice(1);
    
    let isProficient = attr.proficient;
    const items = this.items.filter(i => i.type === "ancestry" || i.type === "background");
    for (const item of items) {
      if (item.system.grantedProficiencies?.includes(attrKey)) {
        isProficient = true;
      }
    }
    
    const profBonus = isProficient ? (this.system.proficiencyBonus || 0) : 0;
    const mod = attr.mod + profBonus;
    const modifierString = mod >= 0 ? `+ ${mod}` : `- ${Math.abs(mod)}`;
    
    const roll = new Roll(`1d20 ${modifierString}`);
    await roll.evaluate();

    const d20 = roll.dice[0].total;

    const templateData = {
      actor: this,
      title: `makes a ${attrLabel} Saving Throw`,
      roll: roll,
      total: roll.total,
      isCrit: d20 === 20,
      isFumble: d20 === 1,
      skillKey: `save_${attrKey}`,
      isPushed: isPushed
    };

    const html = await renderTemplate("systems/lotm/templates/chat/custom-roll.hbs", templateData);

    const chatData = {
      user: game.user.id,
      speaker: ChatMessage.getSpeaker({ actor: this }),
      rolls: [roll],
      content: html,
      sound: CONFIG.sounds.dice
    };

    return ChatMessage.create(chatData);
  }
}

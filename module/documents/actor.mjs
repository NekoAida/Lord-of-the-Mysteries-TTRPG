export class LOTMActor extends Actor {
  
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

    const templateData = {
      actor: this,
      roll: roll,
      total: roll.total,
      isCrit: roll.total === 20,
      isFumble: roll.total === 1
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

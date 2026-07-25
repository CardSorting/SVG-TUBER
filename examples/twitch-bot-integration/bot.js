/**
 * SVG-TUBER Stream Chat Integration Bot Example
 * Listens to Twitch chat commands and triggers avatar expressions over WebSockets
 */

const { tmi } = require('tmi.js');

const TARGET_CHANNEL = process.env.TWITCH_CHANNEL || 'your_channel_name';

const client = new tmi.Client({
  options: { debug: true },
  channels: [ TARGET_CHANNEL ]
});

client.connect();

console.log(`🤖 SVG-TUBER Chat Bot listening on channel: ${TARGET_CHANNEL}`);

client.on('message', (channel, tags, message, self) => {
  if (self) return;
  const msg = message.trim().toLowerCase();

  if (msg === '!blush') {
    console.log(`✨ Triggering expression: blush from viewer ${tags['display-name']}`);
    sendVTuberCommand({ type: 'EXPRESSION', payload: 'blush' });
  } else if (msg === '!angry') {
    console.log(`💢 Triggering expression: angry from viewer ${tags['display-name']}`);
    sendVTuberCommand({ type: 'EXPRESSION', payload: 'angry' });
  } else if (msg === '!boba') {
    console.log(`🧋 Equipping prop: boba from viewer ${tags['display-name']}`);
    sendVTuberCommand({ type: 'PROP', payload: 'boba' });
  } else if (msg === '!visor') {
    console.log(`🕶️ Equipping prop: glasses from viewer ${tags['display-name']}`);
    sendVTuberCommand({ type: 'PROP', payload: 'glasses' });
  }
});

function sendVTuberCommand(cmd) {
  // Send JSON command over WebSocket or postMessage API
  console.log('Sending JSON command:', JSON.stringify(cmd));
}

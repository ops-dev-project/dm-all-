const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

const GUILD_ID = '1432472817005236326';
const UPDATE_INTERVAL_MS = 60_000; // mise à jour toutes les 60 secondes

async function updateStatus() {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    await guild.members.fetch();

    const onlineCount = guild.members.cache.filter(
      (m) => !m.user.bot && m.presence && m.presence.status !== 'offline'
    ).size;

    client.user.setPresence({
      status: 'online',
      activities: [
        {
          name: `✅ Membres Actifs sur Topia : ${onlineCount}`,
          type: 4, // type 4 = Custom Status
        },
      ],
    });

    console.log(`🔄 Status mis à jour — Membres en ligne : ${onlineCount}`);
  } catch (err) {
    console.error('❌ Erreur mise à jour status :', err);
  }
}

client.once('ready', async () => {
  console.log(`✅ Status bot connecté en tant que ${client.user.tag}`);
  await updateStatus();
  setInterval(updateStatus, UPDATE_INTERVAL_MS);
});

// Met à jour aussi dès qu'une présence change sur le serveur
client.on('presenceUpdate', () => {
  updateStatus();
});

client.login(process.env.DISCORD_TOKEN);
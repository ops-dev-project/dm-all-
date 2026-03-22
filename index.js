const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

// ─── Configuration ────────────────────────────────────────────────────────────
const GUILD_ID = '1432472817005236326';
const PREFIX   = '!';

const DM_CONFIGS = {
  dm_test: {
    label: '📢 DM Test',
    roleId: '1485339839480991976',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais une nouvelle annonce test est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1485340839839404042`,
    style: ButtonStyle.Secondary,
  },
  dm_update: {
    label: '🔧 DM Update',
    roleId: '1481277922508669008',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais une nouvelle update est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1455549648742649916`,
    style: ButtonStyle.Primary,
  },
  dm_annonce: {
    label: '📣 DM Annonce',
    roleId: '1481278248737443890',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais une nouvelle annonce est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1432477328918970459`,
    style: ButtonStyle.Primary,
  },
  dm_partenariat: {
    label: '🤝 DM Partenariat',
    roleId: '1481277964233736202',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais un nouveau partenariat est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1433843875826634903`,
    style: ButtonStyle.Success,
  },
  dm_event: {
    label: '🎉 DM Event',
    roleId: '1481399298653421618',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais un nouvelle évènement est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1475852783818379406`,
    style: ButtonStyle.Success,
  },
  dm_giveway: {
    label: '🎁 DM Giveway',
    roleId: '1481278404845109340',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais un nouveau giveway est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1461368197386207404`,
    style: ButtonStyle.Success,
  },
  dm_leak: {
    label: '🔒 DM Leak',
    roleId: '1474488055007154196',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais un nouveau leak est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1433024837848137799`,
    style: ButtonStyle.Danger,
  },
  dm_candid_modo: {
    label: '🛡️ DM Candid Modo',
    roleId: '1481277169949868094',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais une nouvelle campagne recrutement de modérateurs est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1432477328918970459`,
    style: ButtonStyle.Primary,
  },
  dm_candid_support: {
    label: '🎧 DM Candid Support',
    roleId: '1481277274505613403',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais une nouvelle campagne recrutement de supports / helpeurs est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1432477328918970459`,
    style: ButtonStyle.Primary,
  },
  dm_candid_dev: {
    label: '💻 DM Candid Dev',
    roleId: '1481277768498155540',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais une nouvelle campagne recrutement de devellopeurs est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1432477328918970459`,
    style: ButtonStyle.Primary,
  },
  dm_candid_testers: {
    label: '🧪 DM Candid Testers',
    roleId: '1481278994002215105',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais une nouvelle campagne recrutement de testers est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1432477328918970459`,
    style: ButtonStyle.Secondary,
  },
  dm_candid_videastes: {
    label: '🎥 DM Candid Vidéastes',
    roleId: '1481277267429822514',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais une nouvelle campagne recrutement de Vidéaste est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1432477328918970459`,
    style: ButtonStyle.Secondary,
  },
  dm_recrutement_rp: {
    label: '🎮 DM Recrutement Accès RP',
    roleId: '1481277817005146234',
    message: (mention) =>
      `${mention} Salut, je souhaite pas te déranger mais une nouvelle campagne recrutements d'Accès RP est apparu sur Topia FR RP donc n'hésite pas à allez voir ! https://discord.com/channels/1432472817005236326/1432477328918970459`,
    style: ButtonStyle.Danger,
  },
};

// ─── Build panel embed + boutons ─────────────────────────────────────────────
function buildPanel() {
  const embed = new EmbedBuilder()
    .setTitle('DM All')
    .setDescription('Commandes DM All')
    .setColor(0x5865f2);

  const keys = Object.keys(DM_CONFIGS);
  const rows = [];

  // Rangées des 13 boutons normaux (5 max par rangée)
  for (let i = 0; i < keys.length; i += 5) {
    const row = new ActionRowBuilder();
    for (const key of keys.slice(i, i + 5)) {
      const cfg = DM_CONFIGS[key];
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(key)
          .setLabel(cfg.label)
          .setStyle(cfg.style)
      );
    }
    rows.push(row);
  }

  // Dernière rangée : bouton Urgence All seul
  const urgenceRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('dm_urgence_all')
      .setLabel('🚨 Urgence All')
      .setStyle(ButtonStyle.Danger)
  );
  rows.push(urgenceRow);

  return { embed, rows };
}

// ─── Vérifie que c'est le proprio (couronne) ─────────────────────────────────
function isOwner(guildOwnerId, userId) {
  return guildOwnerId === userId;
}

// ─── Ready ────────────────────────────────────────────────────────────────────
client.once('ready', () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
});

// ─── Commande !dmall ──────────────────────────────────────────────────────────
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(PREFIX)) return;

  const command = message.content.slice(PREFIX.length).trim().toLowerCase();
  if (command !== 'dmall') return;

  if (!isOwner(message.guild.ownerId, message.author.id)) {
    return message.reply('❌ Seul le propriétaire du serveur 👑 peut utiliser cette commande.');
  }

  const { embed, rows } = buildPanel();
  await message.channel.send({ embeds: [embed], components: rows });

  // Supprime le message de commande pour garder le chat propre
  await message.delete().catch(() => {});
});

// ─── Boutons ──────────────────────────────────────────────────────────────────
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const { customId } = interaction;

  if (!isOwner(interaction.guild.ownerId, interaction.user.id)) {
    return interaction.reply({
      content: '❌ Seul le propriétaire du serveur 👑 peut utiliser ces boutons.',
      ephemeral: true,
    });
  }

  await interaction.deferReply({ ephemeral: true });

  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    await guild.members.fetch();

    // ── Urgence All : DM tout le monde ──
    if (customId === 'dm_urgence_all') {
      const members = guild.members.cache.filter((m) => !m.user.bot);
      let success = 0;
      let failed = 0;

      for (const [, member] of members) {
        try {
          await member.send(
            `${member.toString()} 🚨 **URGENCE** 🚨 — Un message urgent vient d'être envoyé sur **Topia FR RP**. Connecte-toi dès que possible ! https://discord.com/channels/1432472817005236326`
          );
          success++;
          await new Promise((r) => setTimeout(r, 500));
        } catch {
          failed++;
        }
      }

      return interaction.editReply({
        content: `🚨 **Urgence All terminé !**\n📨 **Succès :** ${success}\n❌ **Échecs (DMs fermés) :** ${failed}\n👥 **Total ciblé :** ${members.size}`,
      });
    }

    // ── Boutons normaux ──
    const config = DM_CONFIGS[customId];
    if (!config) return interaction.editReply({ content: '❌ Bouton inconnu.' });

    const members = guild.members.cache.filter(
      (m) => m.roles.cache.has(config.roleId) && !m.user.bot
    );

    let success = 0;
    let failed = 0;

    for (const [, member] of members) {
      try {
        await member.send(config.message(member.toString()));
        success++;
        await new Promise((r) => setTimeout(r, 500));
      } catch {
        failed++;
      }
    }

    await interaction.editReply({
      content: `✅ DMs envoyés !\n📨 **Succès :** ${success}\n❌ **Échecs (DMs fermés) :** ${failed}\n👥 **Total ciblé :** ${members.size}`,
    });

  } catch (err) {
    console.error(err);
    await interaction.editReply({ content: `❌ Une erreur est survenue : ${err.message}` });
  }
});

client.login(process.env.DISCORD_TOKEN);

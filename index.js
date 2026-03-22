const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

// ─── Configuration ───────────────────────────────────────────────────────────
const GUILD_ID = '1432472817005236326';

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

// ─── Build the panel embed + rows ────────────────────────────────────────────
function buildPanel() {
  const embed = new EmbedBuilder()
    .setTitle('DM All')
    .setDescription('Commandes DM All')
    .setColor(0x5865f2);

  const keys = Object.keys(DM_CONFIGS);
  const rows = [];

  // Discord allows max 5 buttons per row, max 5 rows
  for (let i = 0; i < keys.length; i += 5) {
    const row = new ActionRowBuilder();
    const slice = keys.slice(i, i + 5);
    for (const key of slice) {
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

  return { embed, rows };
}

// ─── Slash command to spawn the panel ────────────────────────────────────────
client.once('ready', async () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);

  // Register the /dmall slash command
  await client.application.commands.create({
    name: 'dmall',
    description: 'Affiche le panel DM All',
  });

  console.log('✅ Commande /dmall enregistrée');
});

// ─── Handle slash command ─────────────────────────────────────────────────────
client.on('interactionCreate', async (interaction) => {
  // ── /dmall command ──
  if (interaction.isChatInputCommand() && interaction.commandName === 'dmall') {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: '❌ Tu dois être administrateur pour utiliser cette commande.', ephemeral: true });
    }

    const { embed, rows } = buildPanel();
    await interaction.reply({ embeds: [embed], components: rows });
    return;
  }

  // ── Button interactions ──
  if (!interaction.isButton()) return;

  const config = DM_CONFIGS[interaction.customId];
  if (!config) return;

  if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
    return interaction.reply({ content: '❌ Tu dois être administrateur pour utiliser ce bouton.', ephemeral: true });
  }

  await interaction.deferReply({ ephemeral: true });

  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    await guild.members.fetch(); // fetch all members

    const members = guild.members.cache.filter((m) =>
      m.roles.cache.has(config.roleId) && !m.user.bot
    );

    let success = 0;
    let failed = 0;

    for (const [, member] of members) {
      try {
        await member.send(config.message(member.toString()));
        success++;
        // Small delay to avoid rate limits
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
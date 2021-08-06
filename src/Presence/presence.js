const rpc = require("discord-rpc");
const config = require('./config.json');

const client = new rpc.Client({ transport: 'ipc'});

client.on('ready', () => {
    console.log('RPC starting electron.');
    
    client.setActivity({
    details: config.description,
    state: config.explanation,
    largeImageKey: config.bigImageName,
    largeImageText: config.bigPictureText,
    smallImageKey: config.littlePictureName,
    smallImageText: config.littlePictureWriting,
    buttons: [
        { label: "Discord server", url: "https://discord.gg/dwgkB4hua2" },
    ]
  });
});

rpc.register(config.AppID);
client.login({ clientId: config.AppID }).catch((error) => {
  throw error.message;
});
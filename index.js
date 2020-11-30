const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const db = require('quick.db');
const ms = require('parse-ms')
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://sann-cemre-onur.glitch.me/`);
}, 280000);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};



var f = [];
function factorial (n) {
  if (n == 0 || n == 1)
    return 1;
  if (f[n] > 0)
    return f[n];
  return f[n] = factorial(n-1) * n;
};
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}


////////////////////////

client.elevation = message => {
  if(!message.guild) {
    return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


//////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", async message =>  {
   if(message.author.bot || message.channel.type === "dm") return;
  if(message.content ===".tag"||message.content ==="tag"||message.content ==="!tag"){
    message.channel.send(`**☆**`)
  }
})

client.on("message", async message =>  {
   if(message.author.bot || message.channel.type === "dm") return;
         if (message.content === '.join' && message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
           if(!message.member.voiceChannel) return message.channel.send("Bir ses kanalında olman lazım!").then(m => m.delete(9000));
        channel.join()
            
                message.reply("Bot odaya giriş yaptı.").then(m => m.delete(9000));

      }
           if (message.content === '.join' && !message.member.hasPermission("ADMINISTRATOR")) {
     message.reply("Bu komutu sadece yöneticiler kullanabilir!").then(m => m.delete(9000));
             return
      }
      if (message.content === '.leave' && message.member.hasPermission("ADMINISTRATOR")) {
        const channel = message.member.voiceChannel;
        if(!message.member.voiceChannel) return message.channel.send("Bir ses kanalında olman lazım!").then(m => m.delete(9000));
        channel.leave()
        
                message.reply("Bot odadan çıkış yaptı.").then(m => m.delete(9000));

      }
             if (message.content === '.leave' && !message.member.hasPermission("ADMINISTRATOR")) {
     message.reply("Bu komutu sadece yöneticiler kullanabilir!").then(m => m.delete(9000));
             return
      }
  
  })
client.on("userUpdate", function(oldUser, newUser){

  let kanal =client.channels.get('634438768551526427')
     if(oldUser.username !== newUser.username) {
       const  takmaad =  client.guilds.get("634437923500195853").members.get(newUser.id).displayName

          
        if(!newUser.username.includes("☆")&& client.guilds.get("634437923500195853").members.get(newUser.id).roles.has("634438732006817800")) {
           if(!client.guilds.get("634437923500195853").members.get(newUser.id).removeRole("634438732006817800")) return newUser.guild.owner.send("ototag rolü olmadığı için rol alınamadı")
             client.guilds.get("634437923500195853").members.get(newUser.id).removeRole("634438732006817800")

            let değişeceksembol1 = takmaad.replace(/☆/g, "★");
              client.guilds.get("634437923500195853").members.get(newUser.id).setNickname(değişeceksembol1)   
               if(!kanal) return newUser.guild.owner.send("ototag bilgi kanalı olmadığı için rol alındı ama kanala yazı yazılamadı")
          
            let embed1 = new Discord.RichEmbed()
            .setColor("#000002")
            .setDescription(`**${newUser}, tagı çıkardığı için Bot tarafından <@&634438732006817800> rolü alındı!**`)
            .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
            .setTimestamp()
            kanal.send(embed1)
                
       
        } 
         if(newUser.username.includes("☆")&& !client.guilds.get("634437923500195853").members.get(newUser.id).roles.has("634438732006817800")) {

           if(client.guilds.get("634437923500195853").members.get(newUser.id).roles.has("651163710705893386")) return;
           
                      if(client.guilds.get("634437923500195853").members.get(newUser.id).roles.has("634806986143301654")) return;

             if(!client.guilds.get("634437923500195853").members.get(newUser.id).addRole("634438732006817800"))   return newUser.guild.owner.send("ototag rolü olmadığı için rol verilemedi")
              client.guilds.get("634437923500195853").members.get(newUser.id).addRole("634438732006817800")
                let değişeceksembol2 = takmaad.replace(/★/g, "☆");
                 client.guilds.get("634437923500195853").members.get(newUser.id).setNickname(değişeceksembol2)    
                   if(!kanal) return newUser.guild.owner.send("ototag bilgi kanalı olmadığı için rol verirdi ama kanala yazı yazılamadı")
           
            let embed1 = new Discord.RichEmbed()
            .setColor("#000002")
            .setDescription(`**${newUser}, tagı aldığı için Bot tarafından <@&634438732006817800> rolü verildi!**`)
                
              .setFooter(`${client.user.tag}`, `${client.user.displayAvatarURL}`)
             .setTimestamp()
            kanal.send(embed1) 
         }
        }
      })

client.on("message",async message => {
 if(message.channel.type === "dm" || message.author.bot) return
   if(message.content === "!link"||message.content === ".link"||message.content === "link") {
     message.channel.send("https://discord.gg/shannara")
   }
})
client.on("message",async message => {
   if (message.author.bot || message.channel.type === "dm") return;
 
  //return message.channel.send(`**${user_tag}** Şu anda afk.\nNedeni:${key.reason}`)
  //return message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
    var afklar =await db.fetch(`afk_${message.author.id}, ${message.guild.id}`)
    
  if(afklar){
    
    db.delete(`afk_${message.author.id}, ${message.guild.id}`)
    db.delete(`afk-zaman_${message.author.id}, ${message.guild.id}`)
    
    message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
       try{
    let takma_ad = message.member.nickname.replace("[AFK]", "")
    message.member.setNickname(takma_ad).catch(err => console.log(err));
       }catch(err){   

 console.log(err.message)
  }
  }
  var kullanıcı = message.mentions.users.first()
  if(!kullanıcı) return
   let zaman =  await db.fetch(`afk-zaman_${kullanıcı.id}, ${message.guild.id}`)
  
   
    var süre = ms(Date.now() - zaman)
    
    
   var sebep = await db.fetch(`afk_${kullanıcı.id}, ${message.guild.id}`)
  if(await db.fetch(`afk_${message.mentions.users.first().id}, ${message.guild.id}`)){
  if(süre.days !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.days}** Gün **${süre.hours}** Saat **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
  
  if(süre.hours !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.hours}** Saat **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
  if(süre.minutes !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **${süre.minutes}** Dakika Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
   if(süre.seconds !== 0){
     message.channel.send(`**${kullanıcı}** Kullanıcısı **Bir Kaç Saniye** Önce **Afk** Oldu.\n Afk Nedeni: **${sebep}**`)
   return
   }
  }

})
/*client.on("guildMemberRemove",async function(member){
   
  
    let KayıtEdilen = await db.fetch(`KayıtEden2_${member.id}`)

    if(KayıtEdilen){
      for(var i = 0; i<KayıtEdilen.length;i=i+1){
    
    
    db.add(`Leave_${KayıtEdilen}`,-1)

    console.log(KayıtEdilen)
    
         }
      
      
    }
  
});*/
client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
   var Attachment = (message.attachments)
  if (Attachment){
     if(Attachment.array()[0]!==undefined) return
       
     
  }
  
  let sChannel2 = message.guild.channels.get("634438762860118029")
    if(!sChannel2) return
  const embed = new Discord.RichEmbed()
  .setColor("#000000")
  .setAuthor(`Mesaj silindi.`, message.author.avatarURL)
  .addField("**Kullanıcı Tag**", message.author.tag, true)
  .addField("**Kanal Adı**", message.channel.name, true)
  .addField("**Silinen Mesaj**", "```" + message.content + "```")
  .setThumbnail(message.author.avatarURL)
    .setTimestamp()  
  //.setFooter(`Bilgilendirme  • bügün saat ${message.createdAt.getHours()+3}:${message.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel2.send(embed);
 
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
if(newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannel3 = newMessage.guild.channels.get("634438762860118029")
  if (oldMessage.content == newMessage.content) return;
  if(!sChannel3) return
  let embed = new Discord.RichEmbed()
  .setColor("#ffffff")
  .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
  .addField("**Kullanıcı**", newMessage.author)
  .addField("**Kanal Adı**", newMessage.channel.name)
  .addField("**Eski Mesaj**", "```" +oldMessage.content+"```" , true)
  .addField("**Yeni Mesaj**", "```" +newMessage.content+"```" , true)
  
  .setThumbnail(newMessage.author.avatarURL)
    .setTimestamp()  
  //.setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel3.send(embed)
});
client.on("messageDelete", async (message, channel) => {
if(message.author.bot || message.channel.type === "dm") return;
  

  let sChannel3 = message.guild.channels.get("651474571014438935")
    if(!sChannel3) return

 var Attachment = (message.attachments)
  if (Attachment){
   if(Attachment.array()[0]!==undefined){

       let embed = new Discord.RichEmbed()
  .setColor("#210481")
  .setAuthor(`Foto Log `, message.author.avatarURL)
  .addField("**Kullanıcı**", message.author.tag,true)
  .addField("**Kanal Adı**", message.channel.name,true)
  .setImage(Attachment.array()[0].proxyURL)

    .setTimestamp()  
  //.setFooter(`Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours()+3}:${newMessage.createdAt.getMinutes()}`, `${client.user.displayAvatarURL}`)
  sChannel3.send(embed)
   // sChannel3.send(message.author ,new Discord.Attachment(Attachment.array()[0].proxyURL))
   // sChannel3.send("----------------------------------------------------")
   }
  }
});
client.on("message", async message =>  {
   if(message.author.bot || message.channel.type === "dm") return;
  if(message.content.toLowerCase() ==="sa"||message.content.toLowerCase() ==="sea"||message.content.toLowerCase() ==="selamün aleyküm"||message.content.toLowerCase() ==="selamun aleykum"){
    message.reply("**Aleyküm Selam Dostum Hoşgeldin** <a:109:650870381779091466>")
  }
})
client.login(process.env.BOT_TOKEN);


///////////////////////////////////////////////////////////////////////////////////////////////////

client.on('roleDelete', async (role) => {
   
    const entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    const yetkili = await role.guild.members.get(entry.executor.id);
    const eskihali = role.permissions;
          console.log(eskihali)
   if (yetkili.id === "681247846556893197")return;
   if (yetkili.id === "681264203340054531")return;
   if (yetkili.id === "681875475702087681")return;
             let embed = new Discord.RichEmbed()
             .setColor("BLACK")
             .setDescription(`<@${yetkili.id}> İsimli Kişi ${role.id} ID'li Rolü Sildi Ve Sahip Olduğu Tüm Rolleri Alarak, Kendisine \`Cezalı\` Rolünü Verdim. <a:679653893734400022:679653893734400022>`)
             .setTimestamp()
             let roles = role.guild.members.get(yetkili.id).roles.array()
                    try {
                         role.guild.members.get(yetkili.id).removeRoles(roles)
                                                                             
                         }
              catch(err) {
                          console.log(err)
                         } 
    setTimeout(function(){
                         role.guild.members.get(yetkili.id).addRole("679400775226621952")
                         role.guild.owner.send(embed)
                         }, 1500);

                  });

client.on("roleDelete", async (role) => {

  const embedmemberadd23 = new Discord.RichEmbed()
  .setTitle(`-  #` + `${role.name} Adlı Rol Silindiği İçin Yetki Rolleri Çekildi. <a:679653893734400022:679653893734400022>`, ``)
  .addField(`Hangi Yetkiye Sahip Roller Çekilir?`, `(Yönetici, Rolleri Yönet, Denetim Kaydını Görüntüle, Kanalları Yönet, Sunucuyu Yönet) Yetkilerine Sahip Roller Çekildi. <a:679653893734400022:679653893734400022>`)
.setImage("https://cdn.discordapp.com/attachments/668814285761150988/669477310411440148/Ragnar.gif")
role.guild.owner.send(embedmemberadd23)
  
  role.guild.members.forEach(member => {
    member.removeRole("681247846556893197") 
    member.removeRole("681264203340054531") 
    member.removeRole("681875475702087681") 
    
  });
});

client.on("roleUpdate", async function(oldRole, newRole) {
  
   const bilgilendir = await newRole.guild.fetchAuditLogs({type: "ROLE_UPLATE"}).then(hatırla => hatırla.entries.first())
    let yapanad= bilgilendir.executor;
  let idler= bilgilendir.executor.id;
  if(idler === "615661042437062814") return
  if(oldRole.hasPermission("ADMINISTRATOR")) return
  
   setTimeout(() => {

     if(newRole.hasPermission("ADMINISTRATOR")){
   newRole.setPermissions((newRole.permissions-8))    
 }
     
 if(newRole.hasPermission("ADMINISTRATOR")){
  
     if(!client.guilds.get(newRole.guild.id).channels.has("679605883180679180")) return newRole.guild.owner.send(`Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi** Alındı. \Rol: **${newRole.name}** <a:679653893734400022:679653893734400022>`)

  client.channels.get("679605883180679180").send(`Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi Alındı**. \Rol: **${newRole.name}** <a:679653893734400022:679653893734400022>`)
 }
      }, 1000)
  })

client.on('roleDelete', async function(role) {
  const fetch = await role.guild.fetchAuditLogs({type: "ROLE_DELETE"}).then(log => log.entries.first())
  let yapanad = fetch.executor;
  let isim = role.name;
  let renk = role.color;
  let ayrı = role.hoist;
  let sıra = role.position;
  let yetkiler = role.permissions;
  let etiketlenebilir = role.mentionable;
  role.guild.createRole({
    name:isim,
    color:renk,
    hoist:ayrı,
    position:sıra,
    permissions:yetkiler,
    mentionable:etiketlenebilir
  })
  let teqnoembed = new Discord.RichEmbed()
    .setTitle("Warning")
    .setColor("RED")
    .setFooter("Reputation Security")
    .setDescription(`\`${role.guild.name}\` Adlı Sunucunuzda ${isim} Adına Sahip Rol, ${yapanad} Adlı Kişi Tarafından Silindi. Ve Ben Tekrardan Oluşturdum! <a:679653893734400022:679653893734400022>`)
  role.guild.owner.send(teqnoembed)
});

//////////////////////////////////////////////////////////////////////////////////////////////////

client.on('channelDelete', async (channel) => {
 
 const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
 const yetkili = await channel.guild.members.get(entry.executor.id);
	 if (yetkili.id === "681247846556893197")return;
   if (yetkili.id === "681264203340054531")return; 
   if (yetkili.id === "681875475702087681")return; 
 let embed = new Discord.RichEmbed()
.setColor("BLACK")
.setDescription(`<@${yetkili.id}> İsimli Kişi ${channel.id} ID'li Kanalı Sildi Ve Sahip Olduğu Tüm Rolleri Alarak, Kendisine (Cezalı) Rolünü Verdim. <a:679653893734400022:679653893734400022>`)
.setTimestamp()
 let roles = channel.guild.members.get(yetkili.id).roles.array()
 try {
channel.guild.members.get(yetkili.id).removeRoles(roles)
                                                                           
  }
 catch(err) {
 console.log(err)
 } 
 setTimeout(function(){
      channel.guild.members.get(yetkili.id).addRole("679400775226621952")
      channel.guild.owner.send(embed)
               }, 1500);

                                                                               
                                                                                     
     });

client.on("channelDelete", async (channel) => {
  
  const embedmemberadd23 = new Discord.RichEmbed()
  .setTitle(`-  #` + `${channel.name} Adlı Kanal Silindiği İçin Yetki Rolleri Çekildi. <a:679653893734400022:679653893734400022>`, ``)
  .addField(`Hangi Yetkiye Sahip Roller Çekilir?`, `(Yönetici, Rolleri Yönet, Denetim Kaydını Görüntüle, Kanalları Yönet, Sunucuyu Yönet) Yetkilerine Sahip Roller Çekildi. <a:679653893734400022:679653893734400022>`)
.setImage("https://cdn.discordapp.com/attachments/668814285761150988/669477310411440148/Ragnar.gif")
channel.guild.owner.send(embedmemberadd23)
  
  channel.guild.members.forEach(member => {
    member.removeRole("681247846556893197") 
    member.removeRole("681264203340054531")
    member.removeRole("681875475702087681")

  });
});

client.on('channelDelete', async function(channel) {
  const fetch = await channel.guild.fetchAuditLogs({type: "CHANNEL_DELETE"}).then(log => log.entries.first())
  let yapanad= fetch.executor;
  if(channel.type === "voice") {
    console.log(`${channel.name} Adlı Ses Kanalı Silindi.`)
    let kategoriID = channel.parentID;
    let isim = channel.name;
    let sıra = channel.position;
    let limit = channel.userLimit;
    channel.guild.owner.send(`Merhaba. **${channel.guild.name}** Adlı Sunucunuzda, ${yapanad} Adlı Kişi, \`${channel.name}\` Adlı Sesli kanalı Silindi Ve Bende O Kanalı Tekrardan Oluşturdum. <a:679653893734400022:679653893734400022>`)
    channel.clone(this.name,true,false).then(kanal => {
      let z = kanal.guild.channels.get(kanal.id)
      z.setParent(z.guild.channels.find(channel => channel.id === kategoriID))
      z.edit({position:sıra,userLimit:limit})
    })
  }
  if(channel.type === "text") {
    console.log(`${channel.name} Adlı Metin Kanalı Silindi.`)
    let açıklama = channel.topic;
    let kategoriID = channel.parentID;
    let isim = channel.name;
    let sıra = channel.position;
    let nsfw = channel.nsfw;
    channel.guild.owner.send(`Merhaba. **${channel.guild.name}** Adlı Sunucunuzda, ${yapanad} Adlı Kişi, \`${channel.name}\` Adlı Metin Kanalı Silindi Ve Bende O Kanalı Tekrardan Oluşturdum. <a:679653893734400022:679653893734400022>`)
    channel.clone(this.name,true,true).then(kanal => {
      let z = kanal.guild.channels.get(kanal.id)
      z.setParent(z.guild.channels.find(channel => channel.id === kategoriID))
      z.edit({position:sıra,topic:açıklama,nsfw:nsfw})
    })
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////////

client.on('guildBanAdd',  async (guild, user) => {

    const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
    const yetkili = await guild.members.get(entry.executor.id); 
            if (yetkili.id === "681247846556893197")return;
            if (yetkili.id === "681264203340054531")return;
            if (yetkili.id === "681875475702087681")return;
  
        let embed = new Discord.RichEmbed()
       .setColor("BLACK")
       .setDescription(`<@${yetkili.id}> , <@${user.id}> Kişisini  Banladı Ve Sahip Olduğu Tüm Rolleri Alarak, Kendisine \`Cezalı\` Rolünü Verdim. <a:679653893734400022:679653893734400022>`)
       .setTimestamp()
        let roles = guild.members.get(yetkili.id).roles.array()
        try {
              guild.members.get(yetkili.id).removeRoles(roles)
           }
        catch(err) { 
                      console.log(err)
                   } 
 	  setTimeout(function(){
              guild.members.get(yetkili.id).addRole("670663271509917727")
         
			 guild.owner.send(embed)
          
                         }, 1500);
                                               
                                                 });


client.on("guildMemberRemove", async function(member) {
  let guild = member.guild;
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_KICK" })
    .then(audit => audit.entries.first());
  const yetkili = await guild.members.get(entry.executor.id);
  setTimeout(async () => {
    let logs = await guild.fetchAuditLogs({ type: "MEMBER_KICK" });
    if (logs.entries.first().executor.bot) return;
    if (logs.entries.first().target.id !== member.id) return;
    guild.members
      .get(logs.entries.first().executor.id)
      .removeRoles(guild.members.get(logs.entries.first().executor.id).roles); /// TÜM ROLLERİNİ ALIR
    setTimeout(() => {
      guild.members

        .get(logs.entries.first().executor.id)
        .addRole("679400775226621952"); /// VERİLECEK CEZALI ROL İD
    }, 3000);
    
    const k = guild.channels.find(c => c.id === "679605883180679180");
 k.send(`<@${yetkili.id}> <@${member.user.id}> Adlı Kişiye Sağ Tık Kick Atıldığı İçin Kickliyen Kişinin Yetkileri Alındı. <a:679653893734400022:679653893734400022>`);  }, 2000);
});

/////////////////////////////////////////////////////////////////////////////////////////////////



client.on("guildMemberAdd", async member => {
  
   
    if(member.user.bot) {
     
      member.guild.roles.forEach(async function(yetkilirol){
  if(yetkilirol.id ==="681247846556893197")return
  if(yetkilirol.id ==="681264203340054531")return
  if(yetkilirol.id ==="681875475702087681")return
  if(yetkilirol.hasPermission("ADMINISTRATOR")){
       yetkilirol.setPermissions((yetkilirol.permissions-8))    
     }
      })
      let korumakanalı = client.channels.get("679605883180679180")
      if(!korumakanalı || korumakanalı === null){
        member.ban(member);
         member.guild.owner.send(`Log Kanalı Olmadığı İçin Sunucu Sahibinin Özeline Yazıyorum. | **Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Botu Banladım. \nBanlanan Bot: **${member} <a:679653893734400022:679653893734400022>`)
     }
      else{
        
      member.ban(member);
      korumakanalı.send(`**Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Botu Banladım. \nBanlanan Bot: **${member} <a:679653893734400022:679653893734400022>`)
     }
  }
    else{
      
    }
  
  })

//////////////////////////////////////////////////////////////////////////////////////////////////c
client.on("guildMemberAdd", member => {
  var moment = require("moment")
  require("moment-duration-format")
  moment.locale("tr")
   var {Permissions} = require('discord.js');
   var x = moment(member.user.createdAt).add(7, 'days').fromNow()
   var user = member.user
   x = x.replace("Birkaç Saniye Önce", " ")
   if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
   var rol = member.guild.roles.get("679400775226621952")
   var kayıtsız = member.guild.roles.get("679400764988194826")
   member.addRole(rol)
member.user.send('Hesabınız 7 Günden Önce Açıldığı İçin Otomatik Olarak Cezalıya Atıldınız, Yetkililere Bildirerek Açtırabilirsiniz Ayrıca Unutmayın Her Şey Siz Değerli Üyelerimizin Güvenliği İçin.')
setTimeout(() => {

        member.removeRole(kayıtsız.id);

}, 1000)


    
   }
        else {

        }  
    });

//////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////




client.login(ayarlar.token);

client.on("guildMemberAdd", (member, message, guild) => {
  if (member.guild.id !== "736933524795555841") return; 
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
   var tagdakiler = 0;
  let aylar = aylartoplam;
  let user = client.users.get(member.id);
  require("moment-duration-format");
  let eskiNick = member.user.username;
 const id = "736933525327970386"; 
  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const gün = moment.duration(kurulus).format("D");
  var kontrol;
  if (gün < 7) kontrol = "Fake Hesap";
  if (gün > 7) kontrol = "Güvenilir Hesap";
    let count = 0;
   var embed = new Discord.RichEmbed()
    .setDescription(`Sunucumuza Hoşgeldin ${member}, Seninle Beraber **${member.guild.memberCount}** Kişiyiz. \nKaydının yapılması için **sesli odaya** gelip **ses** vermen gerek \nHesabın oluşturulma tarihi: ${moment( user.createdAt ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment( user.createdAt ).format("YYYY HH:mm:ss")} \nHesabınız: **${kontrol}** \n<@&roleid> seninle ilgilenecektir.`)
    .setFooter(`created by clasus`)
   member.guild.channels.get(id).send(embed) 
})
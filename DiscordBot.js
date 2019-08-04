const {Client, Attachment} = require('discord.js');
const bot = new Client();

//YOU MUST MANUALLY CHANGE
var version = 1.1;
var update_number = 1.0;
var newchannel = 'valk_discussions';

const PREFIX = '!';

//The Client Secret
const token = 'EXAMPLE';

//Bots Status
bot.on('ready', () =>{
    var i = 0;
    console.log('Bot is Online')
    bot.user.setActivity('& Trollin', {type : 'WATCHING'});
})

bot.on('message', msg=>{
    if(msg.content === "Greetings"){
        msg.reply('Hail and Well Met');
    }
})

//Greets new members
bot.on('guildMemberAdd', msg=>{
    const channel = member.guild.channels.find(channel => channel.name === newchannel);
    if(!channel) return;

    channel.send(`Welcome to the Valkyrie Gaming Channel, ${member}, Please read our rules and regulations!`)
    //Moved attachment2 here for the rules and regulations!
    const attachment2 = new Attachment('./rules.txt')
    msg.channel.send(msg.author, attachment2);

});


//Update status
bot.on('message', msg=>{
    console.log('UPDATED');
    if(version > update_number){
         msg.channel.sendMessage('Knight Bot has been Updated. \nread what we enhanched! VALK GAMES!')
         const UpdateAttachment = new Attachment('./updates.txt')
         msg.channel.send(msg.author, UpdateAttachment);
         update_number += .1;
    }

})

//COMMANDS
bot.on('message', msg=>{

    let args = msg.content.substring(PREFIX.length).split(" ");

    //checks after the ! for the response back COMMANDS
    //Try to convert to lowercase
    switch(args[0]){

        case 'help' :
            msg.reply('I have all sorts of useful commands you can use from me! Try the following...\n website\ninfo\nclear\nplayer\nsend\nrules\nrip')
            break;
        case 'valk':
            msg.channel.sendMessage('GAMES!');
            break;

        case 'website':
            msg.reply("OUR WEBSITE LINK");
            msg.reply("let jrm know to add link in for Website");
            break;

        case 'info':
            if(args[1] === 'version'){
                msg.channel.sendMessage('Knight Bot Version ' + version);
            }
            else {
               msg.channel.sendMessage('Invalid command you need to say !info version');
            }
            break;
        
        //ADMIN ONLY
        case 'clear':
            //if(!msg.member.roles.find(r => r.name === "Admin")) return msg.channel.reply('You do not have permission to use clear')
            if(!args[1]) return msg.reply('YOU BAFOON! you need a number to delete how many msgs you would like to delete!');
            msg.channel.bulkDelete(args[1]);
            break;
        

        case 'player':
            const embed = new Discord.RichEmbed()
            .setTitle("Valkyrie Gaming")
            .addField('Player Name', msg.author.username)
            .addField('Current Server', msg.guild.name)
            .addField('Version', version)
            .setColor(0x1A5276)
            //FIX POSITION ROLE LATER
            .addField("Position", msg.author.guild)
            .setThumbnail(msg.author.avatarURL)
            msg.channel.sendEmbed(embed);
            break;
        
        case 'send':
            const attachment = new Attachment('https://d.newsweek.com/en/full/1508425/hearthstone-saviors-uldum.jpg')
            msg.channel.send(msg.author, attachment);
            break;
        
        case 'rules':
            //const attachment2 = new Attachment('./rules.txt')
            msg.channel.send(msg.author, attachment2);
        
        //ADMIN ONLY
        case 'kick':
            //checks for permission for command
            if(!msg.member.roles.find(r => r.name === "Admin")) return msg.channel.reply('You do not have permission to KICK')
            if(!args[1]) msg.channel.send('You need to say who you are kicking')

                const user = msg.mentions.users.first();

                if(user)
                {
                    const member = msg.guild.member(user);

                    if(member){
                        member.kick('You were kicked').then(() =>{
                            msg.reply(`Successfully Kicked ${user.tag}`);
                        }) .catch(error =>{
                            msg.reply('Unable to Kick');
                            console.log(error);
                        });
                    } 
                    else{
                        msg.reply(`${user.tag} Is not in this server!!!`)
                    }
                }
            else{
                msg.reply(`User ${args[1]} was not found to Kick`)
            }
        break;

        case 'rip':
            const attachmentRIP = new Attachment('https://i.imgur.com/w3duR07.png');
            msg.channel.send(attachmentRIP);
        break;

        case 'mute':
            if(!msg.member.roles.find(r => r.name === 'Admin')) return msg.channel.reply(`Hey ${user.tag}, you do not have permission to MUTE`)
            if(!args[1] || !args[2]) msg.reply('Invalid syntax, use NAME MINUTES REASON')
            
            /*if(member){
                member.
            }*/

    //End of the commands

    //This is an infinite loop
   // default: 
        //msg.reply('Invalid say !help to view all commands')
        //break;     
    }
})

bot.login(token);
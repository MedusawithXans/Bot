// Import the Discord.js library
const Discord = require('discord.js');

// Create a new Discord client instance
const client = new Discord.Client();

// When the bot is ready, log a message to the console
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// When a message is sent, check if it's a command
client.on('message', async message => {
  if (message.content === '!stats') {
    // Get the server information
    const guild = message.guild;
    
    // Get the members of the server
    const members = await guild.members.fetch();
    
    // Create an empty object to store the message counts
    const messageCounts = {};
    
    // Loop through each member and count their messages
    members.forEach(member => {
      const userMessages = message.channel.messages.cache.filter(msg => msg.author.id === member.id);
      messageCounts[member.displayName] = userMessages.size;
    });
    
    // Sort the message counts by descending order
    const sortedMessageCounts = Object.entries(messageCounts).sort((a, b) => b[1] - a[1]);
    
    // Create a message to display the statistics
    let statsMessage = `**Server Statistics:**\n`;
    statsMessage += `Total Members: ${guild.memberCount}\n\n`;
    statsMessage += `**Message Counts:**\n`;
    
    sortedMessageCounts.forEach(([displayName, messageCount]) => {
      statsMessage += `${displayName}: ${messageCount}\n`;
    });
    
    // Send the message to the channel
    message.channel.send(statsMessage);
  }
});

// Log in to the Discord server using your bot token
client.login('YOUR_BOT_TOKEN_HERE');

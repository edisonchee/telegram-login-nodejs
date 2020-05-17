const express = require('express');
const app = express();

const Slimbot = require('slimbot');
const slimbot = new Slimbot('your-bot-token');

slimbot.on('message', message => {
  if (message.text === "/login") {

    let optionalParams = {
      parse_mode: 'Markdown',
      reply_markup: JSON.stringify({
        inline_keyboard: [[
          { text: 'Login',
            login_url: {
              url: 'https://your-domain.com/login'
            }
          }
        ]]
      })
    };

    slimbot.sendMessage(message.chat.id, 'Click this button to login!', optionalParams);
  } else if (message.text === "/start") {
    slimbot.sendMessage(message.chat.id, 'Click /login or type it into the chat to begin login!');
  }
});

app.get('/login', (req, res) => {
  // Basically, you want a function that checks the signature of the incoming data, and deal with it accordingly
  if (checkSignature(req.query)) {
    // data is authenticated
    // create session, redirect user etc.
  } else {
    // data is not authenticated
  }
})

app.listen(9999, () => { console.log("Server started on port 9999") });

// We'll destructure req.query to make our code clearer
function checkSignature({ hash, ...userData }) {
  // create a hash of a secret that both you and Telegram know. In this case, it is your bot token
  const secretKey = createHash('sha256')
  .update(CONFIG.BOT_TOKEN)
  .digest();

  // this is the data to be authenticated i.e. telegram user id, first_name, last_name etc.
  const dataCheckString = Object.keys(userData)
  .sort()
  .map(key => (`${key}=${userData[key]}`))
  .join('\n');

  // run a cryptographic hash function over the data to be authenticated and the secret
  const hmac = createHmac('sha256', secretKey)
  .update(dataCheckString)
  .digest('hex');

  // compare the hash that you calculate on your side (hmac) with what Telegram sends you (hash) and return the result
  return hmac === hash;
}
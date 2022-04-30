const server = require('http').createServer();
const Instagram = require('instagram-web-api')
const FileCookieStore = require('tough-cookie-filestore2')
const TextToPicture = require('./functions/TextToPicture');
const Censored = require('./functions/Censored');
const config = require('./config/config.js');
const io = require('socket.io')(server, {
  cors: {
    origin: config.websiteDoamin
  }
});
const cookieStore = new FileCookieStore('./cookies.json')
const client = new Instagram({ username: config.username, password: config.password, cookieStore })
var lastMessage = 0;
var count = 2;
console.log('Charlie is running')

io.on("connection", (socket) => {
  var address = socket.client.request.headers['cf-connecting-ip'];

  socket.on("megasecurite", (arg, arg2, callback) => {
    
    if(arg.length < 5 || arg.length > 280){
      callback("SYSTEM: Wiadomość ma nieodpowiednia długość")
    }else{

      if (lastMessage > (Date.now() - 5 * 1000))
      return callback("SYSTEM: Musisz odczekać "+(lastMessage - (Date.now() - 5 * 1000)).toFixed(1)+" milisekund żeby wysłać wiadomość.");

       ;(async () => {
        const result = await TextToPicture.convert({
          text: Censored(arg),
          scheme: arg2,
          color: 'black',
          ext:'jpeg',
          size: 32
        })
        await result.write("out.jpg")

        await client.login()
       
        // Upload Photo to feed or story, just configure 'post' to 'feed' or 'story'
        const { media } = await client.uploadPhoto({ photo: 'out.jpg', caption: `\n#${count}\nOd Spottera / Spotterki\nSpotted Kotleciarnia`, post: 'feed' })

        count++
        callback("SYSTEM: Dodano");

        console.log("SYSTEM: Post #"+count+" dodany przez "+address+" o treści "+arg)

        lastMessage = Date.now();
      })()
    }
  });

});
server.listen(config.port);
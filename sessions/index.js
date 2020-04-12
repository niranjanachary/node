var cookieSession = require('cookie-session')
var express = require('express')
var redis = require('redis');
var compression = require('compression');
var helmet = require('helmet');

var app = express()

app.use(compression()); //Compress all routes
app.use(helmet());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'))


var client = redis.createClient();
client.on('connect', function() {
    console.log('Redis client connected');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
}); 
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
 
 
app.get('/', function (req, res, next) {
  // Update views

const readline = require("readline");
var cl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// var question = function(q) {
//     return new Promise( (res, rej) => {
//         cl.question( q, answer => {
//             res(answer);
//         })
//     });
// };
// (async function main() {
//     var answer;
//     while ( answer != 'yes' ) {
//         answer = await question('Are you sure? ');
//     }
//     console.log( 'finally you are sure!');
// })();

// rl.question("What is your name ? ", function(name) {
//     rl.question("Where do you live ? ", function(country) {
//         console.log(`${name}, is a citizen of ${country}`);
//         // rl.close();
//     });
// });

// rl.on("close", function() {
//     console.log("\nBYE BYE !!!");
//     process.exit(0);
// });

  req.session.views = (req.session.views || 0) + 1
 
  // Write response
  res.end(req.session.views + ' views')
})
 


app.listen(3001)
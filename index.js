const fetch = require('node-fetch');
const border = 0.5
const interval = 5000
require('dotenv').config();
const accountSid = process.env.ACC_ID //your twilio key
const authToken = process.env.ACC_TOKEN // your twilio token
const client = require('twilio')(accountSid, authToken);


setInterval(()=>{
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd').then((res)=>{
        return res.json()
    }).then((data)=>{
        if (data.dogecoin.usd < border){
            notify(data.dogecoin.usd + '$')
        }
    })
}, interval)


function notify(price){
    client.messages
    .create({
        body: 'dogecoin is at ' + price,
        from: '', //your twilio number
        to: '' //your number
    })
    .then(message => console.log(message.sid))
    .catch(e => console.log(e))
}

console.log('server is up')
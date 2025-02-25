const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = new twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
    const { username, game_name } = req.body;

    client.messages
        .create({
            body: `${username} asked to download ${game_name}`,
            from: 'YOUR_TWILIO_PHONE_NUMBER',
            to: 'YOUR_PHONE_NUMBER'
        })
        .then(message => res.send({ success: true, msg: message.sid }))
        .catch(err => res.status(500).send({ success: false, error: err.message }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

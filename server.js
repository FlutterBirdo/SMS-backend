const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const accountSid = 'AC0b63adf9efb7e077fe6b75b763b1b1da';
const authToken = 'aac6fe21c45225660705235a0c82a2b1';
const client = new twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
    const { username, game_name } = req.body;

    client.messages
        .create({
            body: `${username} asked to download ${game_name}`,
            from: '16199020452',
            to: '+16199020452'
        })
        .then(message => res.send({ success: true, msg: message.sid }))
        .catch(err => res.status(500).send({ success: false, error: err.message }));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

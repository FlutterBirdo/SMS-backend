const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Twilio credentials (replace with environment variables for production)
const accountSid = 'AC0b63adf9efb7e077fe6b75b763b1b1da';
const authToken = 'aac6fe21c45225660705235a0c82a2b1';
const client = new twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
    const { username, game_name } = req.body;

    // Log the incoming request
    console.log('Received request to send SMS:', { username, game_name });

    // Check if both fields are provided
    if (!username || !game_name) {
        console.error('Missing username or game_name');
        return res.status(400).send({ success: false, error: 'Username and game_name are required' });
    }

    // Log the message before sending
    console.log(`Sending message: ${username} asked to download ${game_name}`);

    client.messages
        .create({
            body: `${username} asked to download ${game_name}`,
            from: '+18669302967',  // Your Twilio phone number
            to: '+16199020452'    // Your personal phone number
        })
        .then(message => {
            // Log the successful response from Twilio
            console.log('Message sent successfully:', message.sid);
            res.send({ success: true, msg: message.sid });
        })
        .catch(err => {
            // Log any errors encountered
            console.error('Error sending message:', err);
            res.status(500).send({ success: false, error: err.message });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

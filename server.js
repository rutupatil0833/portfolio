const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',  // Replace with your email
            pass: 'your-password'         // Replace with your email password or app password
        }
    });

    const mailOptions = {
        from: email,
        to: 'your-email@gmail.com',
        subject: `New Message from ${name}`,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));

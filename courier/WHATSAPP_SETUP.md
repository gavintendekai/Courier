# WhatsApp Notification Setup Guide

This guide will help you set up WhatsApp notifications for form submissions. You'll receive a WhatsApp message every time someone submits an inquiry.

## Option 1: Using Make.com (Recommended - Easiest)

Make.com (formerly Integromat) offers a free tier and is the easiest way to set up WhatsApp notifications.

### Step-by-Step Setup:

#### 1. Create a Make.com Account
- Go to [https://www.make.com/](https://www.make.com/)
- Sign up for a free account
- Verify your email

#### 2. Create a New Scenario
1. Click "Create a new scenario"
2. Search for "Webhook" and select "Webhooks" module
3. Choose "Custom webhook"
4. Click "Add" to create a new webhook
5. Copy the webhook URL (it will look like: `https://hook.us1.make.com/xxxxx`)

#### 3. Add WhatsApp Module
1. Click the "+" button after the webhook
2. Search for "WhatsApp"
3. Choose "WhatsApp Business Cloud" or "Twilio" (if using Twilio)
4. For WhatsApp Business Cloud:
   - You'll need a Meta Business account
   - Follow the setup wizard to connect your WhatsApp Business number
5. For Twilio (simpler option):
   - Sign up at [https://www.twilio.com/](https://www.twilio.com/)
   - Get a WhatsApp-enabled number or use the Twilio Sandbox
   - Connect your Twilio account to Make.com

#### 4. Configure the WhatsApp Message
In the WhatsApp module, set:
- **To**: Your WhatsApp number (in format: +1234567890)
- **Message**: Map the data from the webhook:
```
🔔 New Inquiry Received!

👤 Name: {{1.message}}
📧 Email: {{2.formData.email}}
📱 Phone: {{3.formData.phone}}
🏢 Company: {{4.formData.company}}
📦 Service: {{5.formData.serviceType}}
📍 Pickup: {{6.formData.pickupAddress}}
📍 Delivery: {{7.formData.deliveryAddress}}
⚖️ Weight: {{8.formData.packageWeight}}
📅 Date: {{9.formData.deliveryDate}}
💬 Message: {{10.formData.message}}
```

#### 5. Update Your Website
1. Open `script.js`
2. Find line 2: `const WHATSAPP_WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';`
3. Replace `YOUR_WEBHOOK_URL_HERE` with your Make.com webhook URL
4. Save the file

#### 6. Test It
1. Go back to Make.com and click "Run once"
2. Submit a test form on your website
3. You should receive a WhatsApp message!
4. If it works, click "ON" in Make.com to activate the scenario

---

## Option 2: Using Zapier

Zapier is another popular automation tool with WhatsApp integration.

### Setup Steps:

1. **Create Zapier Account**
   - Go to [https://zapier.com/](https://zapier.com/)
   - Sign up for free account

2. **Create a Zap**
   - Click "Create Zap"
   - **Trigger**: Choose "Webhooks by Zapier"
   - Select "Catch Hook"
   - Copy the webhook URL

3. **Add WhatsApp Action**
   - **Action**: Search for "WhatsApp" or use "Twilio"
   - Connect your WhatsApp Business account or Twilio
   - Configure the message template

4. **Update script.js** with the Zapier webhook URL

---

## Option 3: Using Twilio Directly (Most Control)

For developers who want more control, you can use Twilio's WhatsApp API directly with a simple backend.

### Requirements:
- Twilio account with WhatsApp enabled
- A simple backend server (Node.js, Python, PHP, etc.)

### Example Node.js Backend:

```javascript
// server.js
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

app.post('/send-whatsapp', async (req, res) => {
    try {
        const { message } = req.body;

        await client.messages.create({
            body: message,
            from: 'whatsapp:+14155238886', // Twilio WhatsApp number
            to: 'whatsapp:+YOUR_PHONE_NUMBER'
        });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
```

Then update `script.js` to point to your backend: `https://your-backend.com/send-whatsapp`

---

## Option 4: Simple Alternative - WhatsApp Web Link (No Setup Required)

If you want a quick solution without webhooks, you can modify the success message to include a WhatsApp link:

### Update inquiry.html:

Find the success message section and add:
```html
<div id="successMessage" class="success-message" style="display: none;">
    <h3>Thank you for your inquiry!</h3>
    <p>We've received your request and will contact you within 24 hours.</p>
    <p>For urgent inquiries, contact us on WhatsApp:</p>
    <a href="https://wa.me/1234567890?text=I%20just%20submitted%20an%20inquiry%20form"
       class="btn-secondary"
       target="_blank">
       Contact on WhatsApp
    </a>
    <a href="index.html" class="btn-secondary">Return to Home</a>
</div>
```

Replace `1234567890` with your WhatsApp number (including country code, no + or spaces).

---

## Recommended Approach

**For beginners**: Use **Make.com with Twilio** (Option 1)
- Free tier available
- No coding required
- Easy to set up
- Reliable delivery

**For businesses**: Use **Twilio directly** (Option 3)
- More control
- Better for high volume
- Professional setup

**Quick solution**: Use **WhatsApp Web Link** (Option 4)
- No setup required
- Works immediately
- Less automated

---

## Testing Your Setup

1. Submit a test form with dummy data
2. Check if you receive the WhatsApp message
3. Verify all fields are showing correctly
4. Make sure the formatting looks good

## Troubleshooting

**Not receiving messages?**
- Check your webhook URL is correct in script.js
- Verify your Make.com/Zapier scenario is turned ON
- Check your WhatsApp number format (must include country code)
- Look at browser console for errors

**Messages formatting wrong?**
- Check the message template in Make.com/Zapier
- Ensure field names match exactly

**Webhook failing?**
- Check CORS settings if using your own backend
- Verify the webhook is accepting POST requests
- Check the JSON payload format

---

## Cost Comparison

| Service | Free Tier | Cost After Free Tier |
|---------|-----------|---------------------|
| Make.com | 1,000 operations/month | $9/month for 10,000 |
| Zapier | 100 tasks/month | $19.99/month for 750 |
| Twilio | Pay per message | $0.005 per WhatsApp message |

For most small businesses, the free tiers are sufficient!

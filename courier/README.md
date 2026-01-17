# SwiftCourier Website

A professional courier business website with an inquiry form that sends submissions to your email.

## Features

- Responsive design (mobile, tablet, desktop)
- Professional landing page with services showcase
- Contact/inquiry form with email integration
- Modern UI with smooth animations
- SEO-friendly structure

## Setting Up Email Notifications

The inquiry form uses [Formspree](https://formspree.io/) to send form submissions directly to your email. Follow these steps:

### 1. Create a Formspree Account

1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account (allows 50 submissions/month)
3. Verify your email address

### 2. Create a New Form

1. Click "New Form" in your Formspree dashboard
2. Give it a name (e.g., "SwiftCourier Inquiries")
3. Enter the email address where you want to receive inquiries
4. Click "Create Form"

### 3. Get Your Form ID

1. After creating the form, you'll see a form endpoint like: `https://formspree.io/f/xyzabc123`
2. Copy the form ID (the part after `/f/`, e.g., `xyzabc123`)

### 4. Update inquiry.html

1. Open `inquiry.html`
2. Find line 32 with: `action="https://formspree.io/f/YOUR_FORM_ID"`
3. Replace `YOUR_FORM_ID` with your actual form ID
4. Save the file

Example:
```html
<form id="inquiryForm" class="inquiry-form" action="https://formspree.io/f/xyzabc123" method="POST">
```

### 5. Set Up WhatsApp Notifications (Optional)

To receive WhatsApp messages when forms are submitted, see the detailed guide in [WHATSAPP_SETUP.md](WHATSAPP_SETUP.md).

Quick setup:
1. Create a free account on [Make.com](https://www.make.com/)
2. Set up a webhook + WhatsApp scenario
3. Copy your webhook URL
4. Update line 2 in `script.js` with your webhook URL

### 6. Test the Form

1. Open the website in your browser
2. Fill out the inquiry form
3. Submit it
4. Check your email (and WhatsApp if configured) for the submission

## Deploying Your Website

You can host this website for free on several platforms:

### Option 1: GitHub Pages (Recommended)

1. Create a GitHub repository
2. Push all files to the repository
3. Go to Settings > Pages
4. Select the branch to deploy
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Netlify

1. Create an account at [Netlify](https://www.netlify.com/)
2. Drag and drop the `courier` folder into Netlify
3. Your site will be live instantly with a custom URL
4. Optional: Add a custom domain

### Option 3: Vercel

1. Create an account at [Vercel](https://vercel.com/)
2. Import your project from GitHub or upload files
3. Deploy with one click
4. Get a live URL instantly

### Option 4: Surge

1. Install Surge: `npm install -g surge`
2. Navigate to the courier folder: `cd courier`
3. Run: `surge`
4. Follow the prompts to deploy

## File Structure

```
courier/
├── index.html          # Main landing page
├── inquiry.html        # Contact/quote request form
├── styles.css          # All styling
├── script.js           # Form handling JavaScript
└── README.md           # This file
```

## Customization

### Change Company Name

Search and replace "SwiftCourier" in:
- `index.html`
- `inquiry.html`

### Update Contact Information

Edit the footer in both HTML files:
- Email: info@swiftcourier.com
- Phone: (555) 123-4567

### Change Colors

Edit `styles.css`:
- Primary blue: `#2563eb`
- Dark blue: `#1d4ed8`
- Background: `#f8f9fa`

### Add Your Logo

Replace the text logo in both HTML files with an image:
```html
<div class="logo">
    <img src="logo.png" alt="SwiftCourier">
</div>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

Free to use and modify for your business.

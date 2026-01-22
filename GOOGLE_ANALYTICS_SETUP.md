# Google Analytics 4 Setup Guide for Hotel Confort Arenal

This guide will walk you through setting up Google Analytics 4 (GA4) for your hotel website.

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account (or create one if you don't have one)
3. Click **"Start measuring"** or **"Create Account"**

## Step 2: Set Up Your Account

1. **Account name**: Enter `Hotel Confort Arenal`
2. Configure data sharing settings (recommended to keep all checked)
3. Click **"Next"**

## Step 3: Set Up Your Property

1. **Property name**: Enter `Hotel Confort Arenal Website`
2. **Reporting time zone**: Select `(GMT-06:00) Costa Rica`
3. **Currency**: Select `Costa Rican Colon (CRC)` or `US Dollar (USD)`
4. Click **"Next"**

## Step 4: Business Information

1. **Industry category**: Select `Travel`
2. **Business size**: Select the appropriate size
3. **How do you intend to use Google Analytics**: Check relevant options:
   - Measure customer engagement with my site or app
   - Generate more leads
   - Drive online sales
4. Click **"Create"**

## Step 5: Accept Terms of Service

1. Select your country: `Costa Rica`
2. Accept the Google Analytics Terms of Service
3. Click **"I Accept"**

## Step 6: Set Up Data Collection (Web)

1. Select **"Web"** as your platform
2. Enter your website details:
   - **Website URL**: `https://www.confortarenal.com`
   - **Stream name**: `Hotel Confort Arenal Website`
3. Click **"Create stream"**

## Step 7: Get Your Measurement ID

After creating the stream, you'll see your **Measurement ID**. It looks like this:
```
G-XXXXXXXXXX
```

**Copy this ID - you'll need it for the next step!**

## Step 8: Update Your Website Code

Now you need to replace the placeholder in your website files.

### Option A: Using Find and Replace (Recommended)

1. Open your code editor (VS Code, Sublime Text, etc.)
2. Open the `hotel-confort-arenal` folder
3. Use **Find and Replace** across all files:
   - Find: `G-XXXXXXXXXX`
   - Replace with: Your actual Measurement ID (e.g., `G-ABC123XYZ`)
4. Replace in these files:
   - `index.html`
   - `pages/rooms.html`
   - `pages/about.html`
   - `pages/gallery.html`
   - `pages/contact.html`

### Option B: Manual Update

Open each HTML file and find this code block in the `<head>` section:

```html
<!-- Google Analytics 4 - Replace G-XXXXXXXXXX with your actual Measurement ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace both instances of `G-XXXXXXXXXX` with your actual Measurement ID.

## Step 9: Verify Installation

1. Deploy your updated website
2. Go to Google Analytics > Reports > Realtime
3. Open your website in another browser tab
4. You should see yourself as an active user in the Realtime report

## Step 10: Set Up Conversion Events (Recommended)

Track important user actions:

### In Google Analytics:

1. Go to **Admin** (gear icon) > **Events**
2. Click **"Create event"** for each of these:

#### Book Now Button Clicks
- Event name: `book_now_click`
- Matching conditions: `event_name equals click` AND `link_url contains cloudbeds`

#### WhatsApp Button Clicks
- Event name: `whatsapp_click`
- Matching conditions: `event_name equals click` AND `link_url contains wa.me`

#### Phone Number Clicks
- Event name: `phone_click`
- Matching conditions: `event_name equals click` AND `link_url contains tel:`

3. After creating events, go to **Admin** > **Conversions**
4. Mark these events as conversions by toggling the switch

## Step 11: Set Up Google Search Console (Bonus)

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click **"Add property"**
3. Select **"URL prefix"** and enter `https://www.confortarenal.com`
4. Verify ownership using the HTML tag method or DNS verification
5. Once verified, submit your sitemap: `https://www.confortarenal.com/sitemap.xml`

## Troubleshooting

### Analytics not showing data?
- Wait 24-48 hours for data to appear in standard reports
- Check Realtime report for immediate verification
- Ensure you deployed the updated files

### Seeing "(not set)" for pages?
- This is normal for the first few hours
- Data will populate as users visit your site

### Need help?
- [Google Analytics Help Center](https://support.google.com/analytics/)
- [GA4 Setup Assistant](https://support.google.com/analytics/answer/9304153)

---

## Quick Reference

| Item | Value |
|------|-------|
| Property Name | Hotel Confort Arenal Website |
| Website URL | https://www.confortarenal.com |
| Measurement ID | G-XXXXXXXXXX (replace with yours) |
| Sitemap URL | https://www.confortarenal.com/sitemap.xml |

---

*Last updated: January 2026*

# Get Free Custom Domain - Step-by-Step Guide

## Quick Setup: FreeDNS (5 Minutes)

### Step 1: Create FreeDNS Account

1. **Open your browser** and go to: https://freedns.afraid.org/

2. **Click "Register"** (top right corner)

3. **Fill in the form:**
   - Username: (choose any username)
   - Email: (your email)
   - Password: (create password)
   - Captcha: (solve it)

4. **Check your email** and click the verification link

5. **Login** at: https://freedns.afraid.org/

---

### Step 2: Create Your Free Subdomain

1. **After login**, click: **"Subdomains"** in left menu

2. **Click: "Add"** button

3. **Fill in the form:**
   ```
   Type: A
   Subdomain: bakeryhouse (or any name you like)
   Domain: mooo.com (choose from dropdown - many options available)
   Destination: 192.0.2.1 (temporary, we'll change this)
   ```

4. **Click "Save"**

5. **Your free domain is now:** `bakeryhouse.mooo.com`

**Available free domain extensions:**
- mooo.com
- ddns.net
- chickenkiller.com
- crabdance.com
- ignorelist.com
- And many more!

---

### Step 3: Add Custom Domain to Cloudflare Pages

1. **Open:** https://dash.cloudflare.com/

2. **Click:** Workers & Pages (left sidebar)

3. **Click:** Your project `bakery-web`

4. **Click:** "Custom domains" tab (top)

5. **Click:** "Set up a custom domain" button

6. **Enter your domain:** `bakeryhouse.mooo.com` (or whatever you chose)

7. **Click "Continue"**

8. **Cloudflare will show you:**
   ```
   Add a CNAME record:
   bakeryhouse.mooo.com → bakery-web-5w9.pages.dev
   ```

9. **Copy this information** (you'll need it for next step)

---

### Step 4: Update FreeDNS DNS Records

1. **Go back to FreeDNS:** https://freedns.afraid.org/

2. **Click:** Subdomains (left menu)

3. **Find your subdomain** and click "Edit"

4. **Change:**
   ```
   Type: CNAME (change from A to CNAME)
   Destination: bakery-web-5w9.pages.dev (the value Cloudflare gave you)
   ```

5. **Click "Save"**

---

### Step 5: Wait for Activation

**In Cloudflare Dashboard:**
- Status will show "Verifying..."
- Wait 5-30 minutes for DNS to propagate
- Status will change to "Active" when ready

**You can check progress at:**
https://dash.cloudflare.com/ → Workers & Pages → bakery-web → Custom domains

---

### Step 6: Fix Safari SSL Issues

**Once your domain is "Active":**

1. **Go to Cloudflare dashboard:** https://dash.cloudflare.com/

2. **Look for your custom domain** in the left sidebar
   - If you see it listed (like "bakeryhouse.mooo.com"), click it
   - If not, it means FreeDNS domains don't get full Cloudflare features

**If you see your domain in sidebar:**
```
1. Click: SSL/TLS tab
2. Set: "Full (strict)" mode

3. Click: Network tab
4. Disable: HTTP/2
5. Disable: HTTP/3 (if available)
```

**If you DON'T see your domain in sidebar:**
This means FreeDNS domains use "CNAME only" setup and inherit Cloudflare Pages settings. In this case:
- Safari should work automatically once DNS propagates
- The custom domain bypasses the *.pages.dev SSL issue

---

## Alternative: DuckDNS (If FreeDNS Blocked)

### Quick Setup:

1. **Go to:** https://www.duckdns.org/

2. **Sign in** with Google/GitHub (no registration needed)

3. **Enter subdomain:** `bakeryhouse`

4. **Click:** "Add domain"

5. **You get:** `bakeryhouse.duckdns.org`

6. **In DuckDNS:**
   - Click "Install" tab
   - Choose your OS
   - Follow instructions to point domain to Cloudflare

7. **Then follow Step 3-6 above** (same process for Cloudflare)

---

## Troubleshooting

### Domain not activating?
- Wait 30 minutes (DNS takes time)
- Check DNS with: https://dnschecker.org/
- Verify CNAME points to: `bakery-web-5w9.pages.dev`

### Safari still not working?
- Clear Safari cache completely
- Try different network (mobile data vs WiFi)
- Check if domain is fully "Active" in Cloudflare

### FreeDNS blocked in your country?
- Use DuckDNS instead
- Or use No-IP: https://www.noip.com/

---

## Summary

**What you'll have:**
- Free custom domain: `bakeryhouse.mooo.com` (or similar)
- Connected to Cloudflare Pages
- Works on Safari (no more SSL_ERROR_SYSCALL)
- Works on all browsers
- Free forever

**Total cost:** $0
**Total time:** 5-10 minutes setup + 5-30 minutes DNS propagation

---

## After Setup

Once your custom domain is active, test on Safari:
1. Visit: `https://bakeryhouse.mooo.com` (your domain)
2. Should load on Safari/iOS without issues
3. All your fixes are already deployed

---

## Need Help?

If you get stuck at any step, let me know:
- Which step you're on
- What error/message you see
- Screenshot if helpful

I'll help you troubleshoot!

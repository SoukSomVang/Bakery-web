# 📰 News Management System - User Guide

## Overview

The News Management System allows you to create, edit, and publish news articles for your Bakery Public website. All news articles are stored in Firebase Firestore and can include multiple images.

---

## 🎯 Quick Start - Creating Your First News Article

### Step 1: Access the Admin Panel

1. Navigate to your admin panel (e.g., `http://localhost:3000/news` for local development)
2. You'll see the News Management page with a list of existing articles (empty if none exist yet)

### Step 2: Create a New Article

1. Click the **"Add News Article"** button in the top-right corner
2. You'll be redirected to the news creation form

### Step 3: Fill Out the Form

#### Required Fields:
- **Title (Lao)** - Main title in Lao language
- **Content (Lao)** - Full article content in Lao language

#### Optional Fields:
- **Title (English)** - English version of the title
- **Summary (Lao)** - Brief summary in Lao (shown in news cards)
- **Summary (English)** - Brief summary in English
- **Content (English)** - Full article content in English
- **Author** - Author's name
- **Category** - Category tag (e.g., "Announcement", "Product", "Event")
- **Tags** - Comma-separated tags (e.g., "bakery, new product, promotion")
- **Images** - Upload multiple images (drag & drop or click to browse)
- **Publish immediately** - Check this to publish the article immediately

### Step 4: Upload Images

1. Click on the upload area or drag images directly
2. You can upload multiple images (they will be shown in a gallery)
3. Preview images appear below the upload area
4. Click the X button on any preview to remove an image before uploading

### Step 5: Save the Article

1. Click **"Create News Article"** to save
2. The article will be added to Firebase and you'll be redirected to the news list
3. If you checked "Publish immediately", it will appear on the public website

---

## 📝 Example News Article

Here's an example to help you create your first article:

### Sample Data:

**Title (Lao):** ຂໍ້ມູນຂ່າວສານໃໝ່ຈາກ BakeryHouse
**Title (English):** New Announcement from BakeryHouse

**Summary (Lao):** ພວກເຮົາມີຄວາມຍິນດີທີ່ຈະແຈ້ງໃຫ້ທ່ານຮູ້ກ່ຽວກັບຜະລິດຕະພັນໃໝ່ຂອງພວກເຮົາ
**Summary (English):** We are excited to announce our new products

**Content (Lao):**
```
ພວກເຮົາມີຄວາມຍິນດີທີ່ຈະແນະນຳຜະລິດຕະພັນໃໝ່ຂອງພວກເຮົາທີ່ BakeryHouse.

ຕັ້ງແຕ່ວັນທີ 10/10/2024, ພວກເຮົາໄດ້ເປີດໂຮງງານຜະລິດເຂົ້າໝົມປັງທີ່ທັນສະໄໝ ເພື່ອນຳເອົາຄຸນນະພາບທີ່ດີທີ່ສຸດມາສູ່ລູກຄ້າທຸກທ່ານ.

ຜະລິດຕະພັນຂອງພວກເຮົາ:
- ເຂົ້າໝົມປັງສົດໃໝ່ທຸກມື້
- ເຄັກຫຼາກຫຼາຍປະເພດ
- ເພສະຕຣີແລະຂອງຫວານ

ເຮົາໃຊ້ວັດຖຸດິບຄຸນນະພາບດີເທົ່ານັ້ນ ແລະ ໄດ້ຮັບການອານຸມັດຈາກອົງກອນ FDA ແລະ GMP.

ຂອບໃຈທີ່ສະໜັບສະໜູນ BakeryHouse!
```

**Content (English):**
```
We are thrilled to introduce our new products at BakeryHouse.

Since October 10, 2024, we have opened a modern bakery production facility to bring the highest quality to all our customers.

Our Products:
- Fresh bread baked daily
- Various types of cakes
- Pastries and desserts

We use only high-quality ingredients and are certified by FDA and GMP organizations.

Thank you for supporting BakeryHouse!
```

**Author:** BakeryHouse Team
**Category:** Announcement
**Tags:** bakery, new products, grand opening
**Images:** Upload 2-3 images of your bakery products or facility
**Publish immediately:** ✅ Checked

---

## 📋 Managing News Articles

### View All Articles
- Navigate to `/news` in the admin panel
- See a table with all articles showing:
  - Thumbnail image
  - Title
  - Author
  - Category
  - Status (Published/Draft)
  - Creation date

### Edit an Article
1. Click the **"Edit"** button on any article
2. Update the fields you want to change
3. You can add new images or remove existing ones
4. Click **"Update News Article"** to save changes

### Delete an Article
1. Click the **"Delete"** button on any article
2. A confirmation modal will appear
3. Click **"Delete"** to confirm (this action cannot be undone)

### Publish/Unpublish
- Check/uncheck the "Published" checkbox when editing
- Only published articles appear on the public website
- Draft articles are only visible in the admin panel

---

## 🌐 How Articles Appear on Public Website

### Home Page (NewsSection)
- Shows the latest 3 published news articles
- Displays thumbnail, title, summary, and publication date
- Click on any article to view the full details

### News Detail Page
- Shows full article content
- Displays all uploaded images:
  - First image as featured/hero image
  - Additional images in a grid gallery
  - Click any image to view in full-screen modal
- Shows author, category, tags, and publication date
- Supports bilingual display (switches based on language selection)

---

## 🎨 Features

### Bilingual Support
- All text fields have Lao and English versions
- Public website automatically shows content based on user's language selection
- Falls back to Lao if English version is not provided

### Multiple Images
- Upload as many images as needed
- First image becomes the featured/thumbnail image
- Additional images shown in a gallery on the detail page
- Images can be viewed in full-screen modal

### Rich Content Display
- Content preserves line breaks and formatting
- Responsive design works on all devices
- Beautiful card-based layout
- Smooth animations and transitions

### SEO Optimization
- Automatic meta tags generation
- Open Graph tags for social sharing
- Structured data for search engines

---

## 🔧 Technical Details

### Database Structure (Firestore)
```javascript
{
  id: "auto-generated",
  title: "ຂໍ້ມູນຂ່າວສານໃໝ່",
  titleEn: "New Announcement",
  content: "Full content in Lao...",
  contentEn: "Full content in English...",
  summary: "Brief summary in Lao",
  summaryEn: "Brief summary in English",
  images: ["url1", "url2", "url3"],
  imageUrl: "url1", // First image
  author: "BakeryHouse Team",
  category: "Announcement",
  tags: ["bakery", "new products"],
  isPublished: true,
  publishedAt: Timestamp,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Image Storage
- Images are uploaded to Firebase Storage
- Stored in: `/images/news/`
- Automatic URL generation
- Files named with timestamp to avoid conflicts

### Security
- Only published articles are visible to public
- Admin routes require authentication (if configured)
- Read-only access for public website
- Full CRUD access in admin panel

---

## 🚀 Deployment Checklist

Before deploying news to production:

- [ ] Test article creation with sample data
- [ ] Verify images upload correctly
- [ ] Check bilingual display on public site
- [ ] Test on mobile devices
- [ ] Verify published/draft status works
- [ ] Test edit and delete functionality
- [ ] Check SEO meta tags
- [ ] Verify Firebase security rules allow public read access

---

## 💡 Best Practices

### Content Writing
1. **Keep summaries short** - 1-2 sentences (max 150 characters)
2. **Use clear titles** - Descriptive and engaging
3. **Format content** - Use line breaks for readability
4. **Add relevant tags** - Helps with categorization and search

### Image Guidelines
1. **Use high-quality images** - At least 1200x800 pixels
2. **Optimize file size** - Keep under 1MB per image
3. **Relevant images** - Show products, events, or facilities
4. **Consistent style** - Maintain visual consistency across articles

### Publishing Strategy
1. **Save as draft first** - Review before publishing
2. **Schedule publication** - Uncheck publish, then edit when ready
3. **Update regularly** - Keep content fresh and relevant
4. **Archive old news** - Unpublish outdated articles

---

## ❓ Troubleshooting

### Images not uploading
- Check file size (must be under 10MB)
- Verify Firebase Storage is enabled
- Check internet connection
- Try different image format (JPG, PNG, GIF)

### Article not appearing on public site
- Verify "Publish immediately" is checked
- Check that isPublished is true
- Ensure publishedAt date is set
- Check Firebase security rules

### Content not displaying correctly
- Check for special characters
- Verify all required fields are filled
- Clear browser cache
- Check console for errors

---

## 📞 Support

For additional help or questions:
- Check Firebase Console for database/storage issues
- Review browser console for JavaScript errors
- Check Firestore security rules
- Verify Firebase SDK initialization

---

**Happy News Publishing! 📰✨**

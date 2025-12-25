# Complete Figma Design Implementation Instructions for Cursor AI

## 🎯 CRITICAL: Design System Foundation

### 1. Font Configuration (MUST BE EXACT)

**Primary Font:** Alexandria from Google Fonts

- Weights needed: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Subsets: Arabic, Latin
- Variable: `--font-alexandria`
- **IMPORTANT:** Apply `font-alexandria` class to `<body>` tag
- Add anti-aliasing: `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale`

### 2. Complete Typography Tokens (Extract from Figma JSON)

Create these EXACT typography classes in globals.css:

```css
/* Top Bar - "دولار أمريكي (USD)", "الانجليزيه" */
.topbar-text {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  color: #ffffff;
}

/* Top Bar - "هل أنت مستعد لمساعدتهم؟ لنصبح متطوعين" */
.topbar-promo {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  color: #ffffff;
}

/* Navbar Items - "المدونة", "معرض الاعمال", etc. */
.navbar-item {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 500; /* CRITICAL: Medium = 500, NOT 400 */
  line-height: 26px;
  color: #0d0d0d;
}

/* Navbar Active/Highlighted - "المشاريع" */
.navbar-item-active {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  color: #007f5e; /* Primary color */
}

/* Donate Button Text - "تبرع الان" */
.btn-donate-text {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 500;
  line-height: 26px;
  color: #ffffff;
}

/* Hero Subtitle - "تبرعك اليوم يصنع أثرًا لا يُنسى" */
.hero-subtitle {
  font-family: var(--font-alexandria);
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  color: #b4bb5f; /* Secondary color */
}

/* Hero Main Title - "آخر مشاريعنا" */
.hero-title {
  font-family: var(--font-alexandria);
  font-size: 58px;
  font-weight: 600; /* Semibold */
  line-height: 58px;
  color: #0d0d0d;
  text-align: center;
}

/* Breadcrumb Text - "الرئيسية", "آخر مشاريعنا" */
.breadcrumb-text {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  color: #b4bb5f;
}

/* Section Title - "أطفال غزة ينتظرون يد العون… كن أنت سبب الأمل" */
.section-title-primary {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #007f5e;
}

/* Section Title Large - "كن سببا في ابتسامة شخص ما" */
.section-title-large {
  font-family: var(--font-alexandria);
  font-size: 32px;
  font-weight: 600;
  line-height: 48px;
  color: #12182a; /* Dark variant */
  text-align: center;
}

/* Footer Section Headers - "المكتب الرئيسي", "روابط مهمة" */
.footer-section-title {
  font-family: var(--font-alexandria);
  font-size: 20px;
  font-weight: 600;
  line-height: 31.36px;
  color: #ffffff;
}

/* Footer Body Text - Address, phone, email */
.footer-body-text {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  color: #ffffff;
}

/* Footer Link Text - "سياسة الخصوصية", etc. */
.footer-link {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  color: #ffffff;
}

/* Footer Mission Statement */
.footer-mission {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  color: #ffffff;
  text-align: right;
}

/* Copyright Text */
.copyright-text {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  color: #ffffff;
  text-align: center;
}

/* Newsletter Heading */
.newsletter-heading {
  font-family: var(--font-alexandria);
  font-size: 24px;
  font-weight: 600;
  line-height: 48px;
  color: #ffffff;
  text-align: right;
}

/* Newsletter Input Placeholder */
.newsletter-input::placeholder {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  color: #ffffff;
}
```

### 3. Color System (EXACT values from Figma)

```css
:root {
  /* Primary Colors */
  --color-primary: #007f5e;
  --color-secondary: #b4bb5f;
  --color-accent: #dfd383;

  /* Text Colors */
  --color-dark: #0d0d0d;
  --color-dark-alt: #12182a;
  --color-white: #ffffff;
  --color-paragraph: rgba(13, 13, 13, 0.7);

  /* Background Colors */
  --bg-gradient-start: rgba(180, 187, 95, 0.12); /* B4BB5F with 12% opacity */
  --bg-gradient-end: rgba(255, 255, 255, 1);
}
```

### 4. Component-Specific Measurements

#### Top Bar (Green Header)

- Height: 50px
- Background: #007F5E
- Padding: 12.92px vertical
- Container max-width: 1280px
- Horizontal padding: 320px (from edges)

#### Main Navigation

- Height: 111px (total frame height)
- Inner container height: 50px (menu items)
- Position from top: 50px (after top bar)
- Max-width: 1280px
- Horizontal padding: 320px

#### Navigation Items Spacing

- Gap between items: 30px
- Active item has border-bottom: 2px solid #007F5E
- Active item height: 50px (stretches full height)

#### Donate Button

- Width: 159px
- Height: 58px
- Border-radius: 35px (fully rounded)
- Background: #007F5E
- Text centered
- Icon size: 20x20px
- Icon rotation: 90deg (arrow pointing up)

#### Hero Section

- Height: 502px total
- Background: Linear gradient
  - Start: rgba(180, 187, 95, 0.12) at top
  - End: white at bottom
  - Direction: vertical (top to bottom)
  - Transform: vertical stretch

#### Hero Content Container

- Width: 341px
- Height: 169px
- Position: Center of hero section (x: 790px, y: 262px from design)
- Gap between elements: 8px

#### Hero Subtitle Container

- Width: 271px
- Height: 30px
- Gap between icon and text: 5px
- Icon size: 28x28px

#### Hero Title

- Width: 341px
- Height: 93px (allows for 2 lines)
- Text aligned: center

#### Breadcrumb Container

- Width: 235px
- Height: 30px
- Centered horizontally
- Gap between items: 10px
- Gap within items (icon + text): 5px
- Icon size: 24x24px

#### Footer

- Height: 692.99px
- Background: #007F5E
- Background gradient overlay: Linear gradient (0 to 5% opacity white)
- Background image overlay: 30% opacity
- Container max-width: 1280px
- Horizontal padding: 320px

#### Footer Top Section (Newsletter + Links)

- Starts at: 58.25px from footer top
- Height: 232.34px
- Gap between columns: 201px

#### Footer Column Widths

- "المكتب الرئيسي" (Main Office): 319px
- "روابط مهمة" (Important Links): 171px
- "روابط سريعة" (Quick Links): 171px
- "Logo and Social": 450px

#### Footer Section Spacing

- Title to content gap: 16px
- Items within sections: 10px gap

#### Footer Contact Info

- Icon size: 24x24px
- Gap between icon and text: 15px
- Icons are gold/yellow: #DFD383

#### Footer Bottom

- Copyright section height: 79px
- Border-top: 1px solid #FFFFFF
- Text centered

## 🚨 CRITICAL IMPLEMENTATION RULES

### Rule 1: Font Weight Mapping

**NEVER use font-weight: 400 for navbar items**

```
Figma "Regular" = CSS 400
Figma "Medium" = CSS 500 ← NAVBAR USES THIS
Figma "Semibold" = CSS 600
Figma "Bold" = CSS 700
```

### Rule 2: RTL (Right-to-Left) Layout

- Add `dir="rtl"` to HTML tag
- All text should align right by default
- Flexbox: use `flex-direction: row-reverse` for horizontal layouts
- Navigation order: rightmost item first

### Rule 3: Spacing System

Use EXACT pixel values from Figma:

- Container padding: 320px (left/right)
- Section gaps: Match Figma's `itemSpacing` values
- Component gaps: Match Figma's `itemSpacing` values

### Rule 4: Color Usage

- Primary (#007F5E): Headers, buttons, active states, footer background
- Secondary (#B4BB5F): Subtitles, breadcrumbs, accents
- Accent (#DFD383): Icons, highlights, decorative elements
- Dark (#0D0D0D): Body text, main content

### Rule 5: Line Height Preservation

**DO NOT use Tailwind's default line heights**

- Use EXACT line-height values from Figma JSON
- Example: If Figma shows "height": 26, use `line-height: 26px`

## 📋 Implementation Checklist for Cursor

```markdown
- [ ] Install Alexandria font with weights [400, 500, 600, 700]
- [ ] Apply font-alexandria class to body tag
- [ ] Add font-smoothing CSS properties
- [ ] Create all typography token classes in globals.css
- [ ] Set up color CSS variables
- [ ] Configure RTL direction (dir="rtl" on html)
- [ ] Update ALL navbar items to font-weight: 500
- [ ] Set container max-width: 1280px
- [ ] Set horizontal padding: 320px on main container
- [ ] Match exact spacing values (itemSpacing from Figma)
- [ ] Use exact component heights (from Figma JSON)
- [ ] Apply correct border-radius values
- [ ] Set up gradient backgrounds correctly
- [ ] Position elements using exact x, y coordinates (for reference)
- [ ] Match icon sizes exactly (24x24, 28x28, etc.)
- [ ] Apply correct colors to all elements
- [ ] Test all text with actual Arabic content
- [ ] Verify font rendering in browser DevTools
- [ ] Compare with Figma side-by-side (50% opacity overlay)
```

## 🔍 How to Verify Implementation

1. **Font Check:**
   - Open DevTools → Select any text
   - Computed tab → Check `font-family` shows Alexandria
   - Check `font-weight` shows correct numeric value
   - Check `font-size` and `line-height` match exactly

2. **Spacing Check:**
   - Use DevTools ruler to measure gaps
   - Should match Figma's `itemSpacing` values
   - Container padding should be 320px

3. **Color Check:**
   - Use color picker on design
   - Compare hex values with Figma
   - Check rgba values for overlays/gradients

4. **Overlay Test:**
   - Take Figma screenshot
   - Place as background-image with 50% opacity
   - Your HTML should align perfectly

## 📝 Example Fix Pattern

**BEFORE (Wrong):**

```jsx
<a className="text-base leading-6 font-medium">المدونة</a>
```

**AFTER (Correct):**

```jsx
<a className="navbar-item">المدونة</a>
```

Where `.navbar-item` is defined as:

```css
.navbar-item {
  font-family: var(--font-alexandria);
  font-size: 16px;
  font-weight: 500; /* NOT 400! */
  line-height: 26px; /* NOT 24px! */
  color: #0d0d0d;
}
```

## 🎨 Component Structure Reference

### Top Bar Structure

```
TopBar (50px height, bg: #007F5E)
└── Container (max-w: 1280px, px: 320px)
    ├── Left: Language/Currency (topbar-text)
    ├── Center: Promo text (topbar-promo)
    └── Right: Support links (topbar-text)
```

### Navigation Structure

```
Navigation (111px height)
└── Container (max-w: 1280px, px: 320px)
    ├── Left: Logo (85x95px)
    ├── Center: Menu (50px height)
    │   └── Items (navbar-item, gap: 30px)
    │       └── Active item (navbar-item-active with border)
    └── Right: Donate button + Profile icon
```

### Hero Structure

```
Hero (502px height)
├── Background (gradient + shapes)
└── Content (341x169px, centered)
    ├── Subtitle (hero-subtitle, gap: 5px with icon)
    ├── Title (hero-title, 58px text)
    └── Breadcrumb (breadcrumb-text, gap: 10px)
```

### Footer Structure

```
Footer (692.99px height, bg: #007F5E)
├── Newsletter Section (top)
│   ├── Heading (newsletter-heading)
│   └── Input form (newsletter-input)
├── Links Section (4 columns, gap: 201px)
│   ├── Office Info (footer-body-text)
│   ├── Important Links (footer-link)
│   ├── Quick Links (footer-link)
│   └── Logo + Social (footer-mission)
└── Copyright (footer-bottom)
    └── Text (copyright-text)
```

---

## ⚡ Quick Reference: Most Common Mistakes

1. ❌ Using `font-normal` (400) for navbar → ✅ Use `font-medium` (500)
2. ❌ Using Tailwind's `text-base` → ✅ Use custom class with exact line-height
3. ❌ Using `leading-6` (24px) → ✅ Use `leading-[26px]` or custom class
4. ❌ Forgetting `dir="rtl"` → ✅ Add to html tag
5. ❌ Using arbitrary padding → ✅ Use 320px horizontal padding
6. ❌ Wrong color shades → ✅ Use exact hex values from Figma
7. ❌ Not loading all font weights → ✅ Load [400, 500, 600, 700]
8. ❌ Missing anti-aliasing → ✅ Add webkit-font-smoothing

---

## 📖 Usage Instructions for Cursor AI

When implementing any Figma design:

1. **Read this guide first** - Review all typography tokens, colors, and measurements
2. **Extract Figma JSON** - Get exact values from Figma's design tokens
3. **Apply typography classes** - Use the predefined classes instead of Tailwind defaults
4. **Verify font weights** - Double-check navbar items use 500, not 400
5. **Check line heights** - Use exact values from Figma, not Tailwind defaults
6. **Match spacing** - Use exact pixel values for gaps and padding
7. **Test with Arabic text** - Ensure RTL layout works correctly
8. **Compare side-by-side** - Use overlay technique to verify alignment

**Quick Command for Cursor:**

```
Read the Figma Design Implementation Guide at docs/FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md and implement all changes according to the specifications.
```

---

_Last Updated: 2024_
_This guide should be referenced for EVERY Figma design import_

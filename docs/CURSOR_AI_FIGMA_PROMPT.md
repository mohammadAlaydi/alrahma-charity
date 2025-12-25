# Cursor AI Prompt Template for Figma Design Implementation

## 🎯 Standard Prompt for Figma Imports

Copy and paste this prompt when implementing any Figma design:

```
Read the Figma Design Implementation Guide at docs/FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md
and implement ALL the changes according to the specifications.

Priority fixes:
1. Update ALL typography to use the exact token classes defined in the guide
2. Fix navbar font-weight to 500 (Medium) not 400
3. Ensure line-heights match EXACTLY (26px for navbar, not 24px)
4. Apply 320px horizontal padding to main containers
5. Use exact color values from the color system
6. Verify font-family Alexandria is loaded with all 4 weights [400, 500, 600, 700]
7. Ensure RTL layout is configured (dir="rtl" on HTML tag)

After implementation, verify using the checklist in the guide.
```

## 🔍 Verification Prompt

After implementation, use this to verify:

```
Verify the Figma implementation by:
1. Checking all typography classes match the guide specifications
2. Confirming navbar items use font-weight: 500
3. Measuring spacing with DevTools to match Figma values
4. Comparing colors with exact hex values from the guide
5. Testing RTL layout with Arabic text
6. Verifying font rendering in browser DevTools
```

## 📋 Component-Specific Prompts

### For Navbar Implementation:

```
Implement the navigation bar according to FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md:
- Use .navbar-item class (font-weight: 500, line-height: 26px)
- Active items use .navbar-item-active class
- Gap between items: 30px
- Container max-width: 1280px, padding: 320px horizontal
- Height: 111px total, menu items: 50px
```

### For Hero Section:

```
Implement the hero section according to FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md:
- Height: 502px
- Background: Linear gradient from rgba(180, 187, 95, 0.12) to white
- Use .hero-subtitle class (20px, 400 weight, 30px line-height)
- Use .hero-title class (58px, 600 weight, 58px line-height)
- Content container: 341x169px, centered
```

### For Footer Implementation:

```
Implement the footer according to FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md:
- Height: 692.99px
- Background: #007F5E
- Use .footer-section-title for headers (20px, 600 weight)
- Use .footer-body-text for content (16px, 400 weight, 30px line-height)
- Use .footer-link for links
- Container max-width: 1280px, padding: 320px horizontal
- Column gaps: 201px
```

## ⚡ Quick Fix Prompts

### Fix Typography:

```
Update all typography to use classes from FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md.
Replace Tailwind utility classes (text-base, font-medium, leading-6) with
the exact typography token classes defined in the guide.
```

### Fix Font Weights:

```
Update all navbar items to use font-weight: 500 (not 400).
Check FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md for the correct font-weight mapping.
```

### Fix Spacing:

```
Update container padding to 320px horizontal and max-width to 1280px.
Match all spacing values exactly as specified in FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md.
```

### Fix Colors:

```
Update all colors to use exact hex values from FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md:
- Primary: #007F5E
- Secondary: #B4BB5F
- Accent: #DFD383
- Dark: #0D0D0D
- Dark Alt: #12182A
```

---

**Reference Files:**

- Full Guide: `docs/FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md`
- Quick Reference: `docs/FIGMA_QUICK_REFERENCE.md`

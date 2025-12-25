# Figma Design Quick Reference

## 🚀 Quick Start for Figma Imports

**Before starting any Figma implementation, read:** `FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md`

## ⚡ Critical Rules (Top 5)

1. **Navbar font-weight = 500** (NOT 400!)
2. **Line-height = 26px for navbar** (NOT 24px!)
3. **Container padding = 320px horizontal**
4. **Use exact color hex values** from Figma
5. **RTL layout** - Add `dir="rtl"` to HTML

## 🎨 Typography Classes

| Element       | Class Name              | Font Size | Weight | Line Height |
| ------------- | ----------------------- | --------- | ------ | ----------- |
| Navbar Items  | `.navbar-item`          | 16px      | 500    | 26px        |
| Navbar Active | `.navbar-item-active`   | 16px      | 500    | 26px        |
| Hero Subtitle | `.hero-subtitle`        | 20px      | 400    | 30px        |
| Hero Title    | `.hero-title`           | 58px      | 600    | 58px        |
| Breadcrumb    | `.breadcrumb-text`      | 16px      | 400    | 30px        |
| Footer Title  | `.footer-section-title` | 20px      | 600    | 31.36px     |
| Footer Body   | `.footer-body-text`     | 16px      | 400    | 30px        |

## 🎨 Color Palette

```css
--color-primary: #007f5e /* Green - Primary actions */ --color-secondary: #b4bb5f
  /* Yellow-green - Accents */ --color-accent: #dfd383 /* Gold - Icons, highlights */
  --color-dark: #0d0d0d /* Black - Main text */ --color-dark-alt: #12182a /* Dark blue - Headings */
  --color-white: #ffffff /* White - Text on dark */;
```

## 📐 Common Measurements

- **Container max-width:** 1280px
- **Horizontal padding:** 320px
- **Top bar height:** 50px
- **Navbar height:** 111px (total), 50px (menu items)
- **Hero height:** 502px
- **Footer height:** 692.99px
- **Navbar item gap:** 30px
- **Donate button:** 159x58px, border-radius: 35px

## 🔧 Common Fixes

### Wrong:

```jsx
<a className="text-base leading-6 font-medium">المدونة</a>
```

### Correct:

```jsx
<a className="navbar-item">المدونة</a>
```

## 📋 Pre-Implementation Checklist

- [ ] Font Alexandria loaded with weights [400, 500, 600, 700]
- [ ] `dir="rtl"` on HTML tag
- [ ] Typography classes created in globals.css
- [ ] Color variables defined
- [ ] Container max-width: 1280px
- [ ] Horizontal padding: 320px

## 🔍 Verification Steps

1. DevTools → Computed → Check font-family = Alexandria
2. DevTools → Computed → Check font-weight = correct value
3. DevTools → Measure gaps = match Figma
4. Color picker → Compare hex values
5. Overlay test → 50% opacity Figma screenshot

---

**Full Guide:** `FIGMA_DESIGN_IMPLEMENTATION_GUIDE.md`

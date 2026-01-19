# Figma Design Implementation Guide

## ⚡ Critical Rules

1. **Navbar font-weight = 500** (NOT 400!)
2. **Line-height = 26px for navbar** (NOT 24px!)
3. **Container padding = 320px horizontal**, max-width: 1280px
4. **Use exact color hex values** from Figma
5. **RTL layout** - Add `dir="rtl"` to HTML
6. **Element positioning** - Use `justify-start` in flex containers, order elements from start to end in DOM

## 🎨 Typography

**Font:** Alexandria (weights: 400, 500, 600, 700)

| Element       | Font Size | Weight | Line Height | Color      |
| ------------- | --------- | ------ | ----------- | ---------- |
| Navbar Items  | 16px      | 500    | 26px        | #0d0d0d    |
| Navbar Active | 16px      | 500    | 26px        | #007f5e    |
| Hero Subtitle | 20px      | 400    | 30px        | #b4bb5f    |
| Hero Title    | 58px      | 600    | 58px        | #0d0d0d    |
| Breadcrumb    | 16px      | 400    | 30px        | #b4bb5f    |
| Footer Title  | 20px      | 600    | 31.36px     | #ffffff    |
| Footer Body   | 16px      | 400    | 30px        | #ffffff    |

## 🎨 Colors

```css
--color-primary: #007f5e    /* Green - Primary actions */
--color-secondary: #b4bb5f  /* Yellow-green - Accents */
--color-accent: #dfd383      /* Gold - Icons, highlights */
--color-dark: #0d0d0d        /* Black - Main text */
--color-dark-alt: #12182a    /* Dark blue - Headings */
--color-white: #ffffff        /* White - Text on dark */
```

## 📐 Common Measurements

- **Container:** max-width: 1280px, horizontal padding: 320px
- **Top bar:** height: 50px, bg: #007F5E
- **Navbar:** height: 111px (total), 50px (menu items), gap: 30px
- **Hero section:** height: 300px (mobile) / 391px (desktop)
- **Footer:** height: 692.99px, bg: #007F5E

## 📄 Page Header Structure (Standard Pattern)

**All pages should use this structure for the hero/header section:**

```tsx
<div className="min-h-screen bg-white">
  {/* Hero Section */}
  <section 
    className="relative h-[300px] md:h-[391px] overflow-hidden"
    style={{
      background: 'linear-gradient(180deg, rgba(180, 187, 95, 0.12) 0%, rgba(255, 255, 255, 0.12) 78.5%, rgba(255, 255, 255, 1) 100%)'
    }}
  >
    <Container className="relative z-10 flex h-full items-center justify-center">
      <PageHeader
        title="Page Title"
        subtitle="تبرعك اليوم يصنع أثرًا لا يُنسى"
        subtitleIcon="/figma/hugeicons-healthcare.svg"
        breadcrumbs={[
          { label: "الرئيسية", href: "/" },
          { label: "Page Name", href: "/page-path" },
        ]}
      />
    </Container>
  </section>

  <PageContent />
</div>
```

**Key Points:**
- Hero section height: `h-[300px] md:h-[391px]`
- Gradient background: `linear-gradient(180deg, rgba(180, 187, 95, 0.12) 0%, rgba(255, 255, 255, 0.12) 78.5%, rgba(255, 255, 255, 1) 100%)`
- PageHeader component is centered in Container
- Subtitle is always: "تبرعك اليوم يصنع أثرًا لا يُنسى"
- Subtitle icon: `/figma/hugeicons-healthcare.svg`
- Breadcrumbs: Always start with "الرئيسية" (Home)

## 🔄 RTL Element Positioning

**⚠️ CRITICAL:** When implementing cards/containers with multiple elements:

1. **Element Order:** Order from START to END in DOM
   - First in DOM = Right side in RTL
   - Last in DOM = Left side in RTL

2. **Flex Alignment:** Use `justify-start`, NOT `justify-end`

3. **Example:**
   ```jsx
   // ✅ CORRECT
   <div className="flex justify-start">
     <Icon /> {/* First = Right side */}
     <Title />
   </div>
   
   // ❌ WRONG
   <div className="flex justify-end">
     <Title />
     <Icon /> {/* Wrong order */}
   </div>
   ```

## 🔧 Common Fixes

**Typography:**
```jsx
// ❌ Wrong
<a className="text-base leading-6 font-medium">المدونة</a>

// ✅ Correct
<a className="font-alexandria text-[16px] font-medium leading-[26px]">المدونة</a>
```

**Element Positioning:**
```jsx
// ❌ Wrong
<div className="flex justify-end">
  <Title />
  <Icon />
</div>

// ✅ Correct
<div className="flex justify-start">
  <Icon />
  <Title />
</div>
```

## 📋 Pre-Implementation Checklist

- [ ] Font Alexandria loaded [400, 500, 600, 700]
- [ ] `dir="rtl"` on HTML tag
- [ ] Container max-width: 1280px, padding: 320px horizontal
- [ ] Page header uses standard structure above
- [ ] All elements use `justify-start` in flex containers
- [ ] Typography matches exact values from table
- [ ] Colors use exact hex values

## 🔍 Verification

1. DevTools → Computed → Check font-family = Alexandria
2. DevTools → Computed → Check font-weight = correct value
3. DevTools → Measure gaps = match Figma
4. Color picker → Compare hex values
5. Overlay test → 50% opacity Figma screenshot

---

_Reference this guide for EVERY Figma design import_


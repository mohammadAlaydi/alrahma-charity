# Blog Feature

This directory contains the blog components for the Alrahma Charity website.

## Components

### BlogCard
A reusable card component for displaying blog posts with:
- Feature image with category badge
- Post metadata (date, author)
- Title and excerpt
- Read more link

**Props:**
- `post: BlogPost` - The blog post data

**BlogPost Type:**
```typescript
{
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author?: string;
  date: string;
  imageUrl?: string;
}
```

## Usage

```tsx
import { BlogCard } from '@/features/blog/components/BlogCard';

const post = {
  id: "1",
  title: "Blog Post Title",
  excerpt: "Post excerpt...",
  category: "Category",
  date: "20 نوفمبر 2025",
};

<BlogCard post={post} />
```

## Design

The blog page implements the design from Figma with:
- Hero section with page header and breadcrumbs
- Featured articles section (horizontal scroll)
- Latest posts section (grid layout)
- Pagination controls
- Call-to-action section

## Features

- Responsive design
- RTL support for Arabic content
- Horizontal scrolling for featured articles
- Grid layout for latest posts
- Pagination with page numbers
- WhatsApp floating button

# Image Slider Component Usage

## Basic Usage

Import and use the `ImageSlider` component in your MDX files or React components:

```tsx
import { ImageSlider } from "@/app/components/image-slider";

// In your component or MDX file
<ImageSlider 
  images={[
    {
      src: "/images/philaworks/philaworks-portfolio-piece-printed-banner.jpg",
      alt: "PhilaWorks printed banner design - front view",
      caption: "Front view of the CareerLink banner concept.",
      href: "/images/philaworks/philaworks-portfolio-piece-printed-banner.jpg"
    },
    {
      src: "/images/philaworks/philaworks-portfolio-piece-printed-banner-1.jpg",
      alt: "PhilaWorks printed banner design - detail view",
      caption: "Detail showing typography and iconography.",
      href: "/images/philaworks/philaworks-portfolio-piece-printed-banner-1.jpg"
    },
    {
      src: "/images/philaworks/philworks-portfolio-piece-printed-banner-2.jpg",
      alt: "PhilaWorks printed banner design - installation",
      caption: "Installed banner showing scale at an event.",
      href: "/images/philaworks/philworks-portfolio-piece-printed-banner-2.jpg"
    }
  ]}
/>
```

## In Your MDX Project Files

You can use it directly in your project MDX files like `print-banner-design-layout.mdx`:

```mdx
---
title: CareerLink Marketing 7' Banner Design and Layout
description: Large format print banner design for events, retail displays, or promotional use.
topics:
  - Print Design
  - Large Format
  - Layout
  - Marketing
date: "2023-10-08"
published: true
---

## Project Overview

[Your project description here]

import { ImageSlider } from "@/app/components/image-slider";

<ImageSlider 
  images={[
    {
      src: "/images/philaworks/philaworks-portfolio-piece-printed-banner.jpg",
      alt: "Banner design - main view",
      caption: "Front view of the CareerLink banner concept.",
      href: "/images/philaworks/philaworks-portfolio-piece-printed-banner.jpg"
    },
    {
      src: "/images/philaworks/philaworks-portfolio-piece-printed-banner-1.jpg",
      alt: "Banner design - close up",
      caption: "Highlighting typography and iconography.",
      href: "/images/philaworks/philaworks-portfolio-piece-printed-banner-1.jpg"
    },
    {
      src: "/images/philaworks/philworks-portfolio-piece-printed-banner-2.jpg",
      alt: "Banner design - installed",
      caption: "Banner displayed at the event venue.",
      href: "/images/philaworks/philworks-portfolio-piece-printed-banner-2.jpg"
    }
  ]}
/>

## Design Considerations

[Rest of your content...]
```

## Features

- ✅ Fully accessible with ARIA labels and keyboard navigation
- ✅ Smooth transitions between slides
- ✅ Dot navigation for direct slide access
- ✅ Optional captions with translucent overlay
- ✅ Next.js Image optimization built-in
- ✅ Responsive design with Tailwind CSS
- ✅ Previous/Next arrow buttons
- ✅ Touch-friendly controls

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `images` | `Array<{src: string, alt: string, caption?: string, href?: string}>` | Yes | Array of image objects with src, alt text, optional caption, and optional link |
| `className` | `string` | No | Additional CSS classes for the container |

## Customization

You can customize the appearance by:
- Changing the aspect ratio (currently `aspect-[16/9]`)
- Modifying button styles and positioning
- Adjusting transition durations
- Changing dot indicator styles

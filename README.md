# Sarah Rettig Portfolio

##Please remove all of my personal information (projects, images, etc.) when forking and before deploying your own version of this portfolio site.

My portfolio website, built with React using [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Contentlayer](https://www.contentlayer.dev/) and deployed to [Vercel](https://vercel.com/). Future plans include moving to Astro framework since Content Layer used in this project is an older, less supported project. Astro has its own Content Layer feature.

Resume URLs are stored in `app/constants.ts`.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node)

### Install and run locally

```bash
git clone <your-repo-url>
cd nextjs-portfolio-vercel
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

`npm start` runs a production build and then starts the server. For local development, use `npm run dev` instead.

## Updating Contentlayer MDX files

Project content lives as MDX files under `content/`. Contentlayer reads those files, validates frontmatter against the schema in `contentlayer.config.js`, and generates typed data in `.contentlayer/` (gitignored). The app imports that data from `contentlayer/generated` (for example, `allProjects`).

### Where to edit

| Location | Purpose |
| --- | --- |
| `content/projects/*.mdx` | Portfolio case studies (routed at `/projects/[slug]`) |
| `content/pages/*.mdx` | Optional static pages (schema exists; add files here as needed) |
| `public/images/` | Images referenced from MDX frontmatter or body |
| `contentlayer.config.js` | Document types, fields, and MDX plugins |

### Editing an existing project

1. Open the matching file in `content/projects/` (filename becomes part of the URL slug).
2. Update the YAML frontmatter between the `---` markers and/or the Markdown body below it.
3. Save the file. While `npm run dev` is running, Contentlayer watches `content/` and regenerates automatically—refresh the browser to see changes.

### Adding a new project

1. Create a new `.mdx` file in `content/projects/`, e.g. `content/projects/my-new-project.mdx`.
2. Add required frontmatter (`title`, `description`) plus any optional fields (see below).
3. Set `published: true` when the project should appear on the site.
4. Place images in `public/images/<project-folder>/` and reference them with paths starting with `/images/...`.
5. Save and confirm the project appears at `/projects/my-new-project` (slug is derived from the path after `projects/`).

### Project frontmatter fields

Defined in `contentlayer.config.js` under the `Project` document type:

- **Required:** `title`, `description`
- **Common optional:** `published`, `date`, `companyName`, `jobTitle`, `topics`, `tools`, `repository`
- **`heroImages`:** list of `{ src, alt, caption }` objects for the project gallery
- **`url` / `url2`:** lists of `{ src, label, alt }` for external links

Example:

```yaml
---
title: My Project
description: Short summary shown on project cards.
companyName: Personal Project
published: true
date: "2026-01-15"
heroImages:
  - src: "/images/my-project/screenshot.png"
    alt: "Screenshot description"
topics:
  - Web Development
tools:
  - Next.js
---
```

The body below the frontmatter is standard MDX/Markdown (headings, lists, images, etc.).

### When changes do not show up

- **Body or frontmatter edits:** ensure the dev server is running (`npm run dev`). Hard-refresh the browser if needed.
- **Schema changes** (new or renamed fields in `contentlayer.config.js`): stop the dev server, delete `.contentlayer/` if it exists, then run `npm run dev` again.
- **Build errors:** check the terminal for Contentlayer validation errors (missing required fields, wrong types, invalid dates).

## Cloning / forking

Please remove all of my personal information (projects, images, etc.) when forking and before deploying your own version of this portfolio site.

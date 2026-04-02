# Crane Template Example

A production-ready example template for [Crane](https://www.npmjs.com/package/@lightspeed/crane) — the framework for building custom e-commerce themes. Built with Vue 3 and TypeScript, this template demonstrates best practices for creating sections, headers, footers, and layouts with proper settings schemas, SSR support, and reusable components.

## What's Inside

[Сasual-clothes-template](casual-clothes-template) template includes a complete apparel store theme:

- **9 Sections**: Hero banner, featured products, shop by category, promotion highlights (3 variants), testimonials, brand story, social media gallery
- **Header**: Mega menu with categories, search, language selector, cart, and account
- **Footer**: Links, language selector, and legal pages
- **Layouts**: Product, catalog, and category pages
- **Shared Library**: Reusable components, composables, and utilities

## Prerequisites

- Node.js 22+
- npm
- [Crane CLI](https://www.npmjs.com/package/@lightspeed/crane) (`@lightspeed/crane`)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/LightspeedHQ/crane-example-themes.git
cd crane-example-themes
cd casual-clothes-template

# Install dependencies
npm install

# Configure environment
cp env.example .env
# Edit .env with your credentials

# Create crane.config.json
echo '{"app_client_id": "your-app-id", "app_secret_key": "your-secret-key"}' > crane.config.json

# Start preview
npm run preview
```

Check for details [Quickstart with a Site theme example](https://docs.ecwid.com/site-themes/develop-site-themes/quickstart-with-a-site-theme-example).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run preview` | Start local preview server |
| `npm run build` | Build the template |
| `npm run deploy` | Deploy to Crane |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint and fix issues |

## Project Structure

```
├── sections/               # Custom sections
│   └── <section-name>/
│       ├── SectionName.vue     # Main component
│       ├── client.ts           # Client-side entry
│       ├── server.ts           # Server-side entry (SSR)
│       ├── type.ts             # TypeScript types
│       ├── components/         # Section-specific components
│       ├── settings/
│       │   ├── content.ts      # Content schema
│       │   ├── design.ts       # Design schema
│       │   └── translations.ts # i18n strings
│       ├── showcases/          # Preset configurations
│       └── assets/             # Images, icons
│
├── headers/                # Header components
├── footers/                # Footer components
├── layouts/                # Page layouts (product, catalog, category)
├── templates/              # Template configuration
│
├── shared/                 # Reusable code
│   ├── components/         # Vue components
│   ├── composables/        # Vue composables
│   ├── utils/              # Helper functions
│   ├── types/              # TypeScript types
│   └── constants/          # Shared constants
│
├── package.json
├── tsconfig.json
├── eslint.config.cjs
└── env.example
```

## Creating a Section

### 1. Create Section Folder

```bash
mkdir -p sections/my-section/{components,settings,showcases,assets}
```

### 2. Define Content Schema

```typescript
// sections/my-section/settings/content.ts
export default {
  title: {
    type: 'TEXTAREA',
    label: '$label.title',
    placeholder: '$placeholder.title',
  },
  image: {
    type: 'IMAGE',
    label: '$label.image',
  },
  button: {
    type: 'BUTTON',
    label: '$label.button',
  },
} as const
```

### 3. Define Design Schema

```typescript
// sections/my-section/settings/design.ts
export default {
  title: {
    type: 'TEXT',
    label: '$label.title_style',
    colors: ['#000000', '#FFFFFF', '#333333'],
    sizes: [24, 32, 40, 48],
    defaults: {
      font: 'inter',
      size: 32,
      bold: true,
      color: '#000000',
      visible: true,
    },
  },
  background: {
    type: 'BACKGROUND',
    label: '$label.background',
    defaults: {
      color: '#FFFFFF',
    },
  },
} as const
```

### 4. Add Translations

The project uses two types of translation files:

1. **`settings/translations.ts`** — UI labels for the Crane editor (field names, placeholders, descriptions)
2. **`showcases/translations.ts`** — Default content values for showcases (actual text displayed on the storefront)

```typescript
// sections/my-section/settings/translations.ts
// Labels for the Crane editor UI
export default {
  en: {
    '$label.title': 'Title',
    '$placeholder.title': 'Enter section title',
    '$label.image': 'Background Image',
    '$label.button': 'Call to Action',
  },
  es: {
    '$label.title': 'Título',
    '$placeholder.title': 'Ingrese el título de la sección',
    '$label.image': 'Imagen de Fondo',
    '$label.button': 'Llamada a la Acción',
  },
  // Add more languages: fr, de, nl, it...
}
```

```typescript
// sections/my-section/showcases/translations.ts
// Default content for showcases (storefront text)
export default {
  en: {
    '$label.showcase_1.title': 'Welcome to Our Store',
    '$label.showcase_1.button.title': 'Shop Now',
  },
  es: {
    '$label.showcase_1.title': 'Bienvenido a Nuestra Tienda',
    '$label.showcase_1.button.title': 'Comprar Ahora',
  },
}
```

**Supported languages:** `en`, `es`, `fr`, `de`, `nl`, `it`

**Key conventions:**
- Use `$label.` prefix for all translation keys
- Use `$placeholder.` prefix for input placeholders
- Showcase translations use `$label.showcase_N.` prefix where N is the showcase number

### 5. Create Types

```typescript
// sections/my-section/type.ts
import type content from './settings/content'
import type design from './settings/design'

export type Content = typeof content
export type Design = typeof design
```

### 6. Create Main Component

```vue
<!-- sections/my-section/MySection.vue -->
<template>
  <section class="my-section" :style="backgroundStyle">
    <h2 class="my-section__title" :style="titleStyle">
      {{ content.title }}
    </h2>
    <img 
      v-if="content.image?.set?.ORIGINAL?.url" 
      :src="content.image.set.ORIGINAL.url" 
      class="my-section__image"
    />
  </section>
</template>

<script setup lang="ts">
import { useCraneSection } from '@lightspeed/crane'
import { useBackgroundStyle } from '@shared/composables'
import { createTextStyle } from '@shared/utils'
import type { Content, Design } from './type'

const { content, design } = useCraneSection<Content, Design>()
const backgroundStyle = useBackgroundStyle(design.background)
const titleStyle = createTextStyle(design.title)
</script>

<style scoped lang="scss">
.my-section {
  padding: 60px 20px;
  
  &__title {
    margin: 0 0 24px;
    text-align: center;
  }
  
  &__image {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    display: block;
  }
}
</style>
```

### 7. Create Entry Points

```typescript
// sections/my-section/client.ts
import { createVueClientApp } from '@lightspeed/crane'
import { Content, Design } from './type'
import MySection from './MySection.vue'

export default createVueClientApp<Content, Design>(MySection)
```

```typescript
// sections/my-section/server.ts
import { createVueServerApp } from '@lightspeed/crane'
import { Content, Design } from './type'
import MySection from './MySection.vue'

export default createVueServerApp<Content, Design>(MySection)
```

### 8. Add a Showcase

```typescript
// sections/my-section/showcases/1.ts
export default {
  content: {
    title: 'Welcome to Our Store',
    image: {
      set: {
        ORIGINAL: { url: 'showcase-image.jpg' },
      },
    },
  },
  design: {
    title: {
      font: 'inter',
      size: 40,
      bold: true,
      color: '#1E1E21',
    },
    background: {
      color: '#F5F5F5',
    },
  },
}
```

## Shared Code

### Components

Import from `shared/components`:

| Component | Description |
|-----------|-------------|
| `Button` | Universal button with Crane design integration |
| `Badge` | Label with automatic contrast color |
| `Skeleton` | Loading placeholder with animations |
| `SectionWrapper` | Consistent section container with background |
| `SectionHeader` | Section title and description |
| `EmptyState` | Empty list state |
| `ErrorState` | Error display |
| `NavigationButtons` | Prev/Next carousel controls |

```vue
<script setup>
import { Button, SectionWrapper, Skeleton } from '@shared/components'
</script>
```

### Composables

Import from `shared/composables`:

**Data Fetching:**
- `useProducts(filter, limit)` — Load products from Ecwid API
- `useCategories()` — Load store categories

**Crane Integration:**
- `useTranslations()` — Multi-language support
- `useContentMapping()` — Map deck cards to typed content
- `usePreviewMode()` — Detect Crane preview mode

**Design:**
- `useBackgroundStyle(design)` — Generate background CSS from Crane design
- `useButtonStyles(design)` — Generate button styles

**UI:**
- `useCarousel()` — Carousel with keyboard navigation
- `useClickOutside(ref, callback)` — Detect clicks outside element
- `useEscapeKey(callback)` — Handle Escape key press

### Utilities

Import from `shared/utils`:

- `getColorHex(color, fallback)` — Safe color extraction
- `getContrastColor(hex)` — WCAG-compliant contrast color
- `createTextStyle(design)` — Generate text CSS from Crane design
- `isValidImageUrl(url)` — Validate image URLs

## Deployment

```bash
# Build and deploy to Crane
npm run deploy
```

Make sure `crane.config.json` contains valid credentials:

```json
{
  "app_client_id": "your-app-id",
  "app_secret_key": "your-secret-key"
}
```

## Good Examples to Study

| Path | What to Learn |
|------|---------------|
| `sections/featured-products/` | Loading states, error handling, API integration |
| `sections/hero-banner/` | Simple section with background and CTA |
| `headers/store-header/` | Complex component with mega menu |
| `shared/composables/data/use-products.ts` | Typed API fetching |
| `shared/components/Button.vue` | Crane design integration |

## Documentation

- [Crane NPM](https://www.npmjs.com/package/@lightspeed/crane)
- [Crane Developer Documentation](https://docs.ecwid.com/site-themes/develop-site-themes/deep-dive-into-theme-project-structure)
- [Ecwid API Documentation](https://api-docs.ecwid.com/)
- [Vue 3 Documentation](https://vuejs.org/)

## License

[MIT](LICENSE)


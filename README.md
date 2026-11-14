# DreamPack - B2B Packaging Catalogue

A modern e-commerce catalogue for DreamPack Smart Solutions, a B2B packaging supplier offering paper bags, gift boxes, food containers, custom labels, and printing services.

Live site: [dreampack.vercel.app](https://dreampack.vercel.app)

Business buyers browse the catalogue, add items to a cart, and send a quote request instead of paying online. The owner manages products, categories, pages and images through a custom admin panel.

## Screenshots

| Homepage | Cart to quote flow |
|---|---|
| ![Homepage](docs/screenshots/homepage.png) | ![Cart drawer with Request Quote and WhatsApp options](docs/screenshots/cart-quote-drawer.png) |

| Quote request form |
|---|
| ![Quote request page listing cart items and contact fields](docs/screenshots/quote-request.png) |

<!-- TODO: add an admin dashboard screenshot (requires a signed-in session) -->

## How the quote flow works

1. The cart lives in React context on the client (`src/lib/cart`).
2. "Request Quote" takes the buyer to `/quote`, where the cart items are listed next to a contact form.
3. Submitting posts to `POST /api/quote`, which validates the payload and inserts a row into the `quotes` table (items stored as JSON, status `pending`).
4. Quotes are stored in Postgres. There is no admin screen for them yet; the owner reads them from the database (an admin quotes view is the obvious next feature).
5. As a second channel, every product page and the cart drawer also build a pre-filled WhatsApp link (`src/lib/whatsapp.ts`) for buyers who would rather message than fill a form.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL (Neon) with Drizzle ORM
- **CMS**: Custom Admin Dashboard
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Image Storage**: Vercel Blob
- **Analytics**: Vercel Analytics
- **Language**: TypeScript

## Features

### Frontend
- Responsive product catalogue with category browsing
- Product search with category filters
- Individual product pages with image galleries
- Shopping cart with quote request flow
- Contact page with business info
- Mobile-friendly navigation with hover dropdowns

### Admin Panel
- Full CRUD for products and categories
- CMS for About page and Contact page content
- Site settings management (contact info, business hours, social links)
- Media management with Vercel Blob uploads
- User authentication with secure sessions

### Performance
- Server-side rendering for SEO
- Optimized images with Next.js Image component
- Static generation where applicable

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon account)
- Vercel account (for Blob storage)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AH316/dreampack.git
cd dreampack
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
DATABASE_URL=postgresql://user:password@host:5432/dreampack
AUTH_SECRET=your-secret-key
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
```

4. Push database schema:
```bash
npm run db:push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) for the frontend
7. Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel

## Project Structure

```
src/
├── app/
│   ├── (frontend)/     # Public-facing pages
│   │   ├── page.tsx           # Homepage
│   │   ├── products/          # All products listing
│   │   ├── category/[slug]/   # Category pages
│   │   ├── product/[slug]/    # Product detail pages
│   │   ├── search/            # Search functionality
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   └── quote/             # Quote request page
│   ├── admin/          # Admin panel routes
│   │   ├── (auth)/            # Login page
│   │   └── (dashboard)/       # Protected admin pages
│   └── api/            # API routes
├── components/         # React components
│   ├── admin/         # Admin-specific components
│   ├── cart/          # Shopping cart components
│   ├── layout/        # Header, Footer, Navigation
│   ├── product/       # Product cards, grids
│   └── ui/            # Shared UI components
├── db/                # Database
│   ├── index.ts       # Drizzle client
│   ├── schema.ts      # Database schema
│   └── migrations/    # SQL migrations
└── lib/               # Utility functions
    ├── settings.ts    # Site settings helper
    └── cart/          # Cart context and types
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Secret key for NextAuth.js |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token |

## License

Private - All rights reserved.

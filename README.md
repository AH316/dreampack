# DreamPack - B2B Packaging Catalogue

A modern e-commerce catalogue for DreamPack Smart Solutions, a B2B packaging supplier offering paper bags, gift boxes, food containers, custom labels, and printing services.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3.0
- **Database**: PostgreSQL (Neon)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Image Optimization**: Sharp

## Features

### Frontend
- Responsive product catalogue with category browsing
- Product search with category filters
- Individual product pages with image galleries
- Contact page with inquiry form
- Mobile-friendly navigation

### Admin Panel
- Full CRUD for products, categories, and subcategories
- Media management with automatic image optimization
- User authentication with role-based access
- Rich text editor for product descriptions

### Performance
- Server-side rendering for SEO
- Optimized images with multiple sizes (300x300, 600x600, 1200x600)
- Static generation where applicable

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon account)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/dreampack.git
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

Edit `.env` with your database credentials:
```
DATABASE_URI=postgresql://user:password@host:5432/dreampack
PAYLOAD_SECRET=your-secret-key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) for the frontend
6. Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel

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
│   │   └── contact/           # Contact page
│   ├── (payload)/      # Admin panel routes
│   └── api/            # API routes
├── collections/        # Payload CMS collections
│   ├── Products.ts
│   ├── Categories.ts
│   ├── Subcategories.ts
│   ├── Media.ts
│   └── Users.ts
├── components/         # React components
│   └── layout/        # Header, Footer, Navigation
├── globals/           # Payload global configs
└── lib/               # Utility functions
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run generate:types` | Generate Payload types |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URI` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Secret key for Payload CMS |
| `NEXT_PUBLIC_SERVER_URL` | Public URL (optional) |

## License

Private - All rights reserved.

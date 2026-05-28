# SKU Generation Web App

A modern web application for generating human-readable SKUs and EAN-13 barcodes for products. Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma ORM, and Supabase.

## ✨ Features

- **Human-Readable SKU Generation**: Creates formatted SKUs like `DLT-BLK-16G-0001` from product names and attributes
- **EAN-13 Barcode Generation**: Generates 13-digit numeric EAN codes with proper checksum validation
- **Database Persistence**: Products stored securely in Supabase via Prisma ORM
- **Stable Identifiers**: EAN-13 codes remain constant even if product details change
- **Modern UI**: Clean interface built with shadcn/ui components
- **Form Validation**: React Hook Form + Zod for robust input validation
- **Real-time Updates**: Products appear instantly in the table after creation
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **ORM**: Prisma ORM
- **Database**: Supabase (PostgreSQL)
- **Form Handling**: React Hook Form + Zod
- **Notifications**: Sonner toast notifications
- **Package Manager**: pnpm

## 📁 Project Structure

```
skugen/
├── app/
│   ├── layout.tsx          # Root layout with navbar
│   ├── page.tsx            # Landing page
│   └── products/
│       ├── page.tsx        # Products dashboard
│       ├── actions.ts      # Server actions
│       └── api/
│           └── route.ts    # API routes
├── components/
│   ├── navbar.tsx          # Navigation bar
│   ├── product/
│   │   ├── form.tsx        # Product creation form
│   │   └── table.tsx       # Products table
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── prisma.ts           # Prisma client configuration
│   └── sku/
│       └── utils.ts        # SKU and EAN-13 generation logic
├── prisma/
│   └── schema.prisma       # Database schema
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm package manager
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skugen
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your_supabase_anon_key"
   SUPABASE_PASSWORD="your_database_password"
   DATABASE_URL="postgresql://postgres.[project-id]:[password]@[host]:5432/postgres"
   DIRECT_URL="postgresql://postgres.[project-id]:[password]@[host]:5432/postgres"
   ```

4. **Generate Prisma client**
   ```bash
   pnpm prisma generate
   ```

5. **Run database migrations**
   ```bash
   pnpm prisma migrate dev --name init
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

7. **Open your browser**
   Visit http://localhost:3000 to use the application

## 🔧 How It Works

### SKU Generation

The SKU is generated using this format: `[NAME_ABBR]-[ATTR1_ABBR]-[ATTR2_ABBR]-[SEQUENCE]`

- **Name Abbreviation**: Takes characters at positions 0, 3, 6 from the product name (e.g., "Dell Latitude" → "DLT")
- **Attribute Abbreviation**: 
  - For strings ≤3 chars: padded with 'X' (e.g., "16" → "16X")
  - For alphanumeric strings (like "16GB"): takes first 3 chars (e.g., "16GB" → "16G")
  - For letter-only strings (like "Black"): takes first, second, and last chars (e.g., "Black" → "BLK")
- **Sequence**: Auto-incrementing number padded to 4 digits (e.g., 1 → "0001")

### EAN-13 Generation

The EAN-13 is generated using this format: `615110[SEQUENCE(6)][CHECKSUM]`

- **Fixed Prefix**: `615` (GS1 prefix) + `110` (category) = `615110`
- **Sequence**: 6-digit zero-padded auto-incrementing number
- **Checksum**: Calculated using the official EAN-13 algorithm
- **Stability**: Based solely on sequence number, so EAN remains constant even if product details change

## 📝 Usage

1. Navigate to the Products page (`/products`)
2. Click the "Add Product" button
3. Fill in the product details:
   - Product Name (e.g., "Dell Latitude")
   - Attribute 1 (e.g., "Black")
   - Attribute 2 (e.g., "16GB")
   - Attribute 3 (e.g., "512GB")
4. Submit the form
5. View your product with generated SKU and EAN-13 in the table below
6. Use the delete button to remove products (with confirmation)

## 💡 Example

**Input:**
- Name: Dell Latitude
- Attribute 1: Black
- Attribute 2: 16GB
- Attribute 3: 512GB

**Output:**
- SKU: `DLT-BLK-16G-0001`
- EAN-13: `6151100000015`

## 🔒 Security

- Server actions handle database operations securely
- Environment variables protect Supabase credentials
- Input validation prevents malicious data
- RLS policies recommended for production deployment

## 📱 Responsive Design

The application works seamlessly across devices:
- Mobile: Full-width forms and tables
- Tablet: Optimized spacing and layout
- Desktop: Centered content with appropriate max-width

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for styling
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [Prisma](https://prisma.io) for ORM
- [Supabase](https://supabase.com) for backend services
- [Lucide](https://lucide.dev) for icons
- [Sonner](https://sonner.emilkowal.ski) for toast notifications
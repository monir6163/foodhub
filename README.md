# 🍕 FoodHub - Multi-Vendor Food Delivery Platform

A modern, full-stack food delivery application built with Next.js 15, TypeScript, and Prisma. FoodHub connects customers with multiple food providers, offering a seamless ordering experience with real-time order tracking and comprehensive admin controls.

# Credentials for Testing

- **Admin**
  - Email:admin@gmail.com
  - Password:admin@123

- **Provider**
  - Email:provider@gmail.com
  - Password:provider@com

- **Customer**
  - Email:customer@gmail.com
  - Password:customer@com

# Live Demo

- **Frontend:** [https://food-hub-client-eta.vercel.app](https://food-hub-client-eta.vercel.app)
- **Backend API:** [https://assaignment-4-server.vercel.app](https://assaignment-4-server.vercel.app)

## 🌟 Features

### For Customers

- 🔍 **Browse & Search** - Discover meals from multiple providers with advanced filtering
- 🛒 **Cart Management** - Add items, adjust quantities, and place orders
- 📦 **Order Tracking** - Real-time order status updates (Pending → Accepted → Cooking → On the Way → Delivered)
- ⭐ **Reviews & Ratings** - Rate and review meals after delivery
- 👤 **Profile Management** - Manage personal information and preferences
- 📱 **Responsive Design** - Seamless experience across all devices

### For Providers

- 🏪 **Shop Management** - Create and customize your food business profile
- 🍽️ **Meal Management** - Add, edit, and manage your meal offerings
- 📊 **Dashboard Analytics** - Track orders, revenue, and performance metrics
- 📋 **Order Management** - Accept, update, and fulfill customer orders
- ⭐ **Review Monitoring** - View customer feedback and ratings
- 💰 **Revenue Tracking** - Monitor earnings and order history

### For Admins

- 👥 **User Management** - Manage customers, providers, and admin accounts
- 📦 **Order Oversight** - Monitor all platform orders
- 🏷️ **Category Management** - Create and manage meal categories
- 📊 **Platform Analytics** - Comprehensive dashboard with key metrics
- 🔒 **Access Control** - Manage user roles and permissions

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, shadcn/ui
- **State Management:** Zustand
- **Authentication:** Better Auth
- **Forms:** TanStack Form, Zod validation
- **Charts:** Recharts
- **Icons:** Lucide React

### Backend

- **Runtime:** Node.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **API:** REST API
- **Authentication:** Better Auth with JWT

## 📁 Project Structure

```
food-hub-client/
├── app/                          # Next.js app directory
│   ├── (commonLayout)/          # Public pages layout
│   │   ├── page.tsx            # Home page
│   │   ├── meals/              # Meals listing & details
│   │   ├── providers/          # Provider listings
│   │   ├── cart/               # Shopping cart
│   │   └── checkout/           # Checkout process
│   ├── (dashboardLayout)/       # Dashboard layout
│   │   ├── @admin/             # Admin dashboard
│   │   ├── @customer/          # Customer dashboard
│   │   └── @provider/          # Provider dashboard
│   └── api/                     # API routes
├── components/
│   ├── layout/                  # Layout components
│   ├── modules/                 # Feature-specific components
│   └── ui/                      # Reusable UI components
├── actions/                     # Server actions
├── services/                    # API service layer
├── store/                       # Zustand stores
├── types/                       # TypeScript types
└── lib/                         # Utilities & helpers

assaignment-4-server/
├── src/
│   ├── app/
│   │   ├── modules/            # Feature modules
│   │   │   ├── auth/
│   │   │   ├── meal/
│   │   │   ├── order/
│   │   │   ├── provider/
│   │   │   ├── review/
│   │   │   └── user/
│   │   ├── middleware/         # Express middleware
│   │   └── routes/             # API routes
│   ├── helper/                 # Helper functions
│   ├── shared/                 # Shared utilities
│   └── types/                  # TypeScript types
└── prisma/
    └── schema/                 # Prisma schema files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm/yarn/pnpm

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd level-2-assignment
```

2. **Setup Backend**

```bash
cd assaignment-4-server
npm install

# Create .env file
cp .env.example .env
# Add your database URL and other environment variables

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npm run seed

# Start server
npm run dev
```

3. **Setup Frontend**

```bash
cd ../food-hub-client
npm install

# Create .env.local file
cp .env.example .env.local
# Add your API URL and other environment variables

# Start development server
npm run dev
```

4. **Open your browser**

```
Frontend: http://localhost:3000
Backend API: http://localhost:8080
```

## 🔐 Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

## 📝 Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎨 Key Features Implementation

### Authentication & Authorization

- Multi-role authentication (Customer, Provider, Admin)
- Protected routes with middleware
- Session management with Better Auth

### Real-time Order Tracking

- Order status updates: PENDING → ACCEPTED → COOKING → ON_THE_WAY → DELIVERED
- Customer and provider order dashboards
- Order cancellation (before acceptance)

### Advanced Filtering & Search

- Filter meals by category, cuisine, dietary preferences, spice level
- Price range filtering
- Sort by price, rating, date
- Real-time search with debouncing

### Reviews & Ratings

- One review per user per meal
- Star ratings (1-5)
- Review moderation
- Average rating calculation

## 🌐 Deployment

### Frontend (Vercel)

```bash
vercel --prod
```

### Backend (Vercel)

```bash
cd assaignment-4-server
vercel --prod
```

## 🔒 User Roles & Permissions

| Feature             | Customer | Provider   | Admin |
| ------------------- | -------- | ---------- | ----- |
| Browse Meals        | ✅       | ✅         | ✅    |
| Place Orders        | ✅       | ❌         | ❌    |
| Manage Shop         | ❌       | ✅         | ❌    |
| Manage Meals        | ❌       | ✅         | ❌    |
| Accept Orders       | ❌       | ✅         | ❌    |
| View All Orders     | ❌       | Own Orders | ✅    |
| User Management     | ❌       | ❌         | ✅    |
| Category Management | ❌       | ❌         | ✅    |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Developed with ❤️ by [Monir Hossain].

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible components
- shadcn/ui for beautiful UI components
- Prisma for the excellent ORM

---

**Note:** This is a portfolio/assignment project demonstrating full-stack development capabilities.

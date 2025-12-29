# StyleStore - Mini E-Commerce Platform
### Future Interns Full Stack Web Development Task 2

A fully functional, responsive, and modern e-commerce web application built with **Next.js 15 (App Router)**, **Tailwind CSS**, **Zustand**, and **Supabase**. This project demonstrates a complete full-stack shopping experience, from product browsing to secure checkout.

![Project Preview](https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800)

## 🚀 Features

### Core Interface
*   **Modern UI/UX**: Premium aesthetic with a responsive design, smooth animations, and glassmorphism effects.
*   **Product Catalog**: Fetches real-time data from [FakeStoreAPI](https://fakestoreapi.com/).
*   **Search & Filter**: Real-time product filtering by category and keyword search.
*   **Product Details**: comprehensive product pages with ratings and descriptions.

### Shopping Experience
*   **Persistent Cart**: Shopping cart state is preserved across page reloads (using Zustand persistence).
*   **Cart Sidebar**: Slick slide-out drawer for managing cart items.
*   **Dynamic Checkout**: Real-time calculation of Subtotal, Tax, and Grand Total.

### Backend & Security (Bonus)
*   **Authentication**: Secure User Login and Registration using **Supabase Auth**.
*   **Protected Routes**: Checkout flow requires user authentication.
*   **Order Persistence**: Completed orders are saved to a **PostgreSQL** database (Supabase).

## 🛠️ Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Styling**: Tailwind CSS v4, Lucide React Icons
*   **State Management**: Zustand
*   **Validation**: React Hook Form + Zod
*   **Backend/Auth**: Supabase (PostgreSQL + Auth)
*   **Language**: TypeScript

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/stylestore.git
cd stylestore
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup (Supabase)
Run the following SQL in your Supabase SQL Editor to create the necessary table:

```sql
create table orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) not null,
  total_amount numeric not null,
  status text not null,
  shipping_address jsonb,
  items jsonb
);

alter table orders enable row level security;

create policy "Users can create their own orders"
  on orders for insert with check (auth.uid() = user_id);

create policy "Users can view their own orders"
  on orders for select using (auth.uid() = user_id);
```

### 5. Run the Application
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router Pages
│   ├── checkout/         # Protected Checkout Page
│   ├── login/            # Auth Pages
│   ├── product/[id]/     # Dynamic Product Details
│   └── page.tsx          # Homepage + Hero
├── components/
│   ├── cart/             # Cart Sidebar & Logic
│   ├── checkout/         # Payment Forms
│   ├── products/         # Product Grid & Cards
│   ├── shared/           # Navbar & Footer
│   └── ui/               # Reusable UI Atoms (Buttons, Inputs)
├── lib/
│   ├── store.ts          # Zustand Global Store
│   ├── supabase/         # Auth Clients
│   └── api.ts            # FakeStoreAPI Fetchers
```

## 🚢 Deployment

This project is optimized for deployment on **Vercel**.

1.  Push your code to GitHub.
2.  Import the project into Vercel.
3.  Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel's Environment Variables.
4.  Deploy!

---

**Developed for Future Interns Task 2**

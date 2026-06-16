# Velora Supply Co. — Website

A complete React + Vite + Tailwind website for Velora Supply Co., a B2B distributor for tissue, disposable, and housekeeping brands.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

---

## 🔐 Admin Login

The login is restricted to one admin account:

| Field    | Value                        |
|----------|------------------------------|
| Email    | `taniyaaa0505@gmail.com`     |
| Password | `admin@velora2024`           |

Click **Login** in the top navbar → enter credentials → you'll be redirected to the Admin Dashboard.

> ⚠️ To change the password, open `src/context/AuthContext.jsx` and update `ADMIN_PASSWORD`.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Top navigation with login
│   ├── Footer.jsx         # Footer with links & contact
│   ├── LoginModal.jsx     # Admin login modal
│   └── BrandCard.jsx      # Product brand cards
├── context/
│   ├── AuthContext.jsx    # Login/logout state
│   └── InquiryContext.jsx # Stores customer inquiries (localStorage)
├── data/
│   └── products.js        # All brand & product data
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Products.jsx       # Products with filter & search
│   ├── Contact.jsx        # Inquiry form
│   └── AdminDashboard.jsx # Admin view of all inquiries
├── App.jsx                # Routes
├── main.jsx               # Entry point
└── index.css              # Tailwind + global styles
```

---

## 🏷️ Brands Included

| Brand    | Category     |
|----------|-------------|
| Passeo   | Tissue       |
| Origami  | Tissue       |
| Kressa   | Tissue       |
| Premier  | Tissue       |
| Opik     | Disposables  |
| Milton   | Housekeeping |

---

## ✏️ Customising

- **Brand name / tagline**: Edit `src/data/products.js`
- **Add products**: Add to the `products` array inside each brand in `products.js`
- **Colors**: Edit `tailwind.config.js` → `theme.extend.colors`
- **Fonts**: Change the Google Fonts import in `index.html` and update `tailwind.config.js`
- **Company info** (email, phone, address): Edit `src/components/Footer.jsx` and `src/pages/Contact.jsx`
- **Logo/brand name**: Search for "Velora" across files and replace as needed

---

## 📊 Admin Dashboard Features

- View all customer inquiry submissions
- Filter by status, brand, or search by name/email
- Update inquiry status: New → Reviewed → Contacted → Closed
- Delete inquiries
- Export all inquiries to CSV

All data is stored in `localStorage` — no backend required.

---

## 📦 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Styling
- **React Router 6** — Routing
- **Lucide React** — Icons
- **Google Fonts** — Cormorant Garamond + DM Sans

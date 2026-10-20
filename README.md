# 🛒 E-Commerce Website

A modern and responsive **E-Commerce Website** built using **React**, **JavaScript**, **HTML**, and **Tailwind CSS**.

Users can browse products, search and filter them, view product details, add products to a cart, place orders using **Cash on Delivery**, and view their orders. Authentication is handled by **Clerk**, and product data is fetched from the **Fake Store API**.

---

## 🚀 Features

* 🔐 User authentication using Clerk (register, login, logout)
* 🏠 Home page
* 🛍️ View all products
* 🔍 Search products
* 🏷️ Filter products by category
* 🏷️ Filter products by brand
* 💰 Filter products by price range
* 📄 Product pagination
* 📂 View products by category
* 👀 View product details
* 🛒 Add products to the cart
* ➕ Increase and ➖ decrease product quantity
* 🗑️ Delete products from the cart
* 📦 Place orders with 💵 **Cash on Delivery**
* 📋 View orders and their status
* 📍 Automatic location detection
* ℹ️ About page and 📞 Contact page
* 📱 Fully responsive design

---

## 🛠️ Built With

* HTML5
* Tailwind CSS
* JavaScript (ES6)
* React
* React Router
* React Context API
* Axios
* Clerk (authentication)
* Fake Store API

---

## 📂 Pages

```text
🏠 Home
🛍️ Products
👀 Product Details
📂 Category Products
🛒 Cart
📋 Orders
ℹ️ About
📞 Contact
🔐 Login / Authentication
```

---

## ⚙️ How It Works

1. **Login:** The user logs in with Clerk authentication.
2. **Browse products:** The app fetches products from the Fake Store API and displays them.
3. **Search and filter:** The user searches products and filters them by category, brand, and price range.
4. **View details:** The user opens a product to see its full information.
5. **Add to cart:** The user adds products, increases or decreases quantity, or deletes items. The total price is shown in the cart.
6. **Place order:** The user places the order using **Cash on Delivery**. The location detection feature can help fill in delivery details.
7. **View orders:** The user opens the Orders page to see placed orders. The initial status is **Order Placed**.

---

## 🔑 API

This project uses the **Fake Store API** to fetch product information.

```text
https://fakestoreapi.com/products
```

The API provides:

* Product name
* Price
* Description
* Category
* Image
* Rating and review count

---

## 🔐 Authentication

Authentication is implemented with **Clerk**. Users can:

* Register
* Login
* Logout
* Access authenticated features

---

## ▶️ Run Locally

```bash
# clone the repository
git clone https://github.com/kawsar-ahmed-rahim/zaptro.git

# go to the project folder
cd zaptro

# install dependencies
npm install

# start the development server
npm run dev
```

Create a `.env` file and add your Clerk publishable key:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

## 📚 What I Learned

* React components and Hooks
* State management with the Context API
* API integration with Axios
* Searching, filtering, and pagination
* Cart and quantity management
* Order management
* Authentication with Clerk
* Routing with React Router
* Responsive design with Tailwind CSS

---

## 🔮 Future Improvements

* 💳 Online payment integration
* ❤️ Wishlist
* ❌ Cancel orders
* ⭐ Product reviews from users
* 🗄️ Backend and database for storing orders
* 🌙 Dark mode

---

## 🔗 Live Demo

👉 **Live Website:** **https://rahimxyz.vercel.app/**

👉 **GitHub Repository:** **https://github.com/kawsar-ahmed-rahim/zaptro**

---

## 👨‍💻 Author

**Rahim**

If you found this project helpful or interesting, feel free to ⭐ the repository and share your feedback. Contributions, suggestions, and improvements are always welcome!

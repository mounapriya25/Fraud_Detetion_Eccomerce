# Real-Time Fraud Detection E-Commerce App

**Tech Stack:** React | Tailwind CSS | Node.js | AWS Lambda | DynamoDB | Sagemaker

---

## Overview
This is a full-stack e-commerce application with **real-time fraud detection**.  
Users can register, login, browse products, add items to the cart, and view dashboards showing transaction metrics and fraud alerts.  
The backend is **serverless**, using AWS Lambda functions and DynamoDB for scalability.

---

## Features
- **User Authentication:** Sign up and login.
- **Fraud Detection:** Real-time ML-based detection for transactions.
- **Dashboard:** Dynamic metrics and charts (total transactions, fraud, amounts).
- **Shop & Cart:** Browse products, filter, search, add to cart, view/edit cart items, and checkout.
- **Transaction Prediction:** Predicts if a transaction is safe or fraudulent.
- **Dark/Light Mode:** Toggle seamlessly with Tailwind CSS.
- **Serverless Backend:** Lambda functions handle business logic; DynamoDB stores data.

---



## Usage
1. Open the app → landing page.
2. Sign up → register with personal info.
3. Login → access dashboard.
4. View metrics, fraud alerts, and charts on the dashboard.
5. Shop → browse, search, filter products, and add to cart.
6. Click on Cart → view cart items, edit quantities, or remove items.
7. Fill in user details in the checkout section.
8. Click Check Transaction → the system predicts whether the transaction is safe or fraudulent.
9. Toggle dark/light mode.
   . Logout to end session.

---

## Architecture
```text
React Frontend
       |
       v
 Node.js Backend (API: Login, Signup, Shop, Cart, Checkout)
       |
 AWS Lambda Functions (Business Logic & Fraud Detection)
       |
   DynamoDB Tables (User, Transactions, Products)
       |
 Transaction Prediction Engine
       |
 Lambda returns prediction to Node.js
       |
 React displays result to user (Safe or Fraudulent)

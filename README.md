# 🏠 MERN Real Estate App

A full-stack real estate application built with the MERN stack, enabling users to browse, list, and manage properties for sale or rent.

---

## 🔗 🚀 [**Live Demo**](https://mern-estate-3-wgzw.onrender.com/)  

> Click the link above to explore the full app in action.

---

## 🔧 Tech Stack

- **Frontend**: React.js + Redux + Tailwind CSS  
- **Backend**: Express.js + MongoDB (via Mongoose)  
- **Authentication**: Firebase (Email/Password + Google Sign-In)  
- **Media/UX**: Swiper.js (for responsive image sliders)

---

## ✨ Features

### 🏠 Property Listings

- Add, edit, delete listings (only accessible to the listing owner)  
- Upload property images, define pricing, amenities, type, and description  
- Listing types include **For Sale**, **For Rent**, or **Both**

### 🔍 Advanced Filtering & Sorting

- Filter listings by:  
  - Type: Sale / Rent  
  - Offer availability  
  - Parking availability  
  - Furnished status  
- Sort listings by:  
  - Price (low to high / high to low)  
  - Date (latest / oldest)

### 📱 Responsive UI

- Fully mobile-first responsive design using **Tailwind CSS**  
- Modern and clean user interface with dynamic transitions

### 🔁 Pagination

- “Show More” feature implemented using a **`startIndex`** parameter for lazy loading / paginated results

### 🔐 Authentication

- Firebase Auth with secure sign-up/login  
- Google OAuth integrated  
- Protected routes for listing creation and user-specific actions

### 📦 State Management

- **Redux Toolkit** for managing:  
  - User authentication state  
  - Listings and filters  
  - Loading and error states

### 🖼️ Swiper Integration

- Beautiful image sliders for property previews using **Swiper.js**  
- Touch-enabled, mobile-optimized carousel


## 🚀 Deployment

- **Project**: Hosted on [Render](https://render.com)  
- **Authentication**: Firebase with Google OAuth integration
  
---

## 📷 Screenshots
<img width="2782" height="1461" alt="Screenshot 2025-07-14 195550" src="https://github.com/user-attachments/assets/414157e5-a136-42e2-9b91-b29fcc054a84" />
<img width="2740" height="1454" alt="image" src="https://github.com/user-attachments/assets/370d9379-cb5f-426a-ba1f-d61c8191e3d9" />
<img width="2770" height="1439" alt="image" src="https://github.com/user-attachments/assets/1bfdfb6d-e766-4709-8ef6-d431d746842c" />



---

## 📁 Folder Structure

-client/ # Vite + React frontend , 
-api/ # Express.js backend with MongoDB


---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

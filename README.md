# Maandeeq Coffee Management System

A modern frontend dashboard for managing a coffee shop. The system gives an admin a clean workspace to manage menu items, orders, staff, roles, users, and profile access from one React application.

## Overview

Maandeeq Coffee Management System is built as a frontend-only admin panel. It uses local React state and fake login data, so it can be tested without a backend server or database.

The interface uses a coffee-inspired color palette, a modern sidebar layout, responsive navigation, polished tables, modals, and a simple profile dropdown.

## Features

- Dashboard home screen with coffee visuals
- Sidebar navigation for all main modules
- Responsive mobile navigation
- Items management with add, edit, and delete actions
- Orders management with status badges
- Staff management with add, edit, and delete confirmation
- Roles list
- Users management with staff-name dropdown
- Fake login flow for testing
- Profile dropdown with avatar, profile link, and logout
- Profile page showing logged-in user details
- Tailwind CSS loaded through CDN

## Tech Stack

- React 19
- Vite 6
- React Router DOM
- React Icons
- Tailwind CSS CDN
- ESLint
- JavaScript JSX

## Project Structure

```text
coffee-shop/
  public/
  src/
    assets/
    Components/
      Header.jsx
      Sidebar.jsx
    Pages/
      Home.jsx
      Items.jsx
      Orders.jsx
      Staff.jsx
      Roles.jsx
      Users.jsx
      Login.jsx
      Profile.jsx
    App.jsx
    main.jsx
  index.html
  package.json
  vite.config.js
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Login

This project does not use a backend yet. You can log in with any username and password. The app stores a fake user in `localStorage` so you can test the dashboard, profile page, and logout flow.

## Notes

- `node_modules`, `dist`, environment files, cache folders, and editor files are ignored by Git.
- Tailwind is currently included using the CDN in `index.html`.
- Data is currently stored in component state, so records reset when the page refreshes.

## Repository

GitHub: https://github.com/MohamedMokhtaar/coffe-shop-frontend

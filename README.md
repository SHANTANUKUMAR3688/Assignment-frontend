# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

#  Hacker News Dashboard (React)

A responsive Hacker News dashboard built with **React**, **Axios**, and **Tailwind CSS**.
This application allows users to browse different types of stories from the Hacker News API, view story details, and navigate with pagination.

##  Features

*  View different story categories:

  * Top Stories
  * New Stories
  * Best Stories
  * Ask Stories
  * Show Stories
  * Job Stories

*  Click on any story ID to view:

  * Title
  * Type
  * Author
  * External link (if available)

*  Pagination (15 stories per page)
*  Loading indicator while fetching data
*  Clean UI using Tailwind CSS

##  Tech Stack

* **React**
* **Axios**
* **Tailwind CSS**
* **React Icons**
* **Hacker News Firebase API**

API Used:

```
https://hacker-news.firebaseio.com/v0/
```

---

## Application Layout

* Sidebar for selecting story types
* Top navigation bar
* Two-column layout:

  * Left → Story ID list with pagination
  * Right → Selected story details

## Installation & Setup

Follow these steps to run the project locally.

### Clone the repository

```bash
git clone https://github.com/your-username/hacker-news-dashboard.git
```

### Navigate to project folder

```bash
cd hacker-news-dashboard
```

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

OR (if using Create React App):

```bash
npm start
```

##  How It Works

1. User selects a story type from the sidebar.
2. App fetches story IDs from Hacker News API.
3. IDs are paginated (15 per page).
4. User clicks a story ID.
5. App fetches full story details.
6. Details appear in the right column.

## State Management Used

* `data` → Stores story IDs
* `selectedStory` → Stores selected story details
* `storyType` → Selected story category
* `loading` → Loading indicator
* `currentPage` → Pagination state

##  Live Demo

deployed link here : https://assignment-gold-ten.vercel.app/

##  Project Structure

src/
 ├── components/
 │     └── Navbar.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css

##  Acknowledgements

* Hacker News API
* React Documentation
* Tailwind CSS


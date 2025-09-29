# Store Rating System

```markdown
# Store Rating System - Frontend

## Project Overview
This is the frontend for the Store Rating System, a responsive React-based web application that allows users to rate stores with role-based access. Users can sign up, log in, view stores, submit ratings, and access role-specific dashboards. The UI is built with Tailwind CSS for a modern, mobile-friendly experience.

## Technologies Used
- **Framework**: React.js (v18+)
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router for navigation
- **State Management**: Redux Toolkit (for global state like auth)
- **HTTP Client**: Axios for API requests
- **Icons**: Lucide React for UI icons
- **Build Tool**: Create React App (CRA) with custom configurations
- **Authentication**: JWT token handling in localStorage

## Features Implemented

### System Administrator Functionalities
- **Dashboard**: Displays total users, stores, and ratings with real-time data from API.
- **User Management**: View and filter lists of users (Name, Email, Address, Role).
- **Store Management**: View and filter stores (Name, Email, Address, Rating).
- **User Details**: View detailed profiles, including store owner average ratings.
- **Sorting and Filtering**: Ascending/descending sort on Name, Email, Address, Role.

### Normal User Functionalities
- **Authentication**:
  - Sign up with Name, Email, Address, Password
  - Log in with Email and Password
  - Password update after login
- **Store Listings**:
  - View all stores with search by Name and Address
  - Display: Store Name, Address, Overall Rating, User's Rating, Submit/Update buttons
- **Rating System**:
  - Submit ratings (1-5) for stores
  - Update existing ratings
  - Dynamic button text ("Rate" vs "Update Rating")

### Store Owner Functionalities
- **Dashboard**: View list of users who rated their store and average rating.
- **Profile Management**: Update password.

### Form Validations
- **Client-Side Validation**: Matches backend requirements
  - Name: 20-60 characters
  - Email: Standard format
  - Password: 8-16 characters with uppercase and special character
  - Address: Max 400 characters
- **Error Handling**: Displays API errors (e.g., validation, server errors) with user-friendly messages.

### Additional Features
- **Responsive Design**: Works on desktop, tablet, and mobile.
- **Role-Based UI**: Different dashboards and menus based on user role.
- **Loading States**: Spinners and disabled buttons during API calls.
- **Logout**: Clears token and redirects to login.
- **Sorting**: Tables support sorting on key columns.

## Installation and Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/rahul-kumbhar0/Frontend-Store-Rating-App.git
   cd Frontend-Store-Rating-App
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a [.env](cci:7://file:///c:/Users/91950/OneDrive/Desktop/Store%20Rating%20Sysytem/backend/.env:0:0-0:0) file in the root:
   ```env
   REACT_APP_API_BASE=https://backend-stores-2dbn.onrender.com/api
   ```

4. **Run Locally**
   ```bash
   npm start  # Runs on http://localhost:3000
   ```

5. **Build for Production**
   ```bash
   npm run build  # Outputs to build/ folder
   ```

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── StoreRatingForm.jsx    # Rating submission form
│   ├── UserTable.jsx          # User listing with sorting
│   ├── StoreTable.jsx         # Store listing with sorting
│   └── ...                    # Other components (buttons, forms)
├── pages/               # Page components
│   ├── Login.jsx              # Login page
│   ├── Register.jsx           # Registration page
│   ├── UserDashboard.jsx      # Normal user dashboard
│   ├── AdminDashboard.jsx     # Admin dashboard
│   ├── StoreOwnerDashboard.jsx # Store owner dashboard
│   └── ...                    # Other pages
├── services/            # API and utility functions
│   ├── api.js                 # Axios instance and request helpers
│   └── auth.js                # Auth utilities (token handling)
├── context/             # Redux store and slices
│   ├── store.js               # Redux store setup
│   └── authSlice.js           # Auth state management
├── App.js               # Main app with routing
├── index.js             # Entry point
└── ...
```

## Deployment
- **Platform**: Vercel (https://vercel.com)
- **Live URL**: https://store-rating-app-pied.vercel.app
- **Build Settings**:
  - Framework: React
  - Build Command: `npm run build`
  - Output Directory: `build`
  - Environment Variables: `REACT_APP_API_BASE` set in Vercel dashboard

## API Integration
- **Base URL**: Configured via `REACT_APP_API_BASE` (points to Render backend).
- **Authentication**: JWT tokens stored in localStorage; included in Axios headers for protected routes.
- **Error Handling**: Axios interceptors catch errors (network, 401, 500) and display messages.
- **Real-Time Updates**: API calls refresh data in dashboards and listings.
- **CORS**: Handled via backend configuration.


## Testing
1. **Manual Testing**:
   - Register as different roles and test all features.
   - Submit ratings and verify in dashboards.
   - Check sorting, filtering, and responsiveness.

2. **User Flows**:
   - Normal User: Signup → Login → View Stores → Submit Rating → Update Profile
   - Admin: Login → Dashboard → Add Store/User → View Details
   - Store Owner: Login → Dashboard → View Ratings

3. **Browser Testing**:
   - Chrome, Firefox, Safari
   - Mobile (iOS/Android)


## Best Practices Followed
- **Component Reusability**: Shared components for tables, forms.
- **State Management**: Redux for complex state; local state for simple components.
- **Performance**: Optimized renders with React hooks.
- **Accessibility**: Semantic HTML, ARIA labels where needed.
- **SEO**: Basic meta tags (can be enhanced).

## Contributing
- Fork the repo, create a branch, submit a PR.
- Follow React best practices (hooks, functional components).
- Update this README for new features.

## License
ISC (as per package.json)

## Contact
- Developer: Rahul Kumbhar
- GitHub: https://github.com/rahul-kumbhar0/Frontend-Store-Rating-App
```

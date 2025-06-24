// // src/components/ProtectedRoute.js
// import { Navigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? children : <Navigate to="/" />;
// };  

// export default ProtectedRoute;

// src/RoutesComponent.js



// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import Login from './auth/Login';
// import UserList from './pages/UserList';
// import BlockUserList from './pages/BlockUserList';
// import ProtectedRoute from './components/ProtectedRoute';

// export default function RoutesComponent() {
//   return (
//     <Routes>
//       {/* ✅ Public Route */}
//       <Route path="/" element={<Login />} />

//       {/* ✅ Protected Routes */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <Dashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/dashboard/user"
//         element={
//           <ProtectedRoute>
//             <UserList />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/dashboard/block-user"
//         element={
//           <ProtectedRoute>
//             <BlockUserList />
//           </ProtectedRoute>
//         }
//       />

//       {/* Redirect unknown routes to / */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }


import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

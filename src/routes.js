// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Dashboard from './pages/Dashboard';
// import Login from './auth/login'
// import UserList from './pages/UserList'
// import BlockUserList from './pages/BlockUserList';
// // import ExerciseCreate from './pages/ExerciseCreate';

// export default function RoutesComponent() {
//   return (
//     <Routes>
//       <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/login" element={<Login />} />
//              <Route path="/dashboard/user" element={<UserList />} />
//              <Route path="/dashboard/block-user" element={<BlockUserList/>} />

//       {/* <Route path="/dashboard/exercise/create/new" element={<ExerciseCreate />} /> */}
//     </Routes>
//   );
// }

import { Routes, Route } from 'react-router-dom';
import Login from './auth/login';
import Dashboard from './pages/Dashboard';
import UserList from './pages/UserList';
import BlockUserList from './pages/BlockUserList';
import ProtectedRoute from './components/ProtectedRoute';

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/block-user"
        element={
          <ProtectedRoute>
            <BlockUserList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

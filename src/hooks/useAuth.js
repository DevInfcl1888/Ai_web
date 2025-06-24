// // src/hooks/useAuth.js
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthProvider';

// const useAuth = () => useContext(AuthContext);

// export default useAuth;

import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export default function useAuth() {
  return useContext(AuthContext);
}

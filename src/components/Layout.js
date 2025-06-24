import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [sidebarOpen] = useState(true); // no need to setSidebarOpen since it's always open

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: '240px', // fixed sidebar width
          backgroundColor: '#ffffff',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

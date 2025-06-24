import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import SidebarUserCard from './SidebarUserCard';

const menuItems = [
    { label: 'Dashboard', icon: '/dashboard.png', to: '/dashboard' },
  { label: 'User List', icon: '/user.png', to: '/dashboard/user' },
  { label: 'Block User', icon: '/student.png', to: '/dashboard/block-user' }
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: '#fff',
        height: '100vh',
        boxShadow: '2px 0 10px rgba(0,0,0,0.06)',
        overflowX: 'hidden',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      {/* Logo with Glow Effect */}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
        <img
          src="/Ailogo.png" // Change path if needed
          alt="Logo"
          style={{
            height: 50,
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 6px rgba(0, 123, 255, 0.6))'
          }}
        />
      </Box>

      {/* User Card */}
      <Box sx={{ px: 2, pt: 2 }}>
        <SidebarUserCard />
      </Box>

      {/* Menu Items */}
      <Box sx={{ width: '100%', mt: 2 }}>
        <List>
          {menuItems.map(({ label, icon, to }) => (
            <Tooltip key={label} title={label} placement="right">
              <ListItemButton
                component={NavLink}
                to={to}
                className={({ isActive }) => (isActive ? 'active' : '')}
                sx={{
                  justifyContent: 'initial',
                  px: 2.5,
                  py: 1.5,
                  color: '#000',
                  mx: 1,
                  mb: 1,
                  borderRadius: '12px',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#f5f6f8',
                  },
                  '&.active': {
                    backgroundColor: '#f5f6f8',
                    fontWeight: 'bold',
                    borderRadius: '12px',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: 2, justifyContent: 'center' }}>
                  <img src={icon} alt={label} width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary={label} sx={{ color: 'inherit' }} />
              </ListItemButton>
            </Tooltip>
          ))}

          {/* Logout Button */}
          <ListItemButton
            onClick={handleLogout}
            sx={{
              px: 2.5,
              py: 1.5,
              mx: 1,
              mt: 2,
              color: '#000',
              borderRadius: '12px',
              fontWeight: 500,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#f5f6f8',
                color: '#d32f2f',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: 2, justifyContent: 'center' }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: 'inherit' }} />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;

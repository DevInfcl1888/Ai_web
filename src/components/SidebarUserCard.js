import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const SidebarUserCard = () => {
  const [user, setUser] = useState({ name: '', phone: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        mx: 'auto',
        my: 2,
        borderRadius: 3,
        width: '115%',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 15px rgba(0, 123, 255, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 6px 25px rgba(0, 123, 255, 0.2)'
        }
      }}
    >
      <Avatar
        sx={{
          bgcolor: '#e0d7ff',
          width: 50,
          height: 50,
          mr: 1.5,
          boxShadow: '0 0 0 1px #ddd'
        }}
      >
        <PersonIcon sx={{ fontSize: 28, color: '#4a148c' }} />
      </Avatar>

      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, fontSize: 15, color: '#212121', lineHeight: 1 }}
        >
          {user.name || 'John Doe'}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: 13, color: '#444' }}>
          {user.phone || '7896797370'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SidebarUserCard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import useAuth from '../hooks/useAuth';

// Fully centered root, fixed layout, no movement
const RootStyle = styled('div')(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: '#ffffff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const ContentStyle = styled('div')(() => ({
  width: '100%',
  maxWidth: 480,
}));

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === '111') {
      login('fake_token');
      localStorage.setItem('user', JSON.stringify({ name: 'Admin', phone: '7896797370' }));
      navigate('/dashboard/user');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <RootStyle>
      <ContentStyle>
        <Card
          sx={{
            p: 5,
            borderRadius: 4,
            boxShadow: '0 0 30px rgba(0, 123, 255, 0.15)',
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <img
              src="./Ailogo.png"
              alt="AI Secretary"
              style={{
                height: 60,
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 6px rgba(0, 123, 255, 0.3))',
              }}
            />
          </Box>

          <Typography variant="h5" fontWeight="bold" textAlign="left" gutterBottom>
            LOGIN
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 3 }} textAlign="left">
            Enter your details below.
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }} textAlign="center">
              {error}
            </Typography>
          )}

          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField
                label="Email address"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(90deg, #003B94 0%, #0E6FA8 50%, #1792B3 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  py: 1.5,
                  borderRadius: 2,
                  boxShadow: '0px 4px 20px rgba(0, 123, 255, 0.4)',
                  '&:hover': {
                    background: '#0E6FA8',
                  },
                }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Card>
      </ContentStyle>
    </RootStyle>
  );
}

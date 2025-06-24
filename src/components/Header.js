// import React from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
// } from '@mui/material';
// import AccountCircle from '@mui/icons-material/AccountCircle';

// const Header = ({ open }) => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const isMenuOpen = Boolean(anchorEl);

//   const handleMenu = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         zIndex: 1201,
//         backgroundColor: '#fff',
//         color: '#000',
//         boxShadow: 'none',
//         borderBottom: '1px solidrgb(255, 243, 243)',
//         width: `calc(100% - ${open ? 240 : 70}px)`,
//         marginLeft: `${open ? 240 : 70}px`,
//         transition: 'all 0.3s ease',
//       }}
//     >
//       <Toolbar sx={{ justifyContent: 'space-between' }}>
//         <Typography variant="h6" noWrap>
//           AI Admin
//         </Typography>
//         <Box>
//           <IconButton onClick={handleMenu} color="inherit">
//             <AccountCircle />
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={isMenuOpen}
//             onClose={handleClose}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//           >
//             <MenuItem onClick={handleClose}>Profile</MenuItem>
//             <MenuItem
//               onClick={() => {
//                 localStorage.clear();
//                 window.location.href = '/';
//               }}
//             >
//               Logout
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;

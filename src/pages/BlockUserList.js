import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton, Avatar, Menu, MenuItem,
  CircularProgress, Box, Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import Layout from '../components/Layout';

const rowsPerPage = 20;

const BlockUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);

  // Component mount hote hi data fetch karo
  useEffect(() => {
    fetchUsers();
  }, []);

  // Blocked users ka data get karna
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/admin/api/users/blocked');
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error('Blocked users fetch karne me error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  // Pagination logic
  const paginatedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Layout>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <h3 style={{
          fontFamily: 'Mulish',
          fontWeight: 700,
          fontSize: '20px',
          color: '#000'
        }}>
          Blocked Users List
        </h3>

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
                <TableCell ><strong>Avatar</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>AI Number</strong></TableCell>
                <TableCell sx={{pl: 4}}><strong>Date</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Box sx={{ py: 4 }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">Koi blocked users nahi mile.</TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Avatar src={user.user?.photo} alt={user.user?.name} />
                    </TableCell>
                    <TableCell>{user.user?.name}</TableCell>
                    <TableCell>{user.user?.email}</TableCell>
                    <TableCell>{user.phone || '-'}</TableCell>
                    <TableCell>{user.ai_number}</TableCell>
                    <TableCell>
                      <Chip
                        label={new Date(user.createdAt).toLocaleDateString()}
                        size="small"
                        sx={{
                          backgroundColor: '#d1d5ff',
                          color: '#000',
                          fontWeight: 500,
                          borderRadius: '16px'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleMenuOpen(event, user)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination agar users > 20 ho tab dikhaye */}
        {!loading && users.length > rowsPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={Math.ceil(users.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              shape="rounded"
              color="primary"
            />
          </Box>
        )}
      </Paper>

      {/* Actions menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 8,
          sx: {
            borderRadius: 2,
            mt: 1,
            minWidth: 150,
            backgroundColor: '#fff',
            boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)',
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.2,
              fontSize: 14,
              fontWeight: 500,
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                backgroundColor: '#f0f4ff',
                color: '#1976d2',
              },
              '& svg': {
                fontSize: 18,
              },
            },
          },
        }}
      >
        <MenuItem onClick={() => console.log('Edit clicked', selectedUser)}>
          <EditIcon /> Edit
        </MenuItem>
      </Menu>
    </Layout>
  );
};

export default BlockUserList;

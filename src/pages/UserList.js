import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton, Menu, MenuItem, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField, Button, Avatar,
  CircularProgress, Box, Pagination
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import Layout from '../components/Layout';
import UserSummaryCards from './UserSummaryCards';

const rowsPerPage = 20;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/admin/api/users');
      const realUsers = res.data?.data || [];

      const mapped = realUsers.map((u) => {
        const isUserObject = typeof u.user === 'object' && u.user !== null;

        return {
          id: u._id,
          phone: u.phone || u.ai_number || 'N/A',
          aiNumber: u.ai_number || 'N/A',
          createdAt: u.createdAt || '',
          photo: isUserObject ? u.user.photo : '',
          isBlocked: u.isBlocked || false,
        };
      });

      setUsers(mapped);
    } catch (err) {
      console.error('Error fetching real users:', err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async (userId) => {
    try {
      const res = await axios.post(
        '/admin/api/users/block',
        { userId },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log('User blocked:', res.data);
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleMenuOpen = (e, user) => {
    setAnchorEl(e.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEdit = () => {
    setFormData({ name: selectedUser.name, phone: selectedUser.phone });
    setEditDialogOpen(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setFormData({ name: '', phone: '' });
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveChanges = () => {
    const updated = users.map((u) =>
      u.id === selectedUser.id ? { ...u, ...formData } : u
    );
    setUsers(updated);
    handleDialogClose();
  };

  const handleBlock = async () => {
    try {
      await blockUser(selectedUser.id);
      const updated = users.map((u) =>
        u.id === selectedUser.id ? { ...u, isBlocked: true } : u
      );
      setUsers(updated);
    } catch (err) {
      console.error('Failed to block user:', err);
    } finally {
      handleMenuClose();
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const unblockUser = async (userId) => {
  try {
    const res = await axios.post(
      '/admin/api/users/unblock',
      { userId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('User unblocked:', res.data);
  } catch (error) {
    console.error('Error unblocking user:', error);
  }
};

const handleUnblock = async () => {
  try {
    await unblockUser(selectedUser.id);
    const updated = users.map((u) =>
      u.id === selectedUser.id ? { ...u, isBlocked: false } : u
    );
    setUsers(updated);
  } catch (err) {
    console.error('Failed to unblock user:', err);
  } finally {
    handleMenuClose();
  }
};


  // Pagination slicing
  const paginatedUsers = users.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Layout>
      <Box sx={{ px: 4 /* or mx: 'auto' for center align */, width: '100%' }}>
  <UserSummaryCards />
</Box>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <h3 style={{ fontWeight: 700, fontSize: '20px', marginBottom: 16 }}>Users List</h3>

        <TableContainer component={Paper} sx={{ borderRadius: 3, maxHeight: '70vh' }}>
          <Table stickyHeader>
            <TableHead>
  <TableRow>
    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Avatar</TableCell>
    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', pl: 5 }}>Phone</TableCell>
    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', pl: 3 }}>AI Number</TableCell>

    {/* Move this Date cell slightly right */}
    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', pl: 4 }}>
      Date
    </TableCell>

    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', pl: 5 }}>Time</TableCell>
    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Status</TableCell>
    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Actions</TableCell>
  </TableRow>
</TableHead>


            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Box sx={{ py: 4 }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">No users found.</TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar src={user.photo} sx={{ bgcolor: '#d1d5ff' }}>
                        {!user.photo && <PersonIcon />}
                      </Avatar>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.aiNumber}</TableCell>
                    <TableCell>
                      <Chip
                        label={new Date(user.createdAt).toLocaleDateString()}
                        size="small"
                        sx={{
                          backgroundColor: '#d1d5ff',
                          fontWeight: 500,
                          borderRadius: '16px'
                        }}
                      />
                    </TableCell>
                    <TableCell >
                      <Chip
                        label={new Date(user.createdAt).toLocaleTimeString()}
                        size="small"
                        sx={{
                          backgroundColor: '#ffe4c4',
                          fontWeight: 500,
                          borderRadius: '16px',
                          
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {user.isBlocked ? (
                        <Chip label="Blocked" color="error" size="small" />
                      ) : (
                        <Chip label="Active" color="success" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
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

      {/* Menu */}<Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
  PaperProps={{
    sx: {
      borderRadius: 2,
      mt: 1,
      minWidth: 150,
      boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)',
      '& .MuiMenuItem-root': {
        px: 2,
        py: 1.2,
        fontSize: 14,
        display: 'flex',
        gap: 1,
        '&:hover': {
          backgroundColor: '#f0f4ff',
          color: '#1976d2'
        }
      }
    }
  }}
>
  <MenuItem onClick={handleEdit}><EditIcon /> Edit</MenuItem>
  {selectedUser?.isBlocked ? (
    <MenuItem onClick={handleUnblock}><BlockIcon /> Unblock</MenuItem>
  ) : (
    <MenuItem onClick={handleBlock}><BlockIcon /> Block</MenuItem>
  )}
</Menu>


      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleDialogClose}
        PaperProps={{
          sx: { borderRadius: 3, p: 2, width: 400 }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 700, fontSize: '1.4rem', mb: 1 }}>
          ✏️ Edit User
        </DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={selectedUser?.photo}
            sx={{ width: 72, height: 72, mb: 1, bgcolor: '#d1d5ff', fontSize: 28 }}
          >
            {!selectedUser?.photo && selectedUser?.name?.charAt(0)}
          </Avatar>

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            variant="outlined"
            size="small"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            variant="outlined"
            size="small"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveChanges}
            sx={{
              textTransform: 'none',
              backgroundColor: '#4f46e5',
              '&:hover': { backgroundColor: '#4338ca' },
              borderRadius: 2,
              px: 3,
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default UserList;

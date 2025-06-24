import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, CircularProgress, Box, Button
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TopUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/admin/api/users');
        const data = res.data?.data || [];

        const mapped = data.map((u) => {
          const isUser = typeof u.user === 'object' && u.user !== null;
          return {
            id: u._id,
            phone: u.phone || u.ai_number || 'N/A',
            aiNumber: u.ai_number || 'N/A',
            createdAt: u.createdAt || '',
            isBlocked: u.isBlocked || false,
          };
        });

        setUsers(mapped);
      } catch (err) {
        console.error('Error fetching users:', err);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const topUsers = users.slice(0, 5);

  return (
    <Box>
      <h3 style={{ fontWeight: 600, fontSize: '16px', marginBottom: 12 }}>User List</h3>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          maxHeight: 260,
          overflowY: 'auto',
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {['Phone', 'AI Number', 'Date', 'Time', 'Status'].map((head) => (
                <TableCell
                  key={head}
                  sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold', py: 1, fontSize: '13px' }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Box sx={{ py: 3 }}>
                    <CircularProgress size={24} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              topUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell sx={{ py: 0.5, fontSize: '13px' }}>{user.phone}</TableCell>
                  <TableCell sx={{ py: 0.5, fontSize: '13px' }}>{user.aiNumber}</TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Chip
                      label={new Date(user.createdAt).toLocaleDateString()}
                      size="small"
                      sx={{ backgroundColor: '#d1d5ff', fontWeight: 500, borderRadius: '16px', fontSize: '11px' }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    <Chip
                      label={new Date(user.createdAt).toLocaleTimeString()}
                      size="small"
                      sx={{ backgroundColor: '#ffe4c4', fontWeight: 500, borderRadius: '16px', fontSize: '11px' }}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 0.5 }}>
                    {user.isBlocked ? (
                      <Chip label="Blocked" color="error" size="small" sx={{ fontSize: '11px' }} />
                    ) : (
                      <Chip label="Active" color="success" size="small" sx={{ fontSize: '11px' }} />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
        <Button
          
          onClick={() => navigate('/dashboard/user')}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            fontSize: '13px',
            py: 0.5,
            color:"black"
           
          }}
        >
          View All →
        </Button>
      </Box>
    </Box>
  );
};

export default TopUserList;

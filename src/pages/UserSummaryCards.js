// components/UserSummaryCards.jsx

import { useEffect, useState } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';

const UserSummaryCards = () => {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    deactivated: 0,
    blocked: 0,
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await axios.get('/admin/api/users');
        const formatted = res.data?.data?.map(u => ({
          status: u.isBlocked
            ? 'blocked'
            : u.deactivated
              ? 'deactivated'
              : 'active',
        })) || [];

        const total = formatted.length;
        const active = formatted.filter(u => u.status === 'active').length;
        const deactivated = formatted.filter(u => u.status === 'deactivated').length;
        const blocked = formatted.filter(u => u.status === 'blocked').length;

        setStats({ total, active, deactivated, blocked });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchUserStats();
  }, []);

  const cardData = [
    { title: 'Total Users', value: stats.total },
    { title: 'Active Users', value: stats.active },
    { title: 'Deactivated Users', value: stats.deactivated },
    { title: 'Blocked Users', value: stats.blocked }
  ];

  return (
    <Grid container spacing={6} mb={9}>
      {cardData.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              py: 3,
              px: 2,
              borderRadius: 3,
              boxShadow: 2,
              textAlign: 'center',
              height: '100%',
              width: '150px',
            }}
          >
            <Typography variant="subtitle1" sx={{ color: '#000000' }}>
              {item.title}
            </Typography>
            <Typography variant="h4" sx={{ color: '#000000', mt: 3 }}>
              {item.value}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserSummaryCards;

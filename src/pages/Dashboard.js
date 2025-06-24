import { useEffect, useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid
} from '@mui/material';
import { PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import Layout from '../components/Layout';
import TopUserList from './TopUserList';

const COLORS = ['#0047AB', '#0E78BA', '#639DCA']; // Active, Deactivated, Blocked

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState('Total');
  const [selectedValue, setSelectedValue] = useState(0);

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    deactivated: users.filter(u => u.status === 'deactivated').length,
    blocked: users.filter(u => u.status === 'blocked').length,
  };

  const pieData = [
    { name: 'Active', value: stats.active },
    { name: 'Deactivated', value: stats.deactivated },
    { name: 'Blocked', value: stats.blocked },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/admin/api/users');
        const formatted = res.data?.data?.map(u => ({
          name: u.user?.name || 'N/A',
          role: u.role || 'User',
          email: u.user?.email || 'N/A',
          number: u.phone || u.ai_number || 'N/A',
          createdAt: u.createdAt,
          status: u.isBlocked ? 'blocked' : (u.deactivated ? 'deactivated' : 'active')
        })) || [];
        setUsers(formatted);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setSelectedValue(stats.total);
  }, [stats.total]);

  const handleSliceClick = (entry) => {
    setSelectedLabel(entry.name);
    setSelectedValue(entry.value);
  };

  return (
    <Layout>
      <Box sx={{ p: 4, bgcolor: '#ffffff', minHeight: '100vh' }}>
        {/* Summary Cards */}
        <Grid container spacing={6} mb={9}>
          {[
            { title: 'Total Users', value: stats.total },
            { title: 'Active Users', value: stats.active },
            { title: 'Deactivated Users', value: stats.deactivated },
            { title: 'Blocked Users', value: stats.blocked }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{
                py: 3, px: 2, borderRadius: 3, boxShadow: 2,
                textAlign: 'center', height: '100%', width: '150px'
              }}>
                <Typography variant="subtitle1" sx={{ color: '#000000' }}>{item.title}</Typography>
                <Typography variant="h4" color="primary" sx={{ color: '#000000' ,mt:3 }}>{item.value}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Chart + Table */}
        <Box display="flex" gap={3} flexWrap="nowrap" width="100%">
          {/* Donut Chart */}
          <Card
            sx={{
              width: '38%',
              borderRadius: 3,
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Typography variant="subtitle1" mb={2}>Current Users</Typography>

            {/* Pie Chart */}
            <Box sx={{ position: 'relative', width: 200, height: 200 }}>
              <PieChart width={200} height={200}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={88}
                  paddingAngle={2}
                  dataKey="value"
                  isAnimationActive={false}
                  onClick={handleSliceClick}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      onMouseEnter={(e) => e.target.setAttribute('opacity', 0.7)}
                      onMouseLeave={(e) => e.target.setAttribute('opacity', 1)}
                    />
                  ))}
                </Pie>
              </PieChart>

              {/* Dynamic Center Label */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  {selectedLabel}
                </Typography>
                <Typography variant="h4" fontWeight="bold">{selectedValue}</Typography>
              </Box>
            </Box>

            {/* Legend */}
            <Box mt={2} display="flex" justifyContent="space-between" width="100%">
              <LegendItem color="#0047AB" label="Active" />
              <LegendItem color="#0E78BA" label="Deactivated" />
              <LegendItem color="#639DCA" label="Blocked" />
            </Box>
          </Card>

          {/* Top Users Table */}
          <Card
            sx={{
              width: '62%',
              borderRadius: 3,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 350,
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
              <TopUserList />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
};

// Legend Component
const LegendItem = ({ color, label }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color }} />
    <Typography variant="body2">{label}</Typography>
  </Box>
);

export default UserDashboard;

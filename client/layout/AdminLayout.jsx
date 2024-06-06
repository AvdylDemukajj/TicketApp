// layouts/AdminLayout.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const AdminLayout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
            </Box>
        </Box>
    );
}

export default AdminLayout;

// components/Sidebar.js
import React from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemText, ListItemButton } from '@mui/material';

const Sidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: '200px' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <ListItemButton sx={{
            bgcolor: 'background.paper',
            border: '1px solid #ccc',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText'
            }
          }}>
            <ListItemText primary="GitTix" />
          </ListItemButton>
        </Link>
      <List sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: '50px', width: '200px' }}>
        <Link href="/admin/tickets" style={{ textDecoration: 'none' }}>
          <ListItemButton sx={{
            bgcolor: 'background.paper',
            border: '1px solid #ccc',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText'
            }
          }}>
            <ListItemText primary="Tickets" />
          </ListItemButton>
        </Link>
        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <ListItemButton sx={{
            bgcolor: 'background.paper',
            border: '1px solid #ccc',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText'
            }
          }}>
            <ListItemText primary="Users" />
          </ListItemButton>
        </Link>
        <Link href="/admin/orders" style={{ textDecoration: 'none' }}>
          <ListItemButton sx={{
            bgcolor: 'background.paper',
            border: '1px solid #ccc',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText'
            }
          }}>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </Link>
        <Link href="/admin/payments" style={{ textDecoration: 'none' }}>
          <ListItemButton sx={{
            bgcolor: 'background.paper',
            border: '1px solid #ccc',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'primary.contrastText'
            }
          }}>
            <ListItemText primary="Payments" />
          </ListItemButton>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
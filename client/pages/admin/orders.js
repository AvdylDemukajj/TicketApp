// pages/admin/orders.js
import AdminLayout from "../../layout/AdminLayout";
import useRequest from '../../hooks/use-request'; 
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField } from '@mui/material';
import axios from 'axios'; // Sigurohuni që të importoni axios nëse do ta përdorni

const OrdersDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/orders')
            .then(response => {
                setOrders(response.data);
                setFilteredOrders(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        const results = orders.filter(order =>
            order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOrders(results);
    }, [searchTerm, orders]);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    return (
        <AdminLayout>
            <h1 style={{color:'white',textAlign:'center'}}>Orders Dashboard</h1>
            <TextField
                label="Search Orders"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TableContainer component={Paper} sx={{backgroundColor: '#585858', color:'white'}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{color:'white'}}>ID</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Name</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Email</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Total</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell component="th" scope="row">
                                    {order.id}
                                </TableCell>
                                <TableCell align="right">{order.name}</TableCell>
                                <TableCell align="right">{order.email}</TableCell>
                                <TableCell align="right">{order.total}</TableCell>
                                <TableCell align="right">{order.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
}

export default OrdersDashboard;
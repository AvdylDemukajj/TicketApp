// pages/admin/payments.js
import AdminLayout from "../../layout/AdminLayout";
import  useRequest  from '../../hooks/use-request'; 
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField } from '@mui/material';

const PaymentsDashboard = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { doRequest, data, error, isLoading } = useRequest({
        url: '/api/payments',
        method: 'get',
        onSuccess: (data) => {
            setPayments(data);
            setFilteredPayments(data);
        }
    });

    useEffect(() => {
        doRequest();
    }, []);

    useEffect(() => {
        const results = payments.filter(payment =>
            payment.payerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.payerEmail.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPayments(results);
    }, [searchTerm, payments]);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    return (
        <AdminLayout>
            <h1 style={{color:'white',textAlign:'center'}}>Payments Dashboard</h1>
            <TextField
                label="Search Payments"
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
                            <TableCell align="right" sx={{color:'white'}}>Payer Name</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Payer Email</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Amount</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPayments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell component="th" scope="row">
                                    {payment.id}
                                </TableCell>
                                <TableCell align="right" >{payment.payerName}</TableCell>
                                <TableCell align="right">{payment.payerEmail}</TableCell>
                                <TableCell align="right">{payment.amount}</TableCell>
                                <TableCell align="right">{payment.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
}

export default PaymentsDashboard;
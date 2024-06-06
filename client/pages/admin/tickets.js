import AdminLayout from "../../layout/AdminLayout";
import useRequest from '../../hooks/use-request'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const TicketsDashboard = () => {
    const [tickets, setTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentTicket, setCurrentTicket] = useState({ id: '', title: '', price: '', version: '', category: '' });

    const { doRequest, errors } = useRequest({
        url: '/api/tickets',
        method: 'get',
        onSuccess: (data) => {
            setTickets(data);
            setFilteredTickets(data);
            setIsLoading(false);
        },
        onError: (err) => {
            setError(err);
            setIsLoading(false);
        }
    });

    useEffect(() => {
       axios.get('https://ticketing.dev/api/tickets')
       .then(response => {
           setTickets(response.data);
           console.log(response.data);
           setFilteredTickets(response.data);
       })
       .catch(err => setError(err))
       .finally(() => setIsLoading(false))
    }, []);

    useEffect(() => {
        const results = tickets.filter(ticket =>
            (ticket.title ? ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
            (ticket.price ? ticket.price.toString().includes(searchTerm) : false) 
            // (ticket.category ? ticket.category.toLowerCase().includes(searchTerm.toLowerCase()) : false)
        );
        setFilteredTickets(results);
    }, [searchTerm, tickets]);

    const handleEditClick = (ticket) => {
        setCurrentTicket({ ...ticket, version: ticket.version + 1 });
        setEditModalOpen(true);
    };

    const handleUpdateTicket = async () => {
        doRequest({
            url: `/api/tickets/${currentTicket.id}`,
            method: 'put',
            body: currentTicket,
            onSuccess: (response) => {
                setTickets(tickets.map(ticket => ticket.id === currentTicket.id ? response.data : ticket));
                setEditModalOpen(false);
            },
            onError: (err) => {
                setError(err);
            }
        });
    };

    const handleDeleteTicket = async (ticketId) => {
        doRequest({
            url: `/api/tickets/${ticketId}`,
            method: 'delete',
            onSuccess: () => {
                setTickets(tickets.filter(ticket => ticket.id !== ticketId));
            },
            onError: (err) => {
                setError(err);
            }
        });
    };

    const handleChange = (e) => {
        setCurrentTicket({ ...currentTicket, [e.target.name]: e.target.value });
    };

    const handleCloseModal = () => {
        setEditModalOpen(false);
    };

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    }

    return (
        <AdminLayout>
            <h1 style={{color:'white',textAlign:'center'}}>Tickets Dashboard</h1>
            <Button variant="contained" color="primary" onClick={() => setEditModalOpen(true)}>Create New Ticket</Button>
            <Dialog open={editModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Edit Ticket</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentTicket.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentTicket.price}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="version"
                        label="Version"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentTicket.version}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="category"
                        label="Category"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={currentTicket.category}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateTicket} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
            <TextField
                label="Search Tickets"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TableContainer component={Paper} sx={{backgroundColor: '#585858', color:'white'}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Ticket Title</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Ticket Price</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Version</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Category</TableCell>
                            <TableCell align="right" sx={{color:'white'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTickets.map((ticket) => (
                            <TableRow key={ticket.id}>
                                <TableCell component="th" scope="row">
                                    {ticket.id}
                                </TableCell>
                                <TableCell align="right">{ticket.title}</TableCell>
                                <TableCell align="right">{ticket.price}</TableCell>
                                <TableCell align="right">{ticket.version}</TableCell>
                                <TableCell align="right">{ticket.category}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleEditClick(ticket)} color="primary">Edit</Button>
                                    <Button onClick={() => handleDeleteTicket(ticket.id)} color="secondary">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
}

export default TicketsDashboard;
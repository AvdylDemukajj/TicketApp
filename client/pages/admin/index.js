import AdminLayout from "../../layout/AdminLayout";
import useRequest from '../../hooks/use-request'; // Adjust the path as necessary
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from '@mui/material';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const { data, error, isLoading } = useRequest({ url: '/api/users', method: 'get' });

    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({ email: '', password: '' });

    const { doRequest, errors } = useRequest({
        url: '',
        method: '',
        body: {},
        onSuccess: (response) => {
            setUsers(users.map(user => user.id === currentUser.id ? response.data : user));
            setEditModalOpen(false);
        }
    });

    const handleDelete = async (userId) => {
        await doRequest({
            url: `/api/users/${userId}`,
            method: 'delete',
            onSuccess: () => setUsers(users.filter(user => user.id !== userId))
        });
    };

    const handleEdit = () => {
        doRequest({
            url: `/api/users/${currentUser.id}`,
            method: 'put',
            body: currentUser
        });
    };

    const handleCreate = () => {
        doRequest({
            url: `/api/users`,
            method: 'post',
            body: currentUser,
            onSuccess: (response) => setUsers([...users, response.data])
        });
    };

    const handleChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
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
            <h1 style={{color:'white',textAlign:'center'}}>Dashboard</h1>
            <Button variant="contained" color="primary" onClick={() => { setEditModalOpen(true); setCurrentUser({ id: '', name: '', email: '' }); }}>Create User</Button>
            <Dialog open={editModalOpen} onClose={handleCloseModal}>
                <DialogTitle>{currentUser.id ? 'Edit User' : 'Create User'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={currentUser.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={currentUser.password}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={currentUser.id ? handleEdit : handleCreate} color="primary">
                        {currentUser.id ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{backgroundColor: '#585858', color:'white'}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell component="th" scope="row">
                                    {user.id}
                                </TableCell>
                                <TableCell align="right">{user.name}</TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => { setEditModalOpen(true); setCurrentUser(user); }} color="primary">Edit</Button>
                                    <Button onClick={() => handleDelete(user.id)} color="secondary">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
}

export default AdminDashboard;
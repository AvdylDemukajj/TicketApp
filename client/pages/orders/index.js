//{ orders }

import { Avatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";

const OrderIndex = () => {
  const orders = [
    {
      id: 1,
      ticket: {
        title: 'Ticket 1'
      },
      status: 'created'
    },
    {
      id: 2,
      ticket: {
        title: 'Ticket 2'
      },
      status: 'cancelled'
    },
    {
      id: 3,
      ticket: {
        title: 'Ticket 3'
      },
      status: 'created'
    },
    {
      id: 4,
      ticket: {
        title: 'Ticket 4'
      },
      status: 'created'
    },
  ]

  return (
    <>
      <Typography variant="h4" sx={{color: 'white',margin:'20px 0px',textAlign:'center'}}>
        Order Dashboard
      </Typography>
      <TableContainer component={Paper} mt={5}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead mt={5}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  <Avatar src={order.image} alt={order.ticket.title} />
                </TableCell>
                <TableCell>{order.ticket.title}</TableCell>
                <TableCell>
                  {order.status} {order.status === 'cancelled' ? <FcCancel style={{ fontSize: "20px" }} /> : <FaEnvelopeCircleCheck style={{ fontSize: "20px", color: 'green', marginLeft: '5px' }} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  // const { data } = await client.get('/api/orders');

  // return { orders: data };
};

export default OrderIndex;

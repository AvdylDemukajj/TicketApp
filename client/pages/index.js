import Link from 'next/link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
// import Img from '../static/ticket.jpg';



//,tickets
const LandingPage = ({ currentUser, tickets }) => {

  return (
    <div>
      <Grid container spacing={3}>
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={ticket.id}>
            <Card sx={{ maxWidth: 345, backgroundColor: "#2d2e2c",color: 'white' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image=""
              />
              <CardContent sx={{color: "white"}}>
                <Typography gutterBottom variant="h5" sty component="div">
                  {ticket.title}
                </Typography>
                <Typography variant="body2">
                  {ticket.description}
                </Typography>
                <Typography variant="body2">
                  {ticket.price}
                </Typography>
                {/* <Typography variant="body2">
                  {ticket.category}
                </Typography> */}
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                <Button size="small">View</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { getUser } from '@/app/api/auth/userModel';
import * as React from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const UserProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getUser(id);
  console.log({ user, id });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      {!user ? (
        <Typography variant="h6">User not found</Typography>
      ) : (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/profile_background.jpg" // Correct path
            title="Profile Background"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user.name + ' ' + user.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </CardContent>
          <CardActions>
            {user.discord ? (
              <Button size="small">
                <a href={user.discord} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px' }}>
                  <img src="/discord.png" alt="Share" style={{ width: '24px', height: '24px' }} />
                </a>
              </Button>
            ) : null}
            {user.github ? (
              <Button size="small">
                <a href={user.github} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px' }}>
                  <img src="/github.png" alt="Share" style={{ width: 24, height: 24 }} />
                </a>
              </Button>
            ) : null}
            {user.linkedin ? (
              <Button size="small">
                <a href={user.linkedin} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px' }}>
                  <img src="/linkedin.png" alt="Share" style={{ width: 24, height: 24 }} />
                </a>
              </Button>
            ) : null}
            {user.instagram ? (
              <Button size="small">
                <a href={user.instagram} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px' }}>
                  <img src="/instagram.png" alt="Share" style={{ width: 24, height: 24 }} />
                </a>
              </Button>
            ) : null}
          </CardActions>
        </Card>
      )}
    </Box>
  );
};

export default UserProfilePage;
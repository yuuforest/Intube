import * as React from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function BasicCard() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                매칭 인터뷰
              </Typography>
              <Typography variant="body2">
                총 ~건
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                신청 인터뷰
              </Typography>
              <Typography variant="body2">
                총 ~건
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                완료 인터뷰
              </Typography>
              <Typography variant="body2">
                총 ~건
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
    </Grid>
    </div>
  );
}

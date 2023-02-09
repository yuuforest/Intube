import * as React from "react";
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

export default function BasicCard(props) {
  const navigate = useNavigate();
  const route = props.routeInfo.route 

  const goToMatch = () => {
    navigate(route, {state: props.routeInfo.matchInfo });
  };
  const goToApply = () => {
    navigate(route, {state: props.routeInfo.applyInfo });
  };
  const goToClose = () => {
    // TODO: 완료 페이지는 아직 구현안돼서 나중에 state 변경하기
    navigate(route, {state: props.routeInfo.completeInfo });
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {props.cardInfo.name[0]}
              </Typography>
              <Typography variant="body2">총 {props.cardInfo.match}건</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={goToMatch}>더보기</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {props.cardInfo.name[1]}
              </Typography>
              <Typography variant="body2">총 {props.cardInfo.apply}건</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={goToApply}>더보기</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {props.cardInfo.name[2]}
              </Typography>
              <Typography variant="body2">총 {props.cardInfo.complete}건</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={goToClose}>더보기</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

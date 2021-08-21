import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function SearchResult() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>검색결과</Title>
      <Typography component="p" variant="h4">
        진미 식당
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        서울시 노원구
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          예약하러가기
        </Link>
      </div>
    </React.Fragment>
  );
}
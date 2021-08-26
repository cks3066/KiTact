import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as searchActions} from "../redux/modules/search";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});



export default function SearchResult(props) {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>검색결과</Title>
      <Typography>
        {search.searchResult.restaurant_name}
      </Typography>
      <Typography>
        {search.searchResult.address}
      </Typography>
      <Typography>
        {search.searchResult.opentime}
      </Typography>
      <Typography>
        {search.searchResult.large_category}
      </Typography>
      <Typography>
        {search.searchResult.medium_category}
      </Typography>
      <Typography>
        {search.searchResult.small_category}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          예약하러가기
        </Link>
      </div>
    </React.Fragment>
  );
}
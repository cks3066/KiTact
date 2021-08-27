import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as searchActions } from '../redux/modules/search'
import { history } from '../redux/configStore'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

function preventDefault() {
  history.push('/reservation')
}

export default function SearchResult(props) {
  const search = useSelector(state => state.search)

  return (
    <React.Fragment>
      <Contai>
        <Paper variant='outlined'>          
          <Typography gutterBottom variant='h4' align='center'>
            {search.searchResult.restaurant_name}
          </Typography>
          <hr/>
          <P>
            <Typography align='left'>
              <Title_>&nbsp;&nbsp;&nbsp;주소 : &nbsp;&nbsp;</Title_>
              {search.searchResult.address}
            </Typography>
          </P>
          <P>
            <Typography align='left'>
              <Title_>&nbsp;&nbsp;&nbsp;음식 종류 : &nbsp;&nbsp;</Title_> {search.searchResult.medium_category}
            </Typography>
          </P>
          <P>
            <Typography align='left'>
              <Title_>&nbsp;&nbsp;&nbsp;메뉴 : &nbsp;&nbsp;</Title_>
              {search.searchResult.small_category}
            </Typography>
          </P>
          <P>
            <Typography align='left'>
              <Title_>&nbsp;&nbsp;&nbsp;영업 시간 : &nbsp;&nbsp;</Title_> {search.searchResult.opentime}
            </Typography>
          </P>
        </Paper>
      </Contai>
      <div>
        <Link color='primary' href='#' onClick={preventDefault}>
          예약하러가기
        </Link>
      </div>
    </React.Fragment>
  )
}

const P = styled.p`
  margin: '10px';
`

const Title_ = styled.span`
  font-weight: bold;
  color: #005B8F;
`
const Content = styled.span`
  color: #535353;
`

const Contai = styled.div`
  margin: '20px';
`

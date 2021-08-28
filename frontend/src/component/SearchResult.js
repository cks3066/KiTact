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
import axios from 'axios'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export default function SearchResult(props) {
  const dispatch = useDispatch()
  const search = useSelector(state => state.search)
  const user = useSelector(state => state.user)
  const is_login = !(cookies.get('is_login') === undefined)
  return (
    <React.Fragment>
      <Contai>
        <Paper variant='outlined'>
          <Typography gutterBottom variant='h4' align='center'>
            {search.searchResult.restaurant_name}
          </Typography>
          <hr />
          <P>
            <Typography align='left'>
              <Title_>&nbsp;&nbsp;&nbsp;주소 : &nbsp;&nbsp;</Title_>
              {search.searchResult.address}
            </Typography>
          </P>
          <P>
            <Typography align='left'>
              <Title_>&nbsp;&nbsp;&nbsp;음식 종류 : &nbsp;&nbsp;</Title_>{' '}
              {search.searchResult.medium_category}
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
              <Title_>&nbsp;&nbsp;&nbsp;영업 시간 : &nbsp;&nbsp;</Title_>{' '}
              {search.searchResult.opentime}
            </Typography>
          </P>
        </Paper>
      </Contai>
      <div>
        {is_login && (
          <Link
            color='primary'
            href='#'
            onClick={user => {
              axios
                .get('http://localhost:8080/restaurant/search/' + user.uid)
                .then(res => {
                  history.push('/reservation')
                })
                .catch(error => {
                  window.alert("등록된 식당이 아닙니다. 먼저 등록해주세요.")
                  history.push('/newrestaurant')
                })
            }}
          >
            예약하러가기
          </Link>
        )}
      </div>
    </React.Fragment>
  )
}

const P = styled.p`
  margin: '10px';
`

const Title_ = styled.span`
  font-weight: bold;
  color: #005b8f;
`
const Content = styled.span`
  color: #535353;
`

const Contai = styled.div`
  margin: '20px';
`

import React from 'react'
import ShowMap from '../elements/ShowMap'
import styled from 'styled-components'
import RestaurantSearch from '../elements/RestaurantSearch'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import SearchResult from '../component/SearchResult'
import Typography from '@material-ui/core/Typography'
const drawerWidth = 240

const Search = props => {
  return (
    <React.Fragment>
      <RestaurantSearch />
      <Container>
        <Cent>
          <Paper variant="outlined">
            <ShowMap />
          </Paper>
        </Cent>
        <Cent>
          <SearchResult></SearchResult>
        </Cent>
      </Container>
    </React.Fragment>
  )
}

const Cent = styled.div`
  margin: 10px;
`

export default Search

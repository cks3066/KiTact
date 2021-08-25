import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Search from './pages/Search'
import Login from './pages/Login'
import Signup from './pages/Signup'

import { Restaurant } from './component/Restaurant'
import Connect from './Connect'
import { apiKey } from './shared/Firebase'
import { actionCreators as userActions } from './redux/modules/user'
import { useDispatch } from 'react-redux'

import { history } from './redux/configStore'
import { Order } from './pages/Order'

import Header from './component/Header'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'SpartaCodingClub Project KiTact'} {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function App() {
  const dispatch = useDispatch()

  const _session_key = `firebase:authUser:${apiKey}:kitact`
  const is_session = sessionStorage.getItem(_session_key) ? true : false

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB())
    }
  }, []);

  return (
    <div className='App'>
      <div>
      <Connect />
        {/* Drawer & Header */}
        <Header />
        <ConnectedRouter history={history}>
          <Route path='/' exact component={Search} />
          <Route path='/reservation' exact component={Restaurant} />
          <Route path='/map' exact component={Search} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/order' component={Order} />
        </ConnectedRouter>

        {/* Footer */}
        <Box mt={5}>
          <Copyright />
        </Box>
      </div>
    </div>
  )
}

export default App

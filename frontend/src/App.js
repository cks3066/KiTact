<<<<<<< HEAD
import React from 'react'
import { BrowserRouter, Router, withRouter, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
=======
import React from "react";
import { BrowserRouter as ConnectedRouter, Route } from "react-router-dom";
>>>>>>> f8fc3fe58beebecc9c1b083b9e956716429c1795

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

<<<<<<< HEAD
import Search from './pages/Search'
import Login from './pages/Login'
import Signup from './pages/Signup'

import { Restaurant } from './component/Restaurant'
import Connect from './Connect'
import { connect } from 'react-redux'
import { loadMenu, createMenu, calculate, increment, decrement } from './redux/modules/menu'

import { apiKey } from './shared/Firebase'

import { actionCreators as userActions } from './redux/modules/user'
import { useDispatch } from 'react-redux'

import { history } from './redux/configStore'
import Header from './component/Header'

const mapStateToProps = state => {
  return { menu_list: state.menu.list }
}

const mapDispatchToPOrops = dispatch => {
  return {
    load: () => {
      dispatch(loadMenu())
    },
    create: menu => {
      dispatch(createMenu(menu))
    },
    calculate: menu => {
      dispatch(calculate(menu))
    },
    increment: index => {
      dispatch(increment(index))
    },
    decrement: index => {
      dispatch(decrement(index))
    },
  }
}

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'SpartaCodingClub Project KiTact'} {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

=======
import { DashboardComponent } from "./DashboardComponent";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { TopMenuComponent } from "./component/TopMenuComponent";
import Connect from "./Connect";
import { history } from "./redux/configStore";
import { Order } from "./pages/Order";

>>>>>>> f8fc3fe58beebecc9c1b083b9e956716429c1795
function App() {
  const dispatch = useDispatch()

  const _session_key = `firebase:authUser:${apiKey}:kitact`
  const is_session = sessionStorage.getItem(_session_key) ? true : false

  React.useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB())
    }
  }, [])
  ;<Connect />
  return (
    <div className='App'>
      <div>
<<<<<<< HEAD
        {/* Drawer & Header */}
        <Header />

        <ConnectedRouter history={history}>
          <Route path='/' exact component={Search} />
          <Route path='/menulist' exact component={Restaurant} />
          <Route path='/map' exact component={Search} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
        </ConnectedRouter>

        {/* Footer */}
        <Box mt={5}>
          <Copyright />
        </Box>
=======
        <TopMenuComponent />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Search} />
          <Route path="/order" component={Order} />
          <Route path="/dashboard" component={DashboardComponent} />
          <Route path="/map" component={Search} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </ConnectedRouter>
>>>>>>> f8fc3fe58beebecc9c1b083b9e956716429c1795
      </div>
    </div>
  )
}

<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatchToPOrops)(withRouter(App))
=======
export default App;
>>>>>>> f8fc3fe58beebecc9c1b083b9e956716429c1795

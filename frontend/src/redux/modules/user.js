import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

import { setCookie, getCookie, deleteCookie } from '../../shared/Cookie'

import { auth } from '../../shared/Firebase'
import firebase from 'firebase/app'
import axios from 'axios'
import Password from 'antd/lib/input/Password'

// actions
const LOG_OUT = 'LOG_OUT'
const GET_USER = 'GET_USER'
const SET_USER = 'SET_USER'

// action creators
const logOut = createAction(LOG_OUT, user => ({ user }))
const getUser = createAction(GET_USER, user => ({ user }))
const setUser = createAction(SET_USER, (user, token) => ({ user, token }))

// initialState
const initialState = {
  user: null,
  is_login: false,
  is_owner: false,
}

// middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    axios
      .post('http://localhost:8080/user/sign-in', { username: 'value', password: 'value' })
      .then(user => {
        console.log('로그인 성공')
        console.log(user)
        const { accessToken } = user.data.data

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

        dispatch(
          setUser(
            {
              user_name: id,
              id: id,
            },
            user.data.data
          ) //is_owner 넘겨야되는데 response 에 is_owner가 없음
        )

        history.push('/')
      })
      .catch(error => {
        console.log('로그인 post 에러')
        console.log(error.response.data)
      })
  }
}

const signupFB = (id, pwd, is_owner) => {
  return function (dispatch, getState, { history }) {
    axios
      .post('http://localhost:8080/user/sign-up', {
        username: id,
        password: pwd,
        owner: is_owner,
      })
      .then(user => {
        console.log('회원가입 성공')
        console.log(user)
        console.log(user.data.message)
        history.push('/')
      })
      .catch(error => {
        console.log('회원가입 post 에러')
        console.log(error.response)
      })
  }
}

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(
      setUser()
    )
  }
}

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut())
      history.replace('/')
    })
  }
}

// send username, password to the SERVER
const executeJwtAuthenticationService = (username, password) => {
  return axios.post('http://localhost:8080/user/sign-up', {
    username,
    password,
  })
}

const registerSuccessfulLoginForJwt = (username, token) => {
  console.log('===registerSuccessfulLoginForJwt===')
  localStorage.setItem('token', token)
  localStorage.setItem('authenticatedUser', username)
  // sessionStorage.setItem('authenticatedUser', username)
  //this.setupAxiosInterceptors(this.createJWTToken(token))
  this.setupAxiosInterceptors()
}

const createJWTToken = token => {
  return 'Bearer ' + token
}

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      // config.headers['Content-Type'] = 'application/json';
      return config
    },
    error => {
      Promise.reject(error)
    }
  )
}

const logout = () => {
  //sessionStorage.removeItem('authenticatedUser');
  localStorage.removeItem('authenticatedUser')
  localStorage.removeItem('token')
}

const isUserLoggedIn = () => {
  const token = localStorage.getItem('token')
  console.log('===UserloggedInCheck===')
  console.log(token)

  if (token) {
    return true
  }

  return false
}

const getLoggedInUserName = () => {
  //let user = sessionStorage.getItem('authenticatedUser')
  let user = localStorage.getItem('authenticatedUser')
  if (user === null) return ''
  return user
}

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, draft => {
        setCookie('is_login', 'success')
        setCookie('token', action.payload.token)
        draft.user = action.payload.user
        draft.is_login = true
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, draft => {
        deleteCookie('is_login')
        deleteCookie('token')
        draft.user = null
        draft.is_login = false
      }),
    [GET_USER]: (state, action) => produce(state, draft => {}),
  },
  initialState
)

// action creator export
const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
}

export { actionCreators }

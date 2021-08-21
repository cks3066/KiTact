import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'

import { getCookie, setCookie, deleteCookie } from '../shared/Cookie'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import { emailCheck } from '../shared/common'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Login = props => {
  const [openErr1, setOpenErr1] = React.useState(false)
  const [openErr2, setOpenErr2] = React.useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  const [id, setId] = React.useState('')
  const [pwd, setPwd] = React.useState('')

  const login = () => {
    console.log(id)

    if (id === '' || pwd === '') {
      setOpenErr1(true)
      return
    }

    if (!emailCheck(id)) {
      setOpenErr2(true)
      return
    }

    dispatch(userActions.loginFB(id, pwd))
  }

  return (
    <React.Fragment>
      <Collapse in={openErr1}>
        <Alert
          severity='error'
          onClose={() => {
            setOpenErr1(false)
          }}
        >
          아이디 혹은 비밀번호가 입력되지 않았습니다.
        </Alert>
      </Collapse>
      <Collapse in={openErr2}>
        <Alert
          severity='warning'
          onClose={() => {
            setOpenErr2(false)
          }}
        >
          아이디가 이메일 형식에 맞지 않습니다.
        </Alert>
      </Collapse>

      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component='h1' variant='h5'>
            로그인
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='아이디를 입력해주세요. (이메일)'
              name='email'
              autoComplete='email'
              onChange={e => {
                setId(e.target.value)
              }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='비밀번호를 입력해주세요.'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={e => {
                setPwd(e.target.value)
              }}
            />

            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={() => {
                login()
              }}
            >
              Sign In
            </Button>
            <Grid container xs>
              <Grid item xs >
                <Link href='#' variant='body2'>
                 아이디/비밀번호 찾기
                </Link>
              </Grid>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  계정이 없으신가요?회원가입
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default Login

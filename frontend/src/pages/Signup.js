import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'

import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import { emailCheck } from '../shared/common'

const useStyles = makeStyles(theme => ({
  paper: {
    margin : '100px 10px 280px 0px',
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Signup = props => {
  // eslint-disable-next-line no-lone-blocks
  {
    const classes = useStyles()
    const dispatch = useDispatch()

    const [id, setId] = React.useState('')
    const [pwd, setPwd] = React.useState('')
    const [pwd_check, setPwdCheck] = React.useState('')
    const [user_name, setUserName] = React.useState('')
    const [is_owner, setisOwner] = React.useState(false)

    const signup = () => {
      if (id === '' || pwd === '' || user_name === '') {
        window.alert('아이디, 패스워드, 닉네임을 모두 입력해주세요!')
        return
      }

      if (!emailCheck(id)) {
        window.alert('이메일 형식이 맞지 않습니다!')
        return
      }

      if (pwd !== pwd_check) {
        window.alert('패스워드와 패스워드 확인이 일치하지 않습니다!')
        return
      }

      dispatch(userActions.signupFB(id, pwd, is_owner))
    }

    const handleChange = e => {
      setisOwner(!is_owner)
    }

    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component='h1' variant='h5'>
            회원가입
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='fname'
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='이메일을 입력해주세요.'
                  onChange={e => {
                    setId(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='lstNamea'
                  label='닉네임을 입력해주세요.'
                  name='nickname'
                  onChange={e => {
                    setUserName(e.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='비밀번호를 입력해주세요.'
                  type='password'
                  id='password'
                  onChange={e => {
                    setPwd(e.target.value)
                  }}
                />
                <Grid item xs={12}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    name='password'
                    label='비밀번호를 다시 입력해주세요.'
                    type='password'
                    id='password'
                    onChange={e => {
                      setPwdCheck(e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value='userRole'
                        color='primary'
                        checked={is_owner}
                        onChange={handleChange}
                      />
                    }
                    label='기업 회원입니다.'
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={signup}
              >
                Sign Up
              </Button>
              {/* <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='#' variant='body2'>
                    계정이 있으십니까? 로그인
                  </Link>
                </Grid>
              </Grid> */}
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}

export default Signup

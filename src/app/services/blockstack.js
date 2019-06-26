import { UserSession, AppConfig } from 'blockstack'
import { configure } from 'radiks'

// helpful for debugging
const logAuth = process.env.NODE_ENV === 'development' && true // set to true to turn on logging
const clog = (...args) => logAuth && console.log(...args)
// helpful for debugging

const appConfig = new AppConfig(
  ['store_write'],
  typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:8000',
  '/app',
  '/manifest.webmanifest'
)
const userSession = new UserSession({ appConfig })

configure({
  apiServer: 'http://localhost:1260',
  userSession,
})

export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && userSession.isUserSignedIn() ? userSession.loadUserData() : {}

export const isSignedIn = () => isBrowser() && userSession.isUserSignedIn

export const handleLogin = callback => {
  clog('isLoggedIn check', userSession.isUserSignedIn())
  if (userSession.isUserSignedIn()) {
    clog('logged in')
    callback(getUser())
  } else if (userSession.isSignInPending()) {
    userSession.handlePendingSignIn().then(userData => {
      callback(userData)
    })
  } else {
    userSession.redirectToSignIn()
  }
}

export const checkIsSignedIn = () => {
  if (!isBrowser()) {
    clog('Not a browser')
    return Promise.resolve(false)
  }
  if (userSession.isSignInPending()) {
    return userSession.handlePendingSignIn().then(userData => true)
  } else if (userSession.isUserSignedIn()) {
    const user = userSession.loadUserData()
    clog('isLoggedIn check', { user })
    return Promise.resolve(!!user)
  } else {
    clog('isLoggedIn check - nothing')
    return Promise.resolve(false)
  }
}

export const logout = callback => {
  userSession.signUserOut('/app/login')
  callback()
}

export const encryptContent = message => {
  console.log('encrypting ' + message)
  return userSession.encryptContent(message)
}

export const loadMyData = () => {
  return userSession.getFile('content').then(content => {
    if (content) {
      return JSON.parse(content)
    } else {
      return {}
    }
  })
}

export const saveAppData = (identifier, content) => {
  return userSession.putFile(`apps/${identifier}`, JSON.stringify(content))
}

export const loadAppData = identifier => {
  return userSession.getFile(`apps/${identifier}`).then(content => {
    if (content) {
      return JSON.parse(content)
    } else {
      return {}
    }
  })
}

export const saveMyData = content => {
  return userSession.putFile('content', JSON.stringify(content))
}

export const postUserUpdate = async (visibility, userComment) => {
  await userComment.save()
  return null
}

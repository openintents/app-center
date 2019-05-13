import {UserSession, AppConfig} from 'blockstack'

// helpful for debugging
const logAuth = process.env.NODE_ENV === 'development' && true // set to true to turn on logging
const clog = (...args) => logAuth && console.log(...args)
// helpful for debugging

const appConfig = new AppConfig(["store_write"], window.location.origin, "/app", "/manifest.webmanifest")
const userSession = new UserSession({appConfig})

export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && userSession.isUserSignedIn() ?
    userSession.loadUserData()
    : {}

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
  userSession.signUserOut("/app/login")
  callback()
}

export const encryptContent = (message) => {
  console.log("encrypting " + message)
  return userSession.encryptContent(message)
}

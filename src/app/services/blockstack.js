import { UserSession, AppConfig } from 'blockstack'
import { configure, getConfig, User, GroupMembership } from 'radiks'
import { RADIKS_SERVER_URL } from '../../components/constants'

// helpful for debugging
const logAuth = process.env.NODE_ENV === 'development' // set to true to turn on logging
const clog = (...args) => logAuth && console.log(...args)
// helpful for debugging

const appConfig = new AppConfig(
  ['store_write', 'publish_data'],
  typeof window !== 'undefined'
    ? window.location.origin
    : 'http://localhost:8000',
  '/',
  '/manifest.webmanifest'
)
const uSession = new UserSession({ appConfig })

configure({
  apiServer: RADIKS_SERVER_URL,
  userSession: uSession,
})

export const getApiServer = () => getConfig().apiServer

export const getPersonalKey = () => JSON.stringify(User.currentUser())

export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () => {
  const { userSession } = getConfig()
  return isBrowser() && userSession.isUserSignedIn()
    ? userSession.loadUserData()
    : {}
}

export const isSignedIn = () => {
  const { userSession } = getConfig()
  return isBrowser() && userSession.isUserSignedIn()
}

export const handleLogin = callback => {
  const { userSession } = getConfig()
  clog('isLoggedIn check', userSession.isUserSignedIn())

  if (userSession.isUserSignedIn()) {
    clog('logged in')
    callback(getUser())
  } else if (userSession.isSignInPending()) {
    userSession.handlePendingSignIn().then(userData => {
      User.createWithCurrentUser().then(() => {
        console.log('user created')
        callback(userData)
      })
    })
  } else {
    userSession.redirectToSignIn()
  }
}

export const redirectToSignIn = redirectUri => {
  const { userSession } = getConfig()
  userSession.redirectToSignIn(redirectUri)
}

export const checkIsSignedIn = () => {
  if (!isBrowser()) {
    clog('Not a browser')
    return Promise.resolve(false)
  }
  const { userSession } = getConfig()
  if (userSession.isUserSignedIn()) {
    return Promise.resolve(true)
  } else if (userSession.isSignInPending()) {
    return userSession.handlePendingSignIn().then(() => {
      return User.createWithCurrentUser().then(() => {
        window.history.replaceState(
          '',
          document.title,
          window.location.pathname
        )
        return true
      })
    })
  } else {
    clog('isLoggedIn check - nothing')
    return Promise.resolve(false)
  }
}

export const logout = callback => {
  const { userSession } = getConfig()
  GroupMembership.clearStorage()
  userSession.signUserOut('/')
  callback()
}

export const encryptContent = message => {
  const { userSession } = getConfig()
  console.log('encrypting ' + message)
  return userSession.encryptContent(message)
}

export const loadMyData = () => {
  const { userSession } = getConfig()
  return userSession.getFile('content').then(content => {
    if (content) {
      return JSON.parse(content)
    } else {
      return {}
    }
  })
}

export const saveAppData = (identifier, content) => {
  const { userSession } = getConfig()
  return userSession.putFile(`apps/${identifier}`, JSON.stringify(content))
}

export const loadAppData = identifier => {
  const { userSession } = getConfig()
  return userSession.getFile(`apps/${identifier}`).then(content => {
    if (content) {
      return JSON.parse(content)
    } else {
      return {}
    }
  })
}

export const saveMyData = content => {
  const { userSession } = getConfig()
  return userSession.putFile('content', JSON.stringify(content))
}

export const postUserUpdate = async (visibility, userComment) => {
  if (visibility === 'public') {
    await userComment.save()
  } else if (visibility === 'private') {
    await userComment.savePrivately()
  } else if (visibility === 'devs') {
    throw new Error('not yet implemented')
  }

  return null
}

export const getAuthorsFromManifest = async appDomain => {
  let manifestURI = appDomain + '/manifest.webmanifest'
  let response
  try {
    response = await fetch(manifestURI)
  } catch (e) {
    manifestURI = appDomain + '/manifest.json'
    response = await fetch(manifestURI)
  }
  if (response) {
    const responseJSON = JSON.parse(response.text())
    return responseJSON["did_authors"]
  } else {
    return null
  }
}

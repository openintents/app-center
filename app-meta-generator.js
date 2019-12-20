const nofetch = require('nofetch')
const fs = require('fs')
const blockstack = require('blockstack')
const unlistedApps = require('./unlisted-apps')
const appMeta = require('./src/data/app-meta')
const csvtojson = require('csvtojson')

var appPublishers = [
  { username: 'jehunter5811.id', apps: [216, 1748, 1538, 934] },
  { username: 'antonio.id', apps: [1087] },
  { username: 'kkomaz.id', apps: [955] },
  { username: 'markmhendrickson.id', apps: [1041] },
  { username: 'mabdou.id', apps: [1318] },
  { username: 'dmail.id', apps: [1318] },
  { username: 'kartikspringrole.id.blockstack', apps: [176] },
  { username: 'tautvilas.id.blockstack', apps: [865] },
  { username: 'w3bwizart.id.blockstack', apps: [1832] },
  { username: 'marcojrfurtado.id.blockstack', apps: [1529] },
  { username: 'wilsonbright.id.blockstack', apps: [1571] },
  {
    username: 'viraj100.id.blockstack',
    apps: [1569, 1707, 1839, 1846, 1870, 1893],
  },
  { username: 'benedicteraae.id.blockstack', apps: [1858] },
  { username: 'kevinnth.id.blockstack', apps: [1459] },
  { username: 'codedarkin.id.blockstack', apps: [1869] },
  { username: 'alexsopinka.id.blockstack', apps: [1464] },
  { username: 'stealthy.id', apps: [174, 1445] },
  { username: 'juliet_oberding.id.blockstack', apps: [1720] },
  { username: 'friedger.id', apps: [676, 924, 1062, 1444, 1754] },
  { username: 'psgganesh.id.blockstack', apps: [1766] },
  { username: 'brandon100.id.blockstack', apps: [1729] },
  { username: 'ayushsubedi.id.blockstack', apps: [1595] },
  { username: 'dylanbathurst.id.blockstack', apps: [1855] },
  { username: 'njordhov.id.blockstack', apps: [1723] },
  { username: 'russfranky.id.blockstack', apps: [1250] },
  { username: 'talhasch.id.blockstack', apps: [1183, 2064] },
  { username: 'suvorovalex.id.blockstack', apps: [2083] },
  { username: 'jefreybulla.id.blockstack', apps: [1350] },
  { username: 'david.id', apps: [2098] },
  { username: 'sdsantos.id.blockstack', apps: [1453] },
  { username: 'joaodiogocosta.id.blockstack', apps: [1453] },
  { username: 'claudiaacabado.id.blockstack', apps: [1453] },
  { username: 'jorishermans.blockstack.id', apps: [] },
  {
    username: 'arcane.id',
    apps: [
      1712,
      1713,
      1714,
      1715,
      1716,
      1717,
      1895,
      1896,
      2109,
      2110,
      2111,
      2112,
      2113,
      2114,
    ],
  },
]

async function fetchProfile(p) {
  return blockstack
    .lookupProfile(p.username)
    .then(profile => {
      return {
        ...p,
        profile,
      }
    })
    .catch(e => {
      return {
        ...p,
        profile: {
          name: p.username,
        },
      }
    })
}

function log(url, msg) {
  if (url.indexOf('xxxxxxxxx') >= 0) {
    console.log(url, msg)
  }
}
async function fetchManifest(manifestUrl) {
  log('trying ' + manifestUrl)
  var manifest
  try {
    response = await nofetch(manifestUrl, { timeout: 50000 })
  } catch (e) {
    log(manifestUrl, e)
    response = { status: e }
  }

  if (response.status != 200) {
    log(manifestUrl, response.status)
    manifestUrl = null
  } else {
    try {
      manifest = await response.json()
    } catch (e) {
      log(manifestUrl, e)
      manifest = { start_url: undefined }
    }
  }
  return { manifestUrl, manifest }
}

async function findManifestData(domain) {
  var manifestUrl = domain + 'manifest.json'

  var manifestData = await fetchManifest(manifestUrl)
  if (!manifestData.manifestUrl) {
    manifestUrl = domain + 'manifest.webmanifest'
    manifestData = await fetchManifest(manifestUrl)
  }
  if (!manifestData.manifestUrl) {
    manifestUrl = domain + 'static/manifest.json'
    manifestData = await fetchManifest(manifestUrl)
  }
  if (!manifestData.manifestUrl) {
    manifestUrl = domain + 'manifest_blockstack.json'
    manifestData = await fetchManifest(manifestUrl)
  }
  return manifestData
}

function getNossReason(domain, openSourceUrl) {
  const nossReasonList = appMeta.noss
    .filter(d => d.normalizedWebsite == domain)
    .map(entry => {
      if (entry.noss != openSourceUrl) {
        console.log(`invalid noss ${domain} ${entry.noss} != ${openSourceUrl}`)
        return undefined
      } else {
        return entry.reason
      }
    })

  let nossReason = null
  if (nossReasonList.length > 0 && nossReasonList[0]) {
    nossReason = nossReasonList[0]
  }
  return nossReason
}

function getAndroid(normalizedWebsite) {
  const androidList = appMeta.android
    .filter(app => app.normalizedWebsite == normalizedWebsite)
    .map(app => app.package)
  if (androidList.length > 0 && androidList[0]) {
    return androidList[0]
  } else {
    return undefined
  }
}

async function getNilDimensions(appcoid) {
  const results = await csvtojson()
    .fromFile('./review-results-2019-10.csv')
    .then(resultJSON =>
      resultJSON.find(app => {
        return app['App Id'] == new String(appcoid)
      })
    )
  if (results != null) {
    return { gaia: parseInt(results.Gaia), auth: parseInt(results.Auth) }
  }
  return {}
}

function normalizeDomain(website) {
  if (!website.endsWith('/')) {
    return website + '/'
  } else {
    return website
  }
}

async function getAppMeta(app) {
  var domain = app.website.trim()
  const openSourceUrl = app.openSourceUrl

  if (domain == 'https://sarchy.co/TrustingTrust/pc/index.html') {
    domain = 'https://sarchy.co/'
  } else if (domain == 'https://blockusign.co/signup.html') {
    domain = 'https://blockusign.co/'
  } else if (domain == 'https://cryptocracy.io/') {
    domain = 'https://dapp.cryptocracy.io/'
  } else if (domain == 'https://getatomichabits.com/home/') {
    domain = 'https://getatomichabits.com/'
  } else if (domain == 'https://timestack.app') {
    domain = 'https://my.timestack.app/'
  } else if (domain == 'https://dotpodcast.co/') {
    domain = 'https://player.dotpodcast.co/'
  } else if (domain == 'https://piara.me') {
    domain = 'https://auth.piara.me/'
  } else if (domain == 'https://crosscheck.paradigma.global/') {
    domain = 'https://dappcrosscheck.paradigma.global/'
  } else if (domain == 'http://www.blockcred.io/') {
    domain = 'https://www.blockcred.io/'
  } else if (domain == 'http://invoice.x5engine.com') {
    domain = 'https://invoice.x5engine.com'
  }
  const normalizedWebsite = normalizeDomain(domain)

  if (!domain.startsWith('https://')) {
    const nossReason = getNossReason(normalizedWebsite, openSourceUrl)
    const android = getAndroid(normalizedWebsite)
    const meta = {
      id: app.id,
      authors: [],
      manifestUrl: '',
    }
    if (nossReason) {
      meta.nossReason = nossReason
    }
    if (android) {
      meta.android = android
    }
    return meta
  }

  var manifestData

  const authDomains = appMeta.authDomains.filter(
    d => d.normalizedWebsite == normalizedWebsite
  )
  if (authDomains.length > 0) {
    const manifestUrl = authDomains[0].manifestUrl
    if (manifestUrl) {
      manifestData = await fetchManifest(manifestUrl)
    } else {
      manifestData = { error: authDomains[0].error }
    }
  } else {
    manifestData = await findManifestData(normalizedWebsite)
    if (!manifestData.manifestUrl) {
      if (normalizedWebsite.indexOf('www.') >= 0) {
        const domain2 = normalizedWebsite.replace('www.', 'app.')
        manifestData = await findManifestData(domain2)
      }
    }
    if (!manifestData.manifestUrl) {
      if ((normalizedWebsite.match(/\./g) || []).length == 1) {
        const domain2 = normalizedWebsite.replace('://', '://app.')
        manifestData = await findManifestData(domain2)
      }
    }
    if (!manifestData.manifestUrl) {
      if (normalizedWebsite.indexOf('://about.') >= 0) {
        const domain2 = normalizedWebsite.replace('://about.', '://')
        manifestData = await findManifestData(domain2)
      }
    }
  }

  var dids = []
  if (manifestData.manifestUrl) {
    const arr = manifestData.manifestUrl.split('/')
    const didConfiguration =
      arr[0] + '//' + arr[2] + '/.well-known/did-configuration'
    dids = await nofetch(didConfiguration)
      .then(r => r.json())
      .then(response => {
        // TODO verify entries
        console.log(`found did configuration for ${manifestData.manifestUrl}`)
        return response.entries.map(entry => entry.did)
      })
      .catch(err => {
        return []
      })
  }

  var authors = []
  if (!manifestData.manifestUrl) {
    if (manifestData.error) {
      console.log(
        'no manifest found for ' + app.website + ' (' + manifestData.error + ')'
      )
    } else {
      console.log(
        '*** no manifest found for ' + app.website + ' ' + normalizedWebsite
      )
    }
  } else if (manifestData.manifest) {
    let didAuthors
    if (dids.length > 0) {
      didAuthors = dids
    } else if (Array.isArray(manifestData.manifest.did_authors)) {
      didAuthors = manifestData.manifest.did_authors
    } else if (
      typeof manifestData.manifest.did_authors === 'string' ||
      manifestData.manifest.did_authors instanceof String
    ) {
      didAuthors = [manifestData.manifest.did_authors]
    } else {
      if (manifestData.manifest.did_authors) {
        console.log(`invalid did_authors ${manifestData.manifest.did_authors}`)
      }
      didAuthors = []
    }
    authors = await Promise.all(
      didAuthors.map(async a => {
        var address
        if (a.startsWith('did:stack:')) {
          if (a.startsWith('did:stack:v0:ID-')) {
            address = address = a.substr(16)
          } else {
            address = await nofetch(`https://core.blockstack.org/v1/dids/${a}`)
              .then(r => r.json())
              .then(response => {
                const publicKey = response.public_key
                return blockstack.publicKeyToAddress(publicKey)
              })
              .catch(e => console.log(`address lookup failed for ${a}: ${e}`))
          }
        } else if (a.startsWith('did:btc-addr:')) {
          address = a.substr(13)
        } else {
          if (a.indexOf('.') > 0) {
            addPublisher(a, app.id)
          }
          return Promise.resolve(a)
        }
        console.log('get names for address ' + address)
        return await nofetch(
          `https://core.blockstack.org/v1/addresses/bitcoin/${address}`
        )
          .then(r => r.json())
          .then(async response => {
            if (Array.isArray(response.names)) {
              response.names.forEach(async n => {
                addPublisher(n, app.id)
              })
            }
            if (response.names && response.names.length > 0) {
              return response.names[0]
            } else {
              return a
            }
          })
          .catch(err => console.log(`name lookup failed for ${address}`, err))
      })
    )
  }

  const nossReason = getNossReason(normalizedWebsite, openSourceUrl)
  const android = getAndroid(normalizedWebsite)
  const nilDimensions = await getNilDimensions(app.id)

  const meta = {
    id: app.id,
    authors: authors,
    manifestUrl: manifestData.manifestUrl || '',
    nilDimensions: nilDimensions || {},
    dids,
  }

  if (nossReason) {
    meta.nossReason = nossReason
  }

  if (android) {
    meta.android = android
  }
  return meta
}

console.log('start')

let useCache = false
process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val)
  if (val === '--cached') {
    useCache = true
  }
})

// use live data

let appcoDataPromise = fetch('https://api.app.co/api/app-mining-apps')
  .then(r => r.json())
  .then(response => {
    fs.writeFile('appco.json', JSON.stringify(response), err => {
      console.log('written appco.json', err)
    })
    return response
  })

// use cached data
if (useCache) {
  const appcoData = require('./appco.json')
  appcoDataPromise = Promise.resolve(appcoData)
}

appcoDataPromise.then(appcoData => {
  const allApps = appcoData.apps.concat(unlistedApps.apps)

  Promise.all(
    allApps.map(async app => {
      return getAppMeta(app)
    })
  ).then(metaData => {
    mergeAppPublishers().then(publishers => {
      fs.writeFile(
        'src/data/app-publishers.json',
        JSON.stringify(publishers),
        err => {
          console.log('written app-publishers', err)
        }
      )

      metaData = updateMetaData(metaData, publishers)

      fs.writeFile(
        'src/data/app-meta-data.json',
        JSON.stringify(metaData),
        err => {
          console.log('written app-meta-data', err)
        }
      )
    })
  })
})

function addPublisher(username, appcoid) {
  appPublishers.push({ username, apps: [appcoid] })
}

async function mergeAppPublishers() {
  mergedPublishers = {}
  appPublishers.forEach(publisher => {
    if (mergedPublishers.hasOwnProperty(publisher.username)) {
      const apps = mergedPublishers[publisher.username].apps
      const moreApps = publisher.apps.filter(
        appcoid => apps.indexOf(appcoid) < 0
      )
      mergedPublishers[publisher.username].apps = apps.concat(moreApps)
    } else {
      mergedPublishers[publisher.username] = publisher
    }
  })
  return Promise.all(
    Object.values(mergedPublishers).map(publisher => {
      return fetchProfile(publisher)
    })
  )
}

function updateMetaData(metaData, publishers) {
  metaData.forEach(m => {
    m.authors = m.authors.concat(
      publishers
        .filter(
          p => p.apps.indexOf(m.id) >= 0 && m.authors.indexOf(p.username) < 0
        )
        .map(p => p.username)
    )
  })
  return metaData
}

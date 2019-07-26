const express = require('express')
const { decorateApp } = require('@awaitjs/express')
const constants = require('radiks-server/lib/lib/constants')

const makeApiController = db => {
  const Router = decorateApp(express.Router())
  const radiksData = db.collection(constants.default.COLLECTION)

  Router.getAsync('/usercomments', async (req, res) => {
    const comments = await radiksData
      .find({
        radiksType: 'UserComment',
      })
      .toArray()
    res.json(comments)
  })

  Router.getAsync('/ownercomments', async (req, res) => {
    const comments = await radiksData
      .find({
        radiksType: 'OwnerComment',
      })
      .toArray()
    res.json(comments)
  })

  return Router
}

module.exports = makeApiController

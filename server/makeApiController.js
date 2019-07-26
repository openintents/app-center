const express = require('express')
const { decorateApp } = require('@awaitjs/express')
const constants = require('radiks-server/lib/lib/constants')

const makeApiController = db => {
  const Router = decorateApp(express.Router())
  const radiksData = db.collection(constants.default.COLLECTION)

  Router.getAsync('/usercomments', async (req, res) => {
    const comments = await radiksData
      .aggregate([
        { $match: { radiksType: 'UserComment' } },
        { $sort: { object: 1, username: 1, createdAt: -1 } },
        {
          $group: {
            _id: { object: '$object', username: '$username' },
            object: { $first: '$object' },
            username: { $first: '$username' },
            createdAt: { $first: '$createdAt' },
            comment: { $first: '$comment' },
            rating: { $first: '$rating' },
          },
        },
        { $sort: { createdAt: -1 } },
      ])
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

  Router.getAsync('/ratings', async (req, res) => {
    const comments = await radiksData
      .aggregate([
        { $match: { radiksType: 'UserComment', rating: { $gt: 0, $lte: 5 } } },
        { $sort: { object: 1, username: 1, createdAt: -1 } },
        {
          $group: {
            _id: { object: '$object', username: '$username' },
            rating: { $first: '$rating' },
          },
        },
        {
          $group: {
            _id: '$_id.object',
            avgRating: { $avg: '$rating' },
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()
    res.json(comments)
  })

  return Router
}

module.exports = makeApiController

const express = require('express');
const request = require('request-promise');
const { decorateApp } = require('@awaitjs/express');
const { COLLECTION } = require('radiks-server/app/lib/constants');


const makeApiController = (db) => {
  const Router = decorateApp(express.Router());
  const radiksData = db.collection(COLLECTION);

  Router.getAsync('/usercomments', async (req, res) => {
    const comments = await radiksData
      .find(
        {
          radiksType: 'UserComment',
        },
        // {
        //   projection: { rating: 1 },
        // }
      )
      .toArray();
      // console.log('all comments',comments);
    res.json(comments);
  });

  Router.getAsync('/ownercomments', async (req, res) => {
    const comments = await radiksData
      .find(
        {
          radiksType: 'UserComment',
        },
        // {
        //   projection: { rating: 1 },
        // }
      )
      .toArray();
      // console.log('all comments',comments);
    res.json(comments);
  });


  return Router;
};

module.exports = makeApiController;

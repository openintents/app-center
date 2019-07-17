const express = require('express');
const cors = require('cors')
const expressWS = require('express-ws');
const { setup } = require('radiks-server');
import {
  UserComment,
  OwnerComment
} from '../src/components/model'
const makeApiController = require('./makeApiController');

const app = express();
expressWS(app)

app.use(cors())


var server = require('http').Server(app),

port = process.env.PORT || 5000;
server.listen(port);

console.log("listening to port ", port);


setup({
    mongoDBUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/radiks-server'
}).then((RadiksController) => {
    app.use('/radiks', RadiksController);
    app.use('/api', makeApiController(RadiksController.DB));
    app.use(express.static('public'))
    console.log("Radiks server live")
});

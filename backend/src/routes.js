import express from 'express';
import cors from 'cors';
import path from 'path';
import Player from './models/Player';

const server = express();
const root = path.join(__dirname, '..');
const apiRouter = express.Router()

server.use('/api/pictures', express.static(path.join(root, 'public', 'pictures')));
server.use('/api', apiRouter);

const corsOptions = {
  origin: 'http://localhost:4000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// Router for getting the json data.
apiRouter.route('/data').get(cors(corsOptions), (req, res) => {
  Player.find().then((playersdb) => {
    res.send(playersdb);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

apiRouter.route('/data/:uuid').get(cors(corsOptions), (req, res) => {
  Player.findOne({ uuid: req.params.uuid }).then((player) => {
    res.send(player);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

export default server;

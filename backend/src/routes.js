import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import Player from './models/Player';

const root = path.join(__dirname, '..');
// Picture upload configuration
const storage = multer.diskStorage({
  destination: path.join(root, 'public', 'pictures'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });
const server = express();
server.use(cors());
server.options('*', cors())

// Body parser middleware to retrieve data from POST requests
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const apiRouter = express.Router()
server.use('/api/pictures', express.static(path.join(root, 'public', 'pictures')));
server.use('/api', apiRouter);

// Router for getting the json data.
apiRouter.route('/data').get(cors(), (req, res) => {
  Player.find().then((playersdb) => {
    res.send(playersdb);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

// Router to upload the player's information to the database
apiRouter.route('/data').post(cors(), (req, res) => {
  const newPlayer = new Player({
    ...req.body
  });

  newPlayer.save((err, doc) => {
    if (!err) {
      res.status(200).send('New player successfully saved on database!');
    } else {
      res.status(500).send(err);
    }
    res.end();
  });
});

// Router to update the player's information to the database
apiRouter.route('/update').post(cors(), (req, res) => {
  console.log('req.body:', req.body);
  // const value = req.body.attribute === 'previousClubs'
  //   ? []
  //   : req.body.value;
  Player.findOne({ uuid: req.body.uuid }).then((doc) => {
    console.log('doc:', doc);
    if (req.body.attribute === 'previousClubs') {
      doc.previousClubs[req.body.index] = req.body.value;
    } else {
      doc[req.body.attribute] = req.body.value;
    }
    doc.save();
  // })
  // Player.updateOne({ uuid: req.body.uuid }, {
  //   [req.body.attribute]: req.body.value,
  }).then(() => {
    res.status(200).send('Player data successfully updated!');
    // res.send(req.body);
    res.end();
  });
});

// Router to upload the player's picture to the backend's "pictures" folder
apiRouter.route('/picture').post(cors(), upload.single('image'), (req, res) => {
  res.status(200).send('New player picture successfully uploaded!');
  res.end();
});

// Router to get the data of a specific player from its uuid
apiRouter.route('/data/:uuid').get(cors(), (req, res) => {
  Player.findOne({ uuid: req.params.uuid }).then((player) => {
    res.send(player);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

export default server;

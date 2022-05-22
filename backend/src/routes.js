import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import multer from 'multer';
import Player from './models/Player';

const root = path.join(__dirname, '..');
const storage = multer.diskStorage({
  destination: path.join(root, 'public', 'pictures'),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
// const upload = multer({ dest: path.join(root, 'public', 'pictures') });
const upload = multer({ storage });
const server = express();
server.use(cors());
server.options('*', cors())
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const apiRouter = express.Router()
server.use('/api/pictures', express.static(path.join(root, 'public', 'pictures')));
server.use('/api', apiRouter);

// const corsOptions = {
//   origin: 'http://localhost:4000',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// Router for getting the json data.
// apiRouter.route('/data').get(cors(corsOptions), (req, res) => {
apiRouter.route('/data').get(cors(), (req, res) => {
  Player.find().then((playersdb) => {
    res.send(playersdb);
  }).catch((error) => {
    console.log('Log here!');
    res.status(500).send(error);
  });
});

// apiRouter.route('/data').post(cors(corsOptions), (req, res) => {
apiRouter.route('/data').post(cors(), (req, res) => {
  console.log('req.body:', req.body);
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
  // res.send(req.body);
  // res.end();
});

  // apiRouter.route('/picture').post(cors(), upload.array('image'), (req, res) => {
apiRouter.route('/picture').post(cors(), upload.single('image'), (req, res) => {
  res.status(200).send('New player picture successfully uploaded!');
  // res.send(req.files);
  res.end();
});

// apiRouter.route('/data/:uuid').get(cors(corsOptions), (req, res) => {
apiRouter.route('/data/:uuid').get(cors(), (req, res) => {
  Player.findOne({ uuid: req.params.uuid }).then((player) => {
    res.send(player);
  }).catch((error) => {
    res.status(500).send(error);
  });
});

export default server;

import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  previousClubs: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
  },
});
const Player = mongoose.model('Player', PlayerSchema);

export default Player;

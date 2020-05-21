import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

var movieSchema = new Schema({
  imdb: { type: String, required: false, unique: true },
  title: { type: String },
  year: { type: Number },
  synopsis: { type: String },
  released: { type: String },
  torrent: { type: Object },
  genres: { type: Array, default: [] },
  banner: { type: String },
  rating: { type: Object },
  comments: { type: [commentsSchema], default: [] },
  watched_by: { type: Array, default: [] },
  actors: { type: Array },
  writer: { type: Array },
  director: { type: Array },
  runtime: { type: String },
  seeds: { type: Number },
  found_with: { type: String },
  last_view: { type: Date },
  path: { type: Array, default: []}
});

export default mongoose.model('Movie', movieSchema)
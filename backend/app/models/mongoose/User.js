import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  first_name: { type: String },
  github_id: { type: String },
  id_42: { type: String },
  last_name: { type: String },
  mail: { type: String },
  date: { type: Date, default: Date.now },
  lang: { type: String, default: 'en'},
  profile_pic: { type: String },
  password: { type: String },
  reset_code: { type: String }
});

export default mongoose.model('User', userSchema)
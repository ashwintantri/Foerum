import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Sentiment = require('sentiment');
var sentiment = new Sentiment();
const CommentsSchema = new Schema({
    author: String,
    text: String,
    sentiment: Number
},{timestamps:true});

export default mongoose.model('Comment',CommentsSchema);

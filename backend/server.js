import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import Comment from './models/comment';
const Sentiment = require('sentiment');
var sentiment = new Sentiment();

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
mongoose.connect("mongodb://dbuser:dbpass@ds245661.mlab.com:45661/restful",{useNewUrlParser:true});
//(creds frome prev commit wont work!)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
router.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});
router.get('/comments',(req,res)=>{
    Comment.find((err,comments)=>{
        if(err) return res.json({success:false,error:err});
        else {
          comments.forEach((comment) => console.log(comment.sentiment));
          return res.json({success:true,data:comments});
        }
    });
});
router.post('/comments',(req,res)=>{
    const comment = new Comment();
    const {author, text} = req.body;
    if(!author||!text)
    {
        return res.json({
            success:false,
            error:'You must provide author and comment'
        });
    }
    comment.author = author;
    comment.text = text;
    comment.sentiment = sentiment.analyze(comment.text).score;
    comment.save(err=>{
        if(err) return res.json({success:false,error:err});
        return res.json({success:true});
    });
});
router.put('/comments/:commentId',(req,res)=>{
    const {commentId} = req.params;
    if(!commentId){
    return res.json({ success: false, error: 'No comment id provided' });
  }
    Comment.findById(commentId,(error,comment)=>{
        if(error) return res.json({ success: false, error });
        const {author,text} = req.body;
        if(author) comment.author = author;
        if(text) comment.text = text;
        comment.save(error=>{
            if (error) return res.json({ success: false, error });
            return res.json({ success: true });
        });
    });
});
router.delete('/comments/:commentId', (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    return res.json({ success: false, error: 'No comment id provided' });
  }
  Comment.remove({ _id: commentId }, (error, comment) => {
    if (error) return res.json({ success: false, error });
    return res.json({ success: true });
  });
});
app.use('/api', router);
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

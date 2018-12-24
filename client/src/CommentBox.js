import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from './data';
import './CommentBox.css';
export default class CommentBox extends Component {
    constructor(props)
    {
        super(props);
        this.state = {data:[]};
    }
  render() {
    return (
      <div className = "container">
        <div className = "comments">
            <h2>Comments:</h2>
            <CommentList data = {DATA}/>
        </div>       
        <div className = "form">
            <CommentForm />
        </div>
      </div>
    )
  }
}

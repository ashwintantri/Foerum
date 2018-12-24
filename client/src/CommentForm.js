import React from 'react';
import PropTypes from 'prop-types';
const CommentForm = (props)=>{
    return (
      <div>
        <form onSubmit={props.submitContent}>
            <input type="text" name="author" placeholder="Your name" value={props.author} onChange={props.handleChangeText}/> 
            <input type="text" name="text" placeholder="Your views" value={props.text} onChange={props.handleTextChange}/> 
            <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
CommentForm.propTypes = {
        submitComment: PropTypes.func.isRequired,
        handleChangeText: PropTypes.func.isRequired,
        text: PropTypes.string,
        author: PropTypes.string,
    };
CommentForm.defaultProps = {
        text: '',
        author: '',
    };

export default CommentForm;
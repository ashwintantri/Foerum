import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const Comment = (props) => {
    return (
      <div className = "singleComment">
        <img alt="user_img" className="userImage" src = {`https://picsum.photos/70?random=${props.id}`}/>
        <div className="textContent">
            <div className="singleCommonContent">
                <h3>{props.author}</h3>
                <ReactMarkdown source={props.children}/>
            </div>
            <div className="singleCommentButtons"></div>
        </div>
      </div>
    );
  }
Comment.propTypes = {
        author: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired
    };

export default Comment;
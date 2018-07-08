import React, { Component } from 'react';
import './BlogShow.css';

class BlogShow extends Component {

  enableEditing = () => {
    this.props.enableEditing(this.props.blog.id);
  }

  handleDelete = () => {
    this.props.handleDelete(this.props.blog.id);
  }

  handleShow = () => {
    this.props.handleShow(this.props.blog.id);
  }

  render () {
    return(
      <div className="container">
      <div className="card">
        <h5 className="card-header">
          {this.props.blog.title}
        </h5>
        <div className="card-body">
          <p className="card-text">
            {this.props.blog.body}
          </p>
          <hr />
          <button type="button" onClick={this.enableEditing} className="btn btn-primary btnspace" >
            Edit
          </button>
          <button type="button" onClick={this.handleDelete} className="btn btn-danger btnspace" >
            Delete
          </button>
          <button type="button" onClick={this.handleShow} className="btn btn-secondary btnspace" >
            Back
          </button>
        </div>
      </div>
      </div>
    );
  }
}

export default BlogShow;
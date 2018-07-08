import React, { Component } from 'react';
import './Blog.css';

class Blog extends Component {

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
        <div className="col-md-4">
          <div className="card mb-4 box-shadow">
            <div className="card-header alert alert-primary">
              <h3 className="my-0 font-weight-normal">
                {this.props.blog.title}
              </h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                {this.props.blog.body}
              </p>
              <button type="button" className="btn btn-info btnspace1 btn-sm" onClick={this.handleShow}>
                Show
              </button>
              <button type="button" className="btn btn-primary btnspace1 btn-sm" onClick={this.enableEditing}>
                Edit
              </button>
              <button type="button" className="btn btn-danger btnspace1 btn-sm" onClick={this.handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
    )
  }
}

export default Blog;
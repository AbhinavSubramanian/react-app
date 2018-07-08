import React, { Component } from 'react';

class BlogEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.blog.title,
      body: this.props.blog.body
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    this.props.handleEdit(this.state.title, this.state.body, this.props.blog.id);
  }

  handleBack = () => {
    this.props.handleBack();
  }

  render() {
    return (
      <div className="col-md-4">
        <form onSubmit={
          (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleSubmit();
          }
        }>
          <div className="card mb-4 box-shadow">
            <div className="card-header">
              <h3 className="my-0 font-weight-normal">
                <input className='container' 
                 type="text"
                 name="title" 
                 placeholder='Enter a Title'
                 value={this.state.title} 
                 onChange={this.handleInput} 
                />
              </h3>
            </div>
            <div className="card-body">
              <p className="card-text">
                <textarea className='container' 
                    name="body"
                    placeholder='Enter the contents'
                    value={this.state.body} 
                    onChange={this.handleInput}
                >
                </textarea>
              </p>
              <input type="submit" value="submit" className="btn btn-lg btn-block btn-primary"/>
              <button onClick={this.handleBack} className="btn btn-lg btn-block btn-primary">
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default BlogEdit;
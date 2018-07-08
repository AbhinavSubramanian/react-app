import React, { Component } from 'react';
import $ from 'jquery';
import Blog from './Blog';
import BlogForm from './BlogForm';
import BlogEdit from './BlogEdit';
import BlogShow from './BlogShow';
import 'bootstrap/dist/css/bootstrap.min.css';

class BlogsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      showBlog: false,
      editID: null,
      checkShow: true,
      blog: []
    }
    this.newBlog = this.newBlog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.enableEditing = this.enableEditing.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: "http://localhost:3000/api/v1/blogs",
      type: "GET",
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        this.setState({blogs: result})
        console.log(this.state.blogs);
      }
    })
  }

  newBlog() {
    this.setState({ showBlog: !this.state.showBlog });
  }

  handleSubmit(title, body){
    $.ajax({
      url: "http://localhost:3000/api/v1/blogs",
      type: "POST",
      data: { blog: { title: title, body: body } },
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        this.setState({blogs: result})
        console.log(this.state.blogs);
      }
    })
    this.setState({ showBlog: !this.state.showBlog });
  }

  handleEdit(title, body, id){
    $.ajax({
      url: `http://localhost:3000/api/v1/blogs/${id}`,
      type: "PUT",
      data: { blog: { title: title, body: body } },
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        console.log(result);
        $.ajax({
          url: "http://localhost:3000/api/v1/blogs",
          type: "GET",
          context: this, // Allows us to use this.setState inside success
          success: function (result) {
            this.setState({blogs: result})
            console.log(this.state.blogs);
          }
        })
      }
    })
    this.setState({ editId: null });
  }

  enableEditing = (id) => {
    this.setState({editId: id});
  }

  handleBack = () => {
    this.setState({editId: null});
  }

  handleDelete(id){
    $.ajax({
      url: `http://localhost:3000/api/v1/blogs/${id}`,
      type: "DELETE",
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        this.setState({blogs: result, checkShow: true })
        console.log(this.state.blogs);
      }
    })
  }

  handleShow(id){
    $.ajax({
      url: `http://localhost:3000/api/v1/blogs/${id}`,
      type: "GET",
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        this.setState({blog: result})
        console.log(this.state.blog);
      }
    })
    this.setState({ checkShow: !this.state.checkShow })
  }

  render() {
    if(this.state.checkShow) {
      return (
      <div>
      <div className="container">
        {this.state.showBlog && <BlogForm handleSubmit={this.handleSubmit} />}
        <button onClick={this.newBlog} className="btn btn-lg btn-block btn-info col-md-2" >
          {this.state.showBlog ? 'Cancel' : 'New Blog' }
        </button>
        <hr />
        <div className="row">
          {this.state.blogs.map((blog) => {
            if(this.state.editId === blog.id) {
              return (
                <BlogEdit blog={blog}
                      key={blog.id}
                      handleEdit={this.handleEdit}
                      handleDelete={this.handleDelete}
                      handleBack={this.handleBack}
                />
              )
            } else {
              return (
                    <Blog blog={blog} 
                            key={blog.id} enableEditing={this.enableEditing}
                            handleDelete={this.handleDelete} 
                            handleShow={this.handleShow}
                    />
              )
            }
          })
          }
        </div>
        </div>
      </div>
      );
    }
    else {
      if(this.state.editId === this.state.blog.id) {
        return (
          <BlogEdit blog={this.state.blog}
                key={this.state.blog.id}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                handleBack={this.handleBack}
          />
        )
      } else {
        return (
          <div>
            <BlogShow blog={this.state.blog}
                  key={this.state.blog.id}
                  enableEditing={this.enableEditing}
                  handleShow={this.handleShow}
                  handleDelete={this.handleDelete}
            />      
          </div>
        );
      }  
    }    
  }
}

export default BlogsContainer;
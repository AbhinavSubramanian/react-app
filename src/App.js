import React, { Component } from 'react';
import './App.css';
import BlogsContainer from './BlogsContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Blogs</h1>
        </div>
        <BlogsContainer />
      </div>
    );
  }
}

export default App;

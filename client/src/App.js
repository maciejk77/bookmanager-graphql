import React, { Component } from 'react';
import BookList from '../src/components/BookList';

class App extends Component {
  render() {
    return (
      <div id="main">
        <h1>Reading List</h1>
        <BookList />
      </div>
    );
  }
}

export default App;

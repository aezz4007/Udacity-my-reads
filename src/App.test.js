import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/** 
 This course is not designed to teach Test Driven Development. 
 Feel free to use this file to test your application, but it 
 is not required.
**/

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

/* *** Class Definition of Components Template *** */
/*
import React from 'react';

class ClassName extends React.Component {
  render() {
    return(
      <p>ClassName</p>
    );
  }
}

export default ClassName;
*/


//This is to handle shlef changer
handleChange = (book, shelf) => {
  //Use API method
  BooksAPI.update(book, shelf)
  //handle the promise
  .then(res=>{
  //made successful changes to the shelf, that don't yet remain with page refresh
  book.shelf=shelf;
  //Moving the book to new shelf
  this.setState(state=>({
  books: state.books.filter(b=>b.id!==book.id).concat(book)
  }))
  })
  }
  
import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from '../Shelf';
import * as BooksAPI from '../../BooksAPI';

class MainPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  //Loads all books on my shelves on page load
  async componentDidMount () {
  const books = await BooksAPI.getAll()
    this.setState({books});  
}

/* This is to handle shlef changer. 
 * Passed down to the book component through props */
handleChange = (book, shelf) => {
  BooksAPI.update(book, shelf)
  .then(res=>{
  book.shelf=shelf;
  this.setState(state=>({
  books: state.books.filter(b=>b.id!==book.id).concat(book)
  }))
  })
  }
  

  render() {
    return(
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
        {/* My three shelves, books are filtered to be put on the right shelf */}
          <Shelf key="currentlyReading" shelfTitle="Currently Reading" books={this.state.books.filter(book => book.shelf === "currentlyReading")} handleChange={this.handleChange} /> 
          <Shelf key="wantToRead" shelfTitle="Want to Read" books={this.state.books.filter(book => book.shelf === "wantToRead")} handleChange={this.handleChange} />
          <Shelf key="read" shelfTitle="Read" books={this.state.books.filter(book => book.shelf === "read")} handleChange={this.handleChange} />
        </div>
      </div>
      <div className="open-search">
      {/* Here I can navigate to the search page */}
        <Link className="AddBook" to="/search">Add a book</Link>
      </div>
    </div>
    );
  }
}

export default MainPage;
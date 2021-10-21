import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../Book';
import { search } from '../../BooksAPI';
import * as BooksAPI from '../../BooksAPI';



class SearchPage extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            books: [],
            allBooks: [],
            shelf: []
        }
    }  
   
    
  //Loads all books on my shelves on page load
  async componentDidMount () {
    const allBooks = await BooksAPI.getAll()
      this.setState({allBooks: allBooks});
    }
  

    handleSearch = async e => {
      try {
        //These two lines to add the search query to the state
        const query = e.target.value
        this.setState({query})
        //Here, trim is used for white space, and no value problem
        if(query.trim().length>0) {
          //Here, I used await, so I don't sent empty query on load
          const results = await search(query)
          //Making sure my state is clear if I get an error
          if (results.error) {
            this.setState({ books: [] })
          } else {
            //Add the result of successful query to state
            this.setState({ books: results })
           this.handleShelf()
          }  
        //This is for resetting the page after word deletion
        } else {
          this.setState({ books: [] })
          //Reloading the page to clear any previous search
          window.location.reload()
        } 
      }
      //Error handling
      catch (error) {
      console.log(error)
      }
    }

   

    //This is to handle shlef changer
     handleChange = (book, shelf) => {
    //Grabbing data from API
    BooksAPI.update(book, shelf)
    .then(res=>{
    // This line is for displaying the correct shelf
    book.shelf=shelf  
    // this.setState({shelf})
    // The next two lines are for changing the book shelf on change
    this.setState(state=>({
    books: state.books.filter(b=>b.id!==book.id).concat(book)
    }))
    
    
    })  
    }
    //To make the shelf in the search page reflect real book shelf
    handleShelf = () => {
      const allBooks = this.state.allBooks
      const books = this.state.books
         books.map(book=>{
         if(allBooks.some(b=>b.id===book.id)) {
           book.shelf=allBooks.find(i=>i.id===book.id).shelf
         }
         else {
           book.shelf="none"
         }
         return book
       })
       this.setState({books: books})

    }
        
    render() {
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/* My search button, with value = query and onChange provoking handleSearch method*/}
                <input 
                type="text" 
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={this.handleSearch}           
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              {/* Creating the book component */}
              {this.state.books.length>0 && 
              this.state.books.map(book =>
              <Book 
              key={book.id} 
              book={book} 
              shelf={book.shelf}
              handleChange={this.handleChange} /> )}  
              </ol>
            </div>
            </div>
        );
    }
}

export default SearchPage

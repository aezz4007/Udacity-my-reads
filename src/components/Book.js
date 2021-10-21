import React from 'react';

class Book extends React.Component {

  render() {
    return(
        <li>
        <div className="book">
        <div className="book-top">
          {/* I had to handle a search result error of a book without a cover */}
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ""})` }}></div>
          <div className="book-shelf-changer">
          {/* The drop-down menu. */}
        <select 
        value={this.props.book.shelf ? this.props.book.shelf : "none"} 
        onChange={(e) => this.props.handleChange(this.props.book, e.target.value)}
        >
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
        </div>
        {/* Book title */}
        <div className="book-title">{this.props.book.title}</div>
        {/* Book authors. 
          * I had to separate their names with a comma and white space, for better readablitly
          * I had to handle an error for a search result of a book without an author. 
          * Now that book shows the words (Unknown author) 
          */}
        <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(`, `) : "Unknown author" }</div>
      </div>
      </li>
    );
  }
}

export default Book;
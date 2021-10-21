import React from 'react';
import Book from './Book';

class Shelf extends React.Component {

  render() {
    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* My Book element. HandleChange is for the drop-down functionality */}
            {this.props.books.map((myBook)=><Book book={myBook} key={myBook.id} handleChange={this.props.handleChange} />)}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;
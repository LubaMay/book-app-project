import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'

class CurrentlyReadingShelf extends Component {
    render() {
        const books = this.props.books
        const currentBookShelf = books.some(book => book.shelf === 'currentlyReading')
        const currentlyReadingBooks = books.filter(book => book.shelf === 'currentlyReading')
        return (
            <div className="list-books-content" >
                {currentBookShelf && (
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            {currentlyReadingBooks.map((book, id) =>
                                <ol className="books-grid" key={id}>
                                    <li>
                                        <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                                <BookShelfChanger
                                                    onUpdateShelf={this.props.onUpdateShelf}
                                                    book={book} />
                                            </div>
                                            <div className="book-title">{book.title}</div>
                                            <div className="book-authors">{book.authors}</div>
                                        </div>
                                    </li>
                                </ol>
                            )}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default CurrentlyReadingShelf
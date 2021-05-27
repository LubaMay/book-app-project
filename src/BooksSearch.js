import React, { Component } from 'react'
import CurrentlyReadingShelf from './CurrentlyReadigShelf'
import WantToReadShelf from './WantToReadShelf'
import Read from './Read'
import BookShelfChanger from './BookShelfChanger'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksSearch extends Component {

    state = {
        showSearchPage: true,
        query: '',
        queryBooks: [],

    }

    updateShelf = (book, shelf) => {
        if (this.props.updateShelf) {
            this.props.updateShelf(book, shelf)
        }
    }

    searchBook = (query) => {
        BooksAPI.search(query)
            .then((res) => {
                this.setState({
                    queryBooks: res,
                    query: query
                })
            })

    }

    render() {
        const { query, showSearchPage, queryBooks } = this.state
        let showingBooks = query === '' ? this.props.books : queryBooks
        let errorMessage = ''
        if (!Array.isArray(showingBooks)) {
            showingBooks = []
            errorMessage = 'No such a book found'
        }
        return (
            <div className="app">
                {showSearchPage && (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <Link to='/'><button className="close-search">Close</button></Link>
                            <div className="search-books-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Search by title or author"
                                    value={query}
                                    onChange={(e) => this.searchBook(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="search-books-results">
                            {errorMessage && <h3 className="error"> {errorMessage} </h3>}

                            {showingBooks.map((book, id) =>
                                <ol className="books-grid" key={id}>
                                    <li>
                                        <div className="book">
                                            <div className="book-top">
                                                {book.imageLinks !== undefined ?
                                                    <div className="book-cover"
                                                        style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                                                    </div>
                                                    : <div className="book-cover"
                                                        style={{ width: 128, height: 193, backgroundImage: `url(https://p.kindpng.com/picc/s/494-4945860_cartoon-book-with-blank-cover-printable-blank-book.png)` }}>
                                                    </div>}
                                                <BookShelfChanger
                                                    onUpdateShelf={this.updateShelf}
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
                )
                }

            </div>
        )
    }
}
export default BooksSearch








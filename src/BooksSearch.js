import React, { Component } from 'react'
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
        this.setState({
            query: query
        })
        BooksAPI.search(query)
            .then((res) => {
                console.log('result from search: ', res)

                // We have 3 types of possible behavior on request-response
                //
                // 1 - is when res is undefined
                // 2 - is when res has error parameter
                // 3 - is when res is an array
                if (typeof (res) === "undefined" || typeof (res.error) !== "undefined") {
                    // if you want to render some error here
                } else {

                    res.map(bookInTheSearch => {
                        this.props.books.map(bookInState => {
                            const bookId = bookInState.id
                            const bookShelf = bookInState.shelf

                            if (bookInTheSearch.id === bookId) {
                                bookInTheSearch.shelf = bookShelf
                            }

                        })
                    })

                }

                this.setState({
                    queryBooks: res

                })
            })

    }

    render() {
        const { query, showSearchPage, queryBooks } = this.state
        let showingBooks = query !== '' && queryBooks
        let errorMessage = ''
        if (!Array.isArray(showingBooks)) {
            showingBooks = []
            errorMessage = 'No such a book found'
        }

        const placeHolder = "https://p.kindpng.com/picc/s/494-4945860_cartoon-book-with-blank-cover-printable-blank-book.png";


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
                            {showingBooks.length === 0 && query !== '' && <h3 className="error"> {errorMessage} </h3>}

                            {showingBooks.map((book, id) =>
                                <ol className="books-grid" key={id}>
                                    <li>
                                        <div className="book">
                                            <div className="book-top">
                                                {
                                                    <div className="book-cover"
                                                        style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : placeHolder})` }}>
                                                    </div>
                                                }
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








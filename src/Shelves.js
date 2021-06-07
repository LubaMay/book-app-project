import React from 'react'
import BookShelfChanger from './BookShelfChanger'

const Shelves = (props) => {

    const { books, onUpdateShelf } = props
    const shelves = [
        { title: 'Currently Reading', key: 'currentlyReading' },
        { title: 'Want To Read', key: 'wantToRead' },
        { title: 'Read', key: 'read' }
    ];

    return (
        <div className="list-books-content" >
            {shelves.map((shelf, key) =>
                <div className="bookshelf" key={key}>
                    <h2 className="bookshelf-title">{shelf.title}</h2>
                    <div className="bookshelf-books">
                        {books.filter(book => book.shelf === shelf.key).map((book, id) =>
                            <ol className="books-grid" key={id}>
                                <li>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                            <BookShelfChanger
                                                onUpdateShelf={onUpdateShelf}
                                                book={book} />
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>
                            </ol>
                        )}
                    </div>
                </div>)}
        </div>
    )
}


export default Shelves
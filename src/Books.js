import React from 'react'

import Shelves from './Shelves'
import { Link } from 'react-router-dom'

const Books = (props) => {
    const { books, onUpdateShelf } = props

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <Shelves books={books} onUpdateShelf={onUpdateShelf} />

            <Link to='/search'
                className="open-search"
            >
                <button>Add a book</button>
            </Link>

        </div>
    )

}


export default Books
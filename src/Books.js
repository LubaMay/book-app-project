import React, { Component } from 'react'

import Shelves from './Shelves'
import { Link } from 'react-router-dom'

class Books extends Component {

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <Shelves books={this.props.books} onUpdateShelf={this.props.onUpdateShelf} />

                <Link to='/search'
                    className="open-search"
                >
                    <button>Add a book</button>
                </Link>

            </div>
        )

    }
}

export default Books
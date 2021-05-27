import React, { Component } from 'react'
import CurrentlyReadingShelf from './CurrentlyReadigShelf'
import WantToReadShelf from './WantToReadShelf'
import Read from './Read'
import { Link } from 'react-router-dom'

class Books extends Component {
    state = {
        showSearchPage: false,
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <CurrentlyReadingShelf books={this.props.books} onUpdateShelf={this.props.onUpdateShelf} />
                <WantToReadShelf books={this.props.books} onUpdateShelf={this.props.onUpdateShelf} />
                <Read books={this.props.books} onUpdateShelf={this.props.onUpdateShelf} />


                <Link to='/search'
                    className="open-search"
                >
                    <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </Link>

            </div>
        )

    }
}

export default Books
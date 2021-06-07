import React from 'react'

const BookShelfChanger = (props) => {

    const { book, onUpdateShelf } = props

    const handleChange = (e) => {
        console.log('changing', book.id, book.title)

        if (onUpdateShelf) {
            onUpdateShelf(book, e.target.value)
        }

    }

    return (

        <div className="book-shelf-changer">
            <select onChange={handleChange} value={typeof (book.shelf) !== "undefined" ? book.shelf : 'none'}>
                <option value="move">Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}


export default BookShelfChanger
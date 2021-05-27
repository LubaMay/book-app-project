import React, { Component } from 'react'

class BookShelfChanger extends Component {


    handleChange = (e) => {
        console.log('changing', this.props.book.id, this.props.book.title)
        if (this.props.onUpdateShelf) {
            this.props.onUpdateShelf(this.props.book, e.target.value)
        }
    }


    render() {
        return (

            <div className="book-shelf-changer">

                <select onChange={this.handleChange} >
                    <option value="move" >Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default BookShelfChanger
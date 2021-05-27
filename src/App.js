import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link, Route, Router } from 'react-router-dom'
import BooksSearch from './BooksSearch'
import Books from './Books'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }


  componentDidMount() {
    this.onInitData()
  }

  onInitData = () => {
    BooksAPI.getAll()
      .then((books) => {
        console.log("initial books", books)
        this.setState(() => ({
          books
        }))
      })
  }

  onUpdateShelf = (book, shelf, newOrUpdate) => {
    BooksAPI.update(book, shelf)
      .then((res) => {
        console.log("result", res)

        if (newOrUpdate == "update") {
          this.setState((prevState) => ({
            books: prevState.books.map(book => {
              for (shelf in res) {
                const bookIds = res[shelf]
                if (bookIds.some(bookId => book.id === bookId)) {
                  book.shelf = shelf
                }
              }
              return book
            })
          }))
        } else {
          console.log('newbook added', res)
          this.onInitData()
        }
      })
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Books books={this.state.books}
            onUpdateShelf={(book, shelf) => { this.onUpdateShelf(book, shelf, "update") }}
          />
        )}>
        </Route>

        <Route path='/search' render={({ history }) => (
          <BooksSearch
            books={this.state.books}
            updateShelf={(book, shelf) => {
              this.onUpdateShelf(book, shelf, "new")
              history.push('/')
            }}
          />
        )}
        ></Route>
      </div>
    )
  }
}

export default BooksApp

  //state = {
/**
 * TODO: Instead of using this state variable to keep track of which page
 * we're on, use the URL in the browser's address bar. This will ensure that
 * users can use the browser's back and forward buttons to navigate between
 * pages, as well as provide a good URL they can bookmark and share.
 */
  //showSearchPage: false
  // }
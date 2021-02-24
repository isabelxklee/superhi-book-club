import React, {Component} from 'react'
import './App.css'
import Book from './components/Book.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import EmptyPanel from './components/EmptyPanel.jsx'
import {ReactComponent as Logo} from './assets/logo.svg'

class App extends Component {
  state = {
    books: [],
    selectedBook: null,
  }

  async componentDidMount() {
    const response = await fetch(`https://book-club-json.herokuapp.com/books`)
    const booksArray = await response.json()
    this.setState({books: booksArray})
  }

  pickBook = (book) => {
    this.setState({
      selectedBook: book,
    })
  }

  closePanel = () => {
    this.setState({
      selectedBook: null,
    })
  }

  render() {
    const {books, selectedBook} = this.state

    return (
      <main>
        <header>
          <h1>
            <a href="/">
              <Logo alt="Graphic logo for SuperHi's Book Club" className="logo" />
            </a>
          </h1>
        </header>
        <section className="main-container">
          <div className={selectedBook ? 'books-container inactive' : 'books-container active'}>
            {books.map((book) => (
              <Book key={book.id} book={book} pickBook={this.pickBook} />
            ))}
          </div>
          {selectedBook ? (
            <DetailPanel book={selectedBook} closePanel={this.closePanel} />
          ) : (
            <EmptyPanel />
          )}
        </section>
      </main>
    )
  }
}

export default App

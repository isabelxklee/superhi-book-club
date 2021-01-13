import React, {Component} from 'react'
import './App.css'
import Book from './components/Book.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import EmptyPanel from './components/EmptyPanel.jsx'
import Search from './components/Search.jsx'
import logo from './assets/logo-book-club.png'

class App extends Component {
  state = {
    books: [],
    selectedBook: null,
    searchTerm: '',
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

  handleSearchTerm = (input) => {
    this.setState({
      searchTerm: input,
    })
  }

  filterBooks = () => {
    const {searchTerm, books} = this.state
    let newArray = []

    const stringSearch = (bookAttribute, searchTerm) =>
      bookAttribute.toLowerCase().includes(searchTerm.toLowerCase())

    if (searchTerm === '') {
      newArray = books
    } else {
      newArray = books.filter(
        (book) => stringSearch(book.title, searchTerm) || stringSearch(book.author, searchTerm)
      )
    }

    return newArray
  }

  render() {
    const {selectedBook, searchTerm} = this.state

    return (
      <main>
        <header>
          <h1>
            <a href="/">
              <img src={logo} alt="Black logo for 'SuperHi's Book Club'" className="logo" />
            </a>
          </h1>
        </header>
        <Search searchTerm={searchTerm} handleSearchTerm={this.handleSearchTerm} />
        <section className="main-container">
          <div className={selectedBook ? 'books-container inactive' : 'books-container active'}>
            {this.filterBooks().map((book) => (
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

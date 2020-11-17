import React, {Component} from 'react'
import './App.css'
import BooksContainer from './components/BooksContainer.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import Search from './components/Search.jsx'

class App extends Component {
  state = {
    books: [],
    selectedBook: null,
    searchTerm: '',
  }

  componentDidMount() {
    fetch('https://my-json-server.typicode.com/isabelxklee/book-club-json/books')
      .then((response) => response.json())
      .then((booksArray) => {
        this.setState({
          books: booksArray,
        })
      })
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

  reformatString = (bookAttribute, searchTerm) => (
    bookAttribute.toLowerCase().includes(searchTerm.toLowerCase())
  )

  filterBooks = () => {
    const {searchTerm, books} = this.state
    let newArray = []

    if (searchTerm === '') {
      newArray = books
    } else {
      newArray = books.filter(
        (book) =>
          this.reformatString(book.title, searchTerm) || this.reformatString(book.author, searchTerm)
      )
    }

    return newArray
  }

  render() {
    return (
      <div className="App">
        <h1 id="title">SuperHi Book Club</h1>

        {this.state.selectedBook && (
          <>
            <DetailPanel book={this.state.selectedBook} closePanel={this.closePanel} />
            <div id="app-overlay" onClick={this.closePanel} />
          </>
        )}

        <Search searchTerm={this.state.searchTerm} handleSearchTerm={this.handleSearchTerm} />
        <BooksContainer books={this.filterBooks()} pickBook={this.pickBook} />
      </div>
    )
  }
}

export default App

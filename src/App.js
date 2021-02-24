import React, {useState, useEffect} from 'react'
import './App.css'
import Book from './components/Book.jsx'
import DetailPanel from './components/DetailPanel.jsx'
import EmptyPanel from './components/EmptyPanel.jsx'
import {ReactComponent as Logo} from './assets/logo.svg'

const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://book-club-json.herokuapp.com/books')
      const books = await response.json()
      setBooks(books)
    }

    fetchData()
  }, [])

  const pickBook = (book) => {
    setSelectedBook(book)
  }

  const closePanel = () => {
    setSelectedBook(null)
  }

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
            <Book key={book.id} book={book} pickBook={pickBook()} />
          ))}
        </div>
        {selectedBook ? (
          <DetailPanel book={selectedBook} closePanel={closePanel()} />
        ) : (
          <EmptyPanel />
        )}
      </section>
    </main>
  )
}

export default App

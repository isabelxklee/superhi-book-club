import React from 'react'

const Book = ({book, pickBook}) => (
  <article className="book">
    <p>{book.id}</p>
    <img
      src={book.image}
      alt={`Book cover for ${book.title} by ${book.author}`}
      onClick={() => pickBook(book)}
      className="book list"
    />
    <h3>{book.title}</h3>
    <p className="author">by {book.author}</p>
  </article>
)

export default Book

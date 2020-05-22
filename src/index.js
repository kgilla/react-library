import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: props.book,
      read: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleClick() {
    this.state.read === true
      ? this.setState({ read: false })
      : this.setState({ read: true });
  }

  handleRemove() {
    this.props.remove(this.props.book);
  }

  render() {
    return (
      <div className="book">
        <div className="book-header">
          <h2>{this.state.book.title}</h2>
        </div>
        <div className="book-info">
          <h3>Authored By: {this.state.book.author}</h3>
          <h3>{this.state.book.pageCount} Pages</h3>
        </div>
        <div className="book-buttons">
          {this.state.read === true ? (
            <button onClick={this.handleClick} className="read">
              Read!
            </button>
          ) : (
            <button className="not-read" onClick={this.handleClick}>
              Read?
            </button>
          )}
          <button onClick={this.handleRemove} className="book-delete">
            X
          </button>
        </div>
      </div>
    );
  }
}

class BookCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      pageCount: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
  }

  handleInputChange(e) {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleData(this.state);
    this.props.showForm();
  }

  handleFormClose() {
    this.props.showForm();
  }

  render() {
    return (
      <div className="form-shroud">
        <form>
          <button className="form-close" onClick={this.handleFormClose}>
            X
          </button>
          <h2>Add A Berk!</h2>
          <div className="form-section">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              name="title"
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div className="form-section">
            <label htmlFor="title">Author</label>
            <input
              type="text"
              name="author"
              onChange={this.handleInputChange}
            ></input>
          </div>

          <div className="form-section">
            <label htmlFor="title">Page Count</label>
            <input
              type="text"
              name="pageCount"
              onChange={this.handleInputChange}
            ></input>
          </div>

          <button id="create-book" onClick={this.handleSubmit}>
            Create Book
          </button>
        </form>
      </div>
    );
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.showForm();
  }

  render() {
    return (
      <nav>
        <h1>My Berrrks!</h1>

        <button onClick={this.handleClick}>Add A Berk</button>
      </nav>
    );
  }
}

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [{ title: "Hello", author: "Kenneth Gilmore", pageCount: 2020 }],
      showForm: false,
    };
    this.addBook = this.addBook.bind(this);
    this.showForm = this.showForm.bind(this);
    this.removeBook = this.removeBook.bind(this);
  }

  addBook(book) {
    this.setState((prevState) => ({
      books: [...prevState.books, book],
    }));
  }

  removeBook(book) {
    const berks = this.state.books.filter((b) => b !== book);
    this.setState({ books: berks });
  }

  showForm() {
    this.state.showForm === true
      ? this.setState({ showForm: false })
      : this.setState({ showForm: true });
  }

  render() {
    return (
      <div>
        <NavBar showForm={this.showForm} />
        {this.state.showForm ? (
          <BookCreator handleData={this.addBook} showForm={this.showForm} />
        ) : null}
        <div className="library">
          {this.state.books.map((b) => (
            <Book
              remove={this.removeBook}
              book={b}
              key={b.title + b.pageCount}
            />
          ))}
        </div>
      </div>
    );
  }
}

/* ---------------------- */

ReactDOM.render(<Library />, document.querySelector("#root"));

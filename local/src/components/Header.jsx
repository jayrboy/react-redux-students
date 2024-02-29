import { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Header extends Component {
  state = {
    collapse: false,
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light
        bg-light mx-auto "
      >
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            onClick={() => {
              this.setState({ collapse: !this.state.collapse })
              console.log(this.state.collapse)
              console.log('OK click')
            }}
          ></span>
        </button>
        <div
          className={
            this.state.collapse
              ? 'collapse navbar-collapse show text-center pt-3'
              : 'collapse navbar-collapse'
          }
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                All Students
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add">
                Add Student
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
export default Header

import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [state, setState] = useState({
    collapse: false,
  })
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
            setState({ collapse: !state.collapse })
            console.log(state.collapse)
          }}
        ></span>
      </button>
      <div
        className={
          state.collapse
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
export default Navbar

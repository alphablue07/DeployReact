/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from "./pages/home"
import Profiles from './pages/profiles/profiles';
import Register from './pages/register/register';
import Login from './components/login/login';
import GameRPS from './pages/games/rock_paper_scissors';


//pages test
describe("test all pages render", () => { 
  test("renders Home pages", done => {
    render(
      <Router>
        <Home/>
      </Router>
    )
    done()
  })
  test("renders Profile pages", done => {
    render(
      <Router>
        <Profiles/>
      </Router>
    )
    done()
  })
  test("renders Register pages", done => {
    render(
      <Router>
        <Register/>
      </Router>
    )
    done()
  })
  test("renders Login Modal pages", done => {
    render(
      <Router>
        <Login/>
      </Router>
    )
    done()
  })
  test("renders RPS Game pages", done => {
    render(
      <Router>
        <GameRPS/>
      </Router>
    )
    done()
  })
})

// test component
describe("renders Text", () => { 
  test("validate text in homepage", () => {
    const component = render(
    <Router>
    <Home/>
    </Router>);
    const linkElement = component.getByText(/FIND YOUR FAVORITE GAME/i)
    expect(linkElement).toBeInTheDocument();
  })
})
describe("invalid text", () => { 
  test("The text is invalid", () => {
    const component = render(
    <Router>
    <Home/>
    </Router>);
    expect(() => getByText(/definitely not in the document/i)).toThrow()
  })
})
describe("invalid button", () => { 
  test("The button is invalid", () => {
    const component = render(
    <Router>
    <Home/>
    </Router>);
    const submitButton = screen.queryByText('submit')
    expect(submitButton).toBeNull() // it doesn't exist
  })
})
describe("invalid Roles", () => { 
  test("The roles are invalid", () => {
    const component = render(
    <Router>
    <Home/>
    </Router>);
    expect(() =>screen.getByText('llo Worl', {exact: false}) // it doesn't exist
  )})
})


// module.exports = {
//   // Automatically clear mock calls, instances, contexts and results before every test
//   clearMocks: true,

//   // Indicates whether the coverage information should be collected while executing the test
//   collectCoverage: true,

//   // The directory where Jest should output its coverage files
//   coverageDirectory: "coverage",

//   // Indicates which provider should be used to instrument code for coverage
//   coverageProvider: "v8"
// }
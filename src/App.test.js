import { render } from '@testing-library/react';
import { Home } from "./pages/home"
import { BrowserRouter } from 'react-router-dom';

describe("test all pages render", () => { 
  test("renders Home pages", async () => {
    render(
      <BrowserRouter>
        <Home/>
      </BrowserRouter>,
    )
  })

})




import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { authFirebase } from "./config/firebase";
import "./App.css";

import GameSpaceWar from "./pages/games/space_war";
import GameRPS from "./pages/games/rock_paper_scissors";
import Home from "./pages/home";
import Profiles from "./pages/profiles/profiles";
import Register from "./pages/register/register";
import ProfileUpdate from "./pages/updateProfiles/updateProfiles";
import View from "./pages/pdfView/pdfview";
import { Provider } from "react-redux";
import { store } from './config/redux'
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.jsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  // const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = authFirebase.onAuthStateChanged(async (user) => {
      if (user) {
        // const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

        // const userGame = {
        //   email: user.email,
        //   uid: user.uid,
        //   token: idTokenResult,
        // };

        // dispatch({
        //   type: "LOGGED_IN_USER",
        //   payload: userGame,
        // });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/rps" element={<GameRPS />} />
        <Route path="/game/space_war" element={<GameSpaceWar />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles/update" element={<ProfileUpdate />} />
        <Route path="/game/rps/history" element={<View />} />
        

      </Routes>
    </Router>
    </Provider>
  );
}

export default App;

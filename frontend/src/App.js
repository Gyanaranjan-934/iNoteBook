  import { useState } from "react";
  import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
  import Navbar from './components/Navbar'
  import Home from './components/Home';
  import About from './components/About';
  import NoteState from "./context/notes/NoteState";
  import AuthState from "./context/auth/AuthState";
  // import css from "./App.css"
  import Alert from "./components/Alert";
  import Login from "./components/Login";
  import SignUp from "./components/SignUp";
  import EditProfile from "./components/EditProfile";

  const App = () => {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
      setAlert({
        msg: message,
        type: type,
      });
      setTimeout(() => {
        setAlert(null);
      }, 1500);
    };
    return (
      <>
        <AuthState>
          <NoteState>
            <Router>
              <Navbar showAlert={showAlert} />
              <Alert alert={alert} />
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<Home showAlert={showAlert} />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/login" element={<Login showAlert={showAlert} />} />
                  <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
                  <Route exact path="/edit-profile" element={<EditProfile showAlert={showAlert}  />} />
                </Routes>
              </div>
            </Router>
          </NoteState>
        </AuthState>
      </>
    );
  }

  export default App;

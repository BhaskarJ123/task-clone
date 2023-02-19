import Signup from "./components/Signup";
import User from "./components/User";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import React from "react";
import "./App.css";

function App() {
  const userData: any = useSelector((state: any) => {
    return state.user.users[0];
  });

  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const handleLogin = (): void => {
    setUserLoggedIn(true);
  };

  return (
    <div className="App">
      {!isUserLoggedIn && <Signup handleLogin={handleLogin} />}
      {isUserLoggedIn && (
        <div>
          <Router>
            <Header userName={userData.name} />
            <Switch>
              <Route path="/" exact>
                <User userData={userData} />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
import Signup from "./components/Signup";
import User from "./components/User";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import "./App.css";

function App() {
  // const userData: any = useSelector((state: any) => {
  //   return state.user.users[0];
  // });

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact>
            <Signup />
          </Route>
          <Route path='/dashboard' exact>
            <Header/>
            <User/>
            <Footer />
          </Route>
        </Switch>
        {/* {!isUserLoggedIn && <Signup handleLogin={handleLogin} />}
        {isUserLoggedIn && (
          <div>
              <Header userName={userData.name} />
                <Route path="/" exact>
                  <User userData={userData} />
                </Route>
              <Footer />
          </div>
        )} */}
      </div>
    </Router>
  );
}

export default App;

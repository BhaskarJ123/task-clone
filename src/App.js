import Signup from './components/Signup';
import User from './components/User';
import Header from './components/Header';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import {useState} from 'react';

import './App.css';

function App() {
  const userData = useSelector((state) => {
    return state.userDataReducer.user[0]
  });
  const [isUserLoggedIn,setUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setUserLoggedIn(true);
  }
  return (
    <div className="App">
      {!isUserLoggedIn && <Signup handleLogin={handleLogin}/>}
      {isUserLoggedIn && 
        <div>
          <Header userName={userData.name.firstname}/>
          <User userData={userData}/>
          <Footer />
        </div>}
    </div>
  );
}

export default App;

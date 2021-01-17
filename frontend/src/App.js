import './App.css';
import SignIn from './pages/SighIn/SignIn';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SnUp';
import Analytics from './pages/Analytics/Analytics'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignOut from "./pages/Auth/SignOut";
import Voice from './pages/Voice/Voice'

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path="/">
        <SignIn/>
      </Route>
      <Route exact path="/signin">
        <SignIn/>
      </Route>
      <Route exact path="/signup">
        <SignUp/>
      </Route>
      <Route exact path="/signout">
        <SignOut/>
      </Route>
      <Route path="/home">
        <Home/>
      </Route>
      <Route path="/analytics">
        <Analytics/>
      </Route>
      <Route path="/call">
        <Voice/>
      </Route>
    </div>
    </Router>
  );
}

export default App;

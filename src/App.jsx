import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import Me from './components/Me';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Auth></Auth>
          </Route>
          <Route path="/callback" exact>
            <Auth></Auth>
          </Route>
          <Route path="/me">
            <Me></Me>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

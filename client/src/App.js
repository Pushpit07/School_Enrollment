import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Form from './Form';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <h2 className="m-5">School Enrollment App</h2>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route exact path="/create" render={() => <Form />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

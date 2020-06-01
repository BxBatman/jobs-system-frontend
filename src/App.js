import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import interceptors from "./Interceptors";
import login from "./login";
import home from "./Home";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Route exact path="/login" component={login} />
            <Route exact path="/" component={home} />
          </BrowserRouter>
        </header>
      </div>
  );
}

export default App;
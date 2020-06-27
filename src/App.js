import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import interceptors from "./Interceptors";
import home from "./Home";
import createOffer from "./CreateOffer"
import myOffers from "./MyOffers"

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Route exact path="/createOffer" component={createOffer}/>
            <Route exact path="/" component={home} />
            <Route exact path="/myOffers" component={myOffers}/>
          </BrowserRouter>
        </header>
      </div>
  );
}

export default App;
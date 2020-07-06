import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import interceptors from "./Interceptors";
import home from "./Home";
import createOffer from "./CreateOffer"
import myOffers from "./MyOffers"
import 'react-notifications/lib/notifications.css';
import ManageJobs from "./ManageJobs";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Route exact path="/createOffer" component={createOffer}/>
            <Route exact path="/" component={home} />
            <Route exact path="/myOffers" component={myOffers}/>
            <Route exact path="/manageJobs" component={ManageJobs}/>
          </BrowserRouter>
        </header>
      </div>
  );
}

export default App;
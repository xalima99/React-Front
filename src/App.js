import React from "react";
import { connect } from "react-redux";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import history from "./history/history";

import MainShower from "./components/MainShower";
import ShowAd from "./components/ShowAd";
import EditAd from "./components/EditAd";
import DeleteAd from "./components/DeleteAd";
import CreateAd from "./components/createAd";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import LoginPage from "./components/LoginPage";

class App extends React.Component {
  RequireAuth = ({ children }) => {
    if (!this.props.isSignedIn) {
      return <Redirect to={"/login"} />;
    }

    return children;
  };

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/" component={MainShower} exact />
            <Route path="/ads/edit/:id" component={EditAd} />
            <Route path="/ads/delete/:id" component={Modal} />
            <Route path="/ads/:id"  exact component={ShowAd} />
            <this.RequireAuth>
              <Route path="/visit/ads/new" exact component={CreateAd} />
            </this.RequireAuth>
           
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {})(App);

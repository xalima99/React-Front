import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../redux/actions";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "615539191805-eq7ka0lus6obrffb961pu2d6g7raorj3.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(
        this.auth.currentUser.get().getId(),
        this.auth.currentUser.get().getBasicProfile().getName()
      );
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <>
          <p style={{display: "inline", color:"#fff", marginRight:"5px"}}>Bienvenue, {this.props.name}</p>
          <button className="btn btn-danger" onClick={this.onSignOutClick}>
            Sign Out
          </button>
        </>
      );
    } else {
      return (
        <button className="btn btn-primary" onClick={this.onSignInClick}>
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    name: state.auth.Username,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

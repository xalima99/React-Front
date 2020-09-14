import React, { Component } from "react";
import { connect } from "react-redux";
import Auth from './Auth';
import history from '../history/history';

class LoginPage extends Component {
    componentDidUpdate(){
        if(this.props.signed) history.push('/visit/ads/new')
    }

  render() {
    
    return (
      <div id="login">
        <div className="jumbotron">
          <h1 className="display-4">Connectez vous pour pouvoir publier votre annonce</h1>
          <Auth />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    signed: state.auth.isSignedIn
});

const mapDispatchToProps = {
    
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

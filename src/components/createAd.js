import React, { Component } from "react";
import { connect } from "react-redux";


import { createAd } from "../redux/actions";

import Adform from './adform'

class createAds extends Component {
  

  onSubmit = (formValues) => {
    this.props.createAd(formValues);
  };

  render() {
    return (
      <div className="container">
       <Adform onSubmit={this.onSubmit} />
      </div>
    );
  }
}




const mapDispatchToProps = { createAd };

export default connect(null, mapDispatchToProps)(createAds);

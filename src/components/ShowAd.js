import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAd, clear } from "../redux/actions/";

export class ShowAd extends Component {
  componentDidMount() {
    this.props.fetchAd(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clear()
  }

  renderImage = () => {
    if(this.props.adId.file){
      return(
        <div className="container">
          <img className="img-fluid" src={this.props.adId.file} />
        </div>
      )
    }
  }

  render() {
    if(!this.props.adId) return <div>Loading...</div>
    return <div><div className="jumbotron jumbotron-fluid">
    <div className="container">
      {this.renderImage()}
      <h1 className="display-4">{this.props.adId.title}</h1>
      <p className="lead">{this.props.adId.description}</p>
    </div>
  </div></div>;
  }
}

const mapStateToProps = (state) => {

  return {
    adId: state.ads.single[0]
  };
};

const mapDispatchToProps = {
  fetchAd,
  clear
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowAd);

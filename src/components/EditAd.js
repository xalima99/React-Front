import React, { Component } from "react";
import { connect } from "react-redux";
import Adform from "./adform";
import { editAd, fetchAd, clear } from "../redux/actions/index";

export class EditAd extends Component {
  componentDidMount() {
    this.props.fetchAd(this.props.match.params.id);
  }

  onSubmit = (formvalues) => {
    this.props.editAd(this.props.match.params.id, formvalues);
  };

  componentWillUnmount() {
    this.props.clear()
  }

  render() {
    if (!this.props.ad) {
      return <div>...Loading</div>;
    }
    return (
      <div>
        <Adform
          onSubmit={this.onSubmit}
          initialValues={{
            title: this.props.ad.title,
            description: this.props.ad.description,
            prix: this.props.ad.prix,
            file: this.props.ad.file
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ad: state.ads.single[0],
});

const mapDispatchToProps = {
  editAd,
  fetchAd,
  clear
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAd);

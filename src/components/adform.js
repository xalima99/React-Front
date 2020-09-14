import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import axios from "axios";

class createAds extends Component {
  state = {
    ImgUrl: null,
    loading: false,
  };

  renderError = ({ touched, error }) => {
    if (touched && error) {
      return <div style={{ color: "red" }}>{error}</div>;
    }
  };

  renderInput = ({ label, input, meta }) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input {...input} className="form-control" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderprix = ({ label, input }) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input type="number" {...input} className="form-control" />
      </div>
    );
  };

  uploadImage = async (e) => {
    this.setState({ loading: true });
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/el1e/image/upload",
      data
    );
    const file = res;
    this.setState({ ImgUrl: file.data.secure_url, loading: false });
    console.log(this.state);
  };

  renderImage = ({ label, input }) => {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          type="file"
          className="form-control"
          onChange={this.uploadImage}
        />
      </div>
    );
  };

  onSubmit = (formValues) => {
    if (this.state.imgUrl !== null) {
      let condensed = { ...formValues, file: this.state.ImgUrl };
      console.log(condensed);
      this.props.onSubmit(condensed);
    } else {
      this.props.onSubmit(formValues);
    }
  };

  render() {
    return (
      <div className="container">
        <form
          className="form-group"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Titre de l'annonce"
          />
          <Field
            name="description"
            component={this.renderInput}
            label="description de l'annonce"
          />
          <Field
            name="prix"
            component={this.renderprix}
            label="prix de l'article"
          />
          <Field
            name="file"
            component={this.renderImage}
            label="Ajouter une image"
          />

          <button
            className="btn btn-primary btn-lg"
            disabled={this.state.loading === true}
          >
            Post
          </button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Le titre ne peut pas etre vide";
  }
  if (!formValues.description) {
    errors.description = "La description ne peut pas être vide";
  }

  return errors;
};

export default reduxForm({ form: "adForm", validate })(createAds);

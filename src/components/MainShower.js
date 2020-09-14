import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAds, modalShow } from "../redux/actions";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MainShower extends Component {
  static propTypes = {
    fetchAds: PropTypes.func.isRequired,
    ads: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.fetchAds();
  }

  renderAds = () => {
    return this.props.ads.map((ad) => {
      return (
        <Col md={6} lg={4} key={ad._id}>
          <Card style={{ width: "18rem", margin: "5px 0" }}>
          <Link to={`/ads/${ad._id}`}>
            <img
              src={
                ad.file
                  ? ad.file
                  : "https://thumbs.dreamstime.com/b/no-image-available-icon-vector-illustration-flat-design-140476186.jpg"
              }
              className="img-fluid"
              style={{height: "155px"}}
            />
            </Link>
            <Card.Body>
              <Link to={`/ads/${ad._id}`}>
                <Card.Title>{ad.title}</Card.Title>
              </Link>
              <Card.Text>{ad.description}</Card.Text>
              <Card.Text>PRIX : ${ad.prix}</Card.Text>
              <div className="text-muted">posté par {ad.UserName}</div>
              {this.props.user === ad.UserId ? (
                <>
                  <Link to={`/ads/edit/${ad._id}`} className="btn btn-dark m-2">
                    Modifier
                  </Link>
                  <Link to={`/ads/delete/${ad._id}`} className="btn btn-danger">
                    Supprimer
                  </Link>{" "}
                </>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Bienvenue à LEMauvaisCoin!</h1>
          <p className="lead">
            Le site le plus moche et la pire adresse quie existe pour publier
            vos annonce. Alors si vous ne désirez vendre aucun produit,
            bienvenue !
          </p>
          <hr className="my-4" />
          <Link className="btn btn-block btn-warning btn-lg" to="visit/ads/new">
            PUBLIER UNE ANNONCE
          </Link>
        </div>
        <Container>
          <Row>{this.renderAds()}</Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ads: state.ads.announces,
  user: state.auth.Userid,
  name: state.auth.UserName,
  isSigned: state.auth.isSignedIn,
});

const mapDispatchToProps = { fetchAds, modalShow };

export default connect(mapStateToProps, mapDispatchToProps)(MainShower);

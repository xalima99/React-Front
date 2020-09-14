import React, { Component } from "react";
import { connect } from "react-redux";
import { modalHide, modalShow, deleteAd, fetchAd, fetchAds } from "../redux/actions/index";
import { Modal, Button } from "react-bootstrap";
import history from "../history/history";

export class Modale extends Component {
  componentDidMount() {
    this.props.fetchAd(this.props.match.params.id)
    this.props.modalShow();
  }

  onhide = () => {
    this.props.modalHide();
    history.push("/");
  };

  ondelete = async () => {
    await this.props.deleteAd(this.props.match.params.id)
       this.onhide()
  }

  render() {
    if(!this.props.ad){
        return <div>Loading...</div>
    }

    return (
      <div>
        <Modal show={this.props.show} onHide={this.onhide}>
          <Modal.Header closeButton>
            <Modal.Title>Supprimer l'annonce ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`Etes vous certain(e) de vouloir supprimer l'annonce: ${this.props.ad.title}`}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.ondelete}>
              Supprimer
            </Button>
            <Button variant="secondary" onClick={this.onhide}>
              Annuler
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  show: state.modal.show,
  ad: state.ads.single[0]
});

const mapDispatchToProps = { modalHide, modalShow, deleteAd, fetchAd, fetchAds };

export default connect(mapStateToProps, mapDispatchToProps)(Modale);

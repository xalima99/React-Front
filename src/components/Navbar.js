import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import Auth from './Auth';

class Navbare extends Component {
    componentDidMount(){
       
    }

  render() {
    return (
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">LeMauvaisCoin</Link>
  
     
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
        </ul>
        <Auth />

    </nav>
      
    );
  }
}

export default connect(null, { })(Navbare);

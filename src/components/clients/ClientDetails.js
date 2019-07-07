import React, {Component} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import classnames from 'classnames';

class ClientDetails extends Component {
  state = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: '',
  };

  static getDerivedStateFromProps(props, state) {
    const {client} = props;
    if (client) {
      //Add balance
      return {...client};
    }
    return null;
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newClient = this.state;
    const {firestore, history} = this.props;
    if (newClient.balance === '') {
      newClient.balance = 0;
    }
    firestore
      .add({collection: 'clients'}, newClient)
      .then(() => history.push("/"));
  };

  render() {
    const {client} = this.props;
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left"/> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6 text-right">
              <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                <i className="fas fa-arrow-circle-left"/> Edit
              </Link>
              <div className="btn btn-danger">
                Delete
              </div>
            </div>
          </div>
          <hr/>
          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{' '}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance: <span className={classnames({
                    'text-danger': client.balance > 0,
                    'text-success': client.balance === 0
                  })}>
                    ${parseFloat(client.balance).toFixed(2)}
                  </span>
                  </h3>
                </div>
              </div>
              <hr/>
              <ul className="list-group">
                <li className="list-group-item">Contact Email: {client.email}</li>
                <li className="list-group-item">Contact Phone: {client.phone}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return <Spinner/>
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
};
export default compose(
  firestoreConnect(props => [
    {collection: 'clients', storeAs: 'client', doc: props.match.params.id}
  ]),
  connect(({firestore: {ordered}}, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);

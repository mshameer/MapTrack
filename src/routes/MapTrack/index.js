import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from "react-redux";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as actions from "actions/signup";
import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import CircularProgress from 'material-ui/CircularProgress';
import Layout from '../Layout';

const TrackGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.path[0]}
  >
    {props.path.length && <Polyline options={{strokeColor: '#2e10ff', geodesic: true,  path: props.path }} />}
  </GoogleMap>
));

class Register extends Component {

	state = {
    path: [{lat: 8.5088733, lng: 76.909832}],
  }

	componentDidMount() {
		const options = {
		  enableHighAccuracy: false,
		  timeout: 1000,
		  maximumAge: 0
		};

		navigator.geolocation.getCurrentPosition(this.onLocationChange);
		const id = navigator.geolocation.watchPosition(this.onLocationChange, (err) => {
		  console.warn('ERROR(' + err.code + '): ' + err.message);
		}, options);
  }

	onLocationChange = (pos) => {
	  var crd = pos.coords;
		const path = this.state.path;
		path.push({ lat: crd.latitude, lng: crd.longitude });
    this.setState({path});
	}

	render() {
    const { errors, email, password, firstName, registerUser, inputChange } = this.props;
		console.log('this.state.path');
    return (
			<Layout title="Register">
				<div id="page-index" className="page" style={{paddingTop:60}}>
					<TrackGoogleMap
				    loadingElement={
				      <div style={{ height: `100%` }}>
				        <CircularProgress />
				      </div>
				    }
				    containerElement={
				      <div style={{ height: window.innerHeight-50 }} />
				    }
				    mapElement={
				      <div style={{ height: window.innerHeight-50, width: `100%` }} />
				    }
        		path={this.state.path}
				  />
          <RaisedButton label="Start" fullWidth={true} style={{height:50}} />
				</div>
			</Layout>);
	}
}

Register.propTypes = {
    errors: PT.object,
    registerUser: PT.func,
    inputChange: PT.func,
    firstName: PT.string,
    email: PT.string,
    password: PT.string
};

const mapStateToProps = ({ signup }) => ({
    errors: signup.errors,
    firstName: signup.firstName,
    email: signup.email,
    password: signup.password,
});

const mapDispatchToProps = dispatch => ({
    inputChange: (change) => dispatch(actions.signupInputChange(change)),
    registerUser: (userData) => {
        // Front Validation
        let newErrors = {};
        let hasErrors = false;
        let { email, password, firstName } = userData;
        if ( !firstName || firstName.length < 2) {
          newErrors.firstName = "First Name required";
          hasErrors = true;
        }
        if ( !email || email.length < 2) {
          newErrors.email = "Email required";
          hasErrors = true;
        }
        if ( !password || password.length < 2) {
          newErrors.password = "Password required";
          hasErrors = true;
        }
        if (!hasErrors ){
          dispatch(actions.signupRequest(userData));
        } else {
          dispatch(actions.signupFailed(newErrors));
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

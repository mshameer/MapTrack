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
import * as actions from "actions/map";
import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import CircularProgress from 'material-ui/CircularProgress';
import Layout from '../Layout';

const TrackGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={props.center}
  >
    {props.path.length > 0 && <Polyline options={{strokeColor: '#2e10ff', geodesic: true,  path: props.path }} />}
  </GoogleMap>
));

const styles = {
  loading: {
    height: '100%',
  },
  container: {
    height: '100%',
  },
  map: {
    height: window.innerHeight-110,
    width: `100%`,
  },
  button: {
    height: 50,
  }
};


class MapTrack extends Component {

	componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.props.setCurrentLocation(pos.coords);
    }, (err) => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    });
  }

	onStartTracking = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 0
    };

    this.watchId = navigator.geolocation.watchPosition((pos) => {
      this.props.updateLocation(pos.coords);
    }, (err) => {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }, options);
	}

  onStopTracking = () => {
    navigator.geolocation.clearWatch(this.watchId);
    this.props.createTrack();
  }

	render() {
    const { path, center, trackingStatus } = this.props;
    const touchTapFunction = trackingStatus ? this.onStopTracking : this.onStartTracking;
    const buttonText = trackingStatus ? 'Stop' : 'Start';

    return (
			<Layout title="MapTrack">
				<div id="page-index" className="page" style={{paddingTop:60}}>
					<TrackGoogleMap
				    loadingElement={
				      <div style={styles.loading}>
				        <CircularProgress />
				      </div>
				    }
				    containerElement={
				      <div style={styles.container} />
				    }
				    mapElement={
				      <div style={styles.map} />
				    }
        		path={path}
            center={center}
				  />
        <RaisedButton label={buttonText} fullWidth={true} style={styles.button} onTouchTap={touchTapFunction} />
				</div>
			</Layout>);
	}
}

MapTrack.propTypes = {
  trackingStatus: PT.bool,
  errors: PT.object,
  center: PT.object,
  path: PT.array,
  updateLocation: PT.func,
  setCurrentLocation: PT.func,
  createTrack: PT.func,
};

const mapStateToProps = ({ map }) => ({
  trackingStatus: map.tracking,
  errors: map.errors,
  center: map.defaultLocation,
  path: map.path,
});

const mapDispatchToProps = dispatch => ({
    updateLocation: (change) => dispatch(actions.updateLocation(change)),
    setCurrentLocation: (change) => dispatch(actions.setCurrentLocation(change)),
    createTrack: () => dispatch(actions.createTrack()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapTrack);

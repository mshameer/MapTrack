import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from "react-redux";
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as actions from "actions/map";
import * as routeActions from "actions/routes";
import { withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import Layout from '../Layout';
import TrackDetails from './trackDetails';

const symbolOne = {
  path: 'M-2,-4l-2,2v4l2,2h4l2,-2v-4l-2,-2Z',
  strokeColor: '#FFA500',
  fillColor: '#F0DD2E',
  fillOpacity: 1,
  strokeWidth: '1px',
  scale: 1.5,
};

const loadPaths = ({tracks, addOrRemoveTrack}) => tracks.map((track ,index) => {
  const path = track.coords &&
    track.coords.map(pos => ({ lat: parseFloat(pos.latitude), lng: parseFloat(pos.longitude) }));
  if(path) {
    const pathCenter = path[Math.trunc(path.length/2)];
    const strokeColor = track.selected ? '#ff8a3f' : '#29b3ec';
    return [
      <Polyline options={{strokeColor, geodesic: true, path, strokeWeight: 7 }} key={index} onClick={() => addOrRemoveTrack(track) }  />,
      <Marker position={pathCenter} icon={symbolOne} label={{ text: track.noOfHouses.toString(), color: 'black', fontSize: '8px'}} />
    ];
  }
});

const TrackGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={18}
    center={props.center}
    options = {{ scaleControl: true, fullscreenControl: true }}
  >
    {props.tracks && loadPaths(props)}
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
  },
  routInfo: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 32,
  }
};


class MapRoutes extends Component {
  state = {
    open: false,
  }
	componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.props.setCurrentLocation(pos.coords);
      this.props.loadPath();
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

  handleClose = () => {
    this.setState({ open: false });
  }

  handleSubmit = () => {
    this.props.createTrack();
    this.setState({ open: false });
  }

  onCreateRoute = () => {
    this.props.createRoute(this.props.tracks);
  }

	render() {
    const { mapDetailsInputChange, noOfHouses, routeTotals } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
			<Layout title="MapRoutes">
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
        		{ ...this.props }
				  />
          <Dialog
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <TrackDetails noOfHouses={noOfHouses} onChangeHandle={mapDetailsInputChange} />
          </Dialog>
          <div style={styles.routInfo}>
            <div> Total Distance: {routeTotals.distance.toFixed(2)} Km </div>
            <div>No Houses: {routeTotals.noOfHouses}</div>
            <RaisedButton label="Create Route" style={styles.button} disabled={routeTotals.noOfHouses < 100} onTouchTap={this.onCreateRoute} />
          </div>
				</div>
			</Layout>);
	}
}

MapRoutes.propTypes = {
  trackingStatus: PT.bool,
  errors: PT.object,
  center: PT.object,
  routeTotals: PT.object,
  tracks: PT.array,
  noOfHouses: PT.string,
  path: PT.array,
  updateLocation: PT.func,
  addOrRemoveTrack: PT.func,
  setCurrentLocation: PT.func,
  createRoute: PT.func,
  createTrack: PT.func,
  mapDetailsInputChange: PT.func,
  loadPath: PT.func,
};

const mapStateToProps = ({ map, routes }) => ({
  trackingStatus: map.tracking,
  errors: map.errors,
  center: map.defaultLocation,
  path: map.path,
  noOfHouses: map.noOfHouses,
  tracks: map.tracks,
  routeTotals: map.total,
});

const mapDispatchToProps = dispatch => ({
    updateLocation: (location) => dispatch(actions.updateLocation(location)),
    setCurrentLocation: (location) => dispatch(actions.setCurrentLocation(location)),
    createTrack: () => dispatch(actions.createTrack()),
    createRoute: () => dispatch(routeActions.createRoute()),
    mapDetailsInputChange: (change) => dispatch(actions.mapDetailsInputChange(change)),
    addOrRemoveTrack: (track) => dispatch(actions.addOrRemoveTrack(track)),
    loadPath: () => dispatch(actions.loadPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapRoutes);

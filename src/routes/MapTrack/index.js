import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as actions from 'actions/map';
import { withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/async/withScriptjs';
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

const loadPaths = tracks =>
  tracks.map((track, index) => {
    const path =
      track.coords &&
      track.coords.map(pos => ({
        lat: parseFloat(pos.latitude),
        lng: parseFloat(pos.longitude),
      }));
    if (path) {
      const pathCenter = path[Math.trunc(path.length / 2)];
      return [
        <Polyline
          options={{ strokeColor: '#29b3ec', geodesic: true, path }}
          key={index}
        />,
        <Marker
          position={pathCenter}
          icon={symbolOne}
          label={{
            text: track.noOfHouses.toString(),
            color: 'black',
            fontSize: '8px',
          }}
        />,
      ];
    }
  });

const TrackGoogleMap = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={18}
    center={props.center}
    options={{ disableDefaultUI: true }}
  >
    {props.tracks && loadPaths(props.tracks)}
    {props.path &&
      <Polyline
        options={{ strokeColor: '#2e10ff', geodesic: true, path: props.path }}
      />}
  </GoogleMap>
);

const styles = {
  loading: {
    height: '100%',
  },
  container: {
    height: '100%',
  },
  map: {
    height: window.innerHeight - 110,
    width: `100%`,
  },
  button: {
    height: 50,
  },
};

class MapTrack extends Component {
  state = {
    open: false,
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.props.setCurrentLocation(pos.coords);
        this.props.loadPath();
      },
      err => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      }
    );
  }

  onStartTracking = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 0,
    };

    this.watchId = navigator.geolocation.watchPosition(
      pos => {
        console.log(pos.coords);
        this.props.updateLocation(pos.coords);
      },
      err => {
        console.warn('ERROR(' + err.code + '): ' + err.message);
      },
      options
    );
  };

  onStopTracking = () => {
    this.setState({ open: true });
    navigator.geolocation.clearWatch(this.watchId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.props.createTrack();
    this.setState({ open: false });
  };

  render() {
    const {
      path,
      center,
      trackingStatus,
      mapDetailsInputChange,
      noOfHouses,
      tracks,
    } = this.props;
    const touchTapFunction = trackingStatus
      ? this.onStopTracking
      : this.onStartTracking;
    const buttonText = trackingStatus ? 'Stop' : 'Start';
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
      <Layout title="MapTrack">
        <div id="page-index" className="page" style={{ paddingTop: 60 }}>
          <TrackGoogleMap
            loadingElement={
              <div style={styles.loading}>
                <CircularProgress />
              </div>
            }
            containerElement={<div style={styles.container} />}
            mapElement={<div style={styles.map} />}
            path={path}
            center={center}
            tracks={tracks}
            noOfHouses={noOfHouses}
          />
          <Dialog actions={actions} modal={true} open={this.state.open}>
            <TrackDetails
              noOfHouses={noOfHouses}
              onChangeHandle={mapDetailsInputChange}
            />
          </Dialog>
          <RaisedButton
            label={buttonText}
            fullWidth={true}
            style={styles.button}
            onTouchTap={touchTapFunction}
          />
        </div>
      </Layout>
    );
  }
}

MapTrack.propTypes = {
  trackingStatus: PT.bool,
  errors: PT.object,
  center: PT.object,
  tracks: PT.array,
  noOfHouses: PT.string,
  path: PT.array,
  updateLocation: PT.func,
  setCurrentLocation: PT.func,
  createTrack: PT.func,
  mapDetailsInputChange: PT.func,
  loadPath: PT.func,
};

const mapStateToProps = ({ map }) => ({
  trackingStatus: map.tracking,
  errors: map.errors,
  center: map.defaultLocation,
  path: map.path,
  noOfHouses: map.noOfHouses,
  tracks: map.tracks,
});

const mapDispatchToProps = dispatch => ({
  updateLocation: location => dispatch(actions.updateLocation(location)),
  setCurrentLocation: location =>
    dispatch(actions.setCurrentLocation(location)),
  createTrack: () => dispatch(actions.createTrack()),
  mapDetailsInputChange: change =>
    dispatch(actions.mapDetailsInputChange(change)),
  loadPath: () => dispatch(actions.loadPath()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapTrack);

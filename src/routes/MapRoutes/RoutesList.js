import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import { calDistanceKm } from 'utils/map';
import OpenMap from 'material-ui/svg-icons/action/launch';
import { Link } from 'react-router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import * as actions from 'actions/routes';
import Layout from '../Layout';

const styles = {
  loading: {
    height: '100%',
  },
};

class RoutesList extends Component {

  componentDidMount() {
    this.props.loadRoutes();
  }

  getTrackTotals(tracks) {
    let distance = 0;
    let noOfHouses = 0;

    tracks.map(track => {
      const { coords } = track;
      distance = distance + calDistanceKm(coords[0], coords[coords.length - 1]);
      noOfHouses = noOfHouses + track.noOfHouses;
    });

    return { distance, noOfHouses };
  }


  getRoutes(routes) {
    return routes && routes.map((route, index) => {
      const totals  = this.getTrackTotals(route.tracks);
      return (
        <TableRow key={index}>
          <TableRowColumn key={index+1} >{index}</TableRowColumn>
          <TableRowColumn key={index+2} >{route.name}</TableRowColumn>
          <TableRowColumn key={index+3} >{totals.distance.toFixed(2)}</TableRowColumn>
          <TableRowColumn key={index+4} >{totals.noOfHouses}</TableRowColumn>
          <TableRowColumn key={index+5} >
            <Link to={`/routes/${route.id}`} ><OpenMap style={{ width: 20 }}/></Link></TableRowColumn>
        </TableRow>
      );
    });
  }

  render() {
    return (
      <Layout title="RoutesList">
        <div id="page-index" className="page" style={{ paddingTop: 60 }}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>No.</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Distance</TableHeaderColumn>
                <TableHeaderColumn>Houses</TableHeaderColumn>
                <TableHeaderColumn>View</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody  displayRowCheckbox={false}>
              {this.getRoutes(this.props.routes)}
            </TableBody>
          </Table>
        </div>
      </Layout>
    );
  }
}

RoutesList.propTypes = {
  routes: PT.array,
};

const mapStateToProps = ({ routes }) => ({
  routes: routes.routes,
});

const mapDispatchToProps = dispatch => ({
  loadRoutes: () => dispatch(actions.loadRoutes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutesList);

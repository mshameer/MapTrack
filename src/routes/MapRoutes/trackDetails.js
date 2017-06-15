import React, { Component } from 'react';
import PT from 'prop-types';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

class TrackDetails extends Component {
  static propTypes = {
    errors: PT.object,
    noOfHouses: PT.string,
    onChangeHandle: PT.func,
  };

  static defaultProps = {
    errors: {},
    onChangeHandle: () => {},
  };

  onChangeHandle(e, value) {
    this.props.onChangeHandle({ [e.target.name]: e.target.value });
  }

  render() {
    const { noOfHouses, errors } = this.props;
    const error_message = errors.noOfHouses || false;

    return (
      <form>
        <TextField
          name="noOfHouses"
          hintText="Houses"
          floatingLabelText="No of Houses"
          fullWidth={true}
          value={noOfHouses}
          onChange={::this.onChangeHandle}
        />
        <Snackbar
          open={!!error_message}
          message={error_message}
          autoHideDuration={2000}
        />
      </form>
    );
  }
}

export default TrackDetails;

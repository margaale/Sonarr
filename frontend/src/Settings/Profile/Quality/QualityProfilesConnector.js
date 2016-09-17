import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import autobind from 'autobind-decorator';
import { fetchQualityProfiles, deleteQualityProfile } from 'Stores/Actions/settingsActions';
import { fetchLanguages } from 'Stores/Actions/languageActions';
import QualityProfiles from './QualityProfiles';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.advancedSettings,
    (state) => state.settings.qualityProfiles,
    (advancedSettings, qualityProfiles) => {
      return {
        advancedSettings,
        ...qualityProfiles
      };
    }
  );
}

const mapDispatchToProps = {
  fetchQualityProfiles,
  deleteQualityProfile,
  fetchLanguages
};

class QualityProfilesConnector extends Component {

  //
  // Lifecycle

  componentWillMount() {
    this.props.fetchQualityProfiles();
    this.props.fetchLanguages();
  }

  //
  // Listeners

  @autobind
  onConfirmDeleteQualityProfile(id) {
    this.props.deleteQualityProfile({ id });
  }

  //
  // Render

  render() {
    return (
      <QualityProfiles
        onConfirmDeleteQualityProfile={this.onConfirmDeleteQualityProfile}
        {...this.props}
      />
    );
  }
}

QualityProfilesConnector.propTypes = {
  fetchQualityProfiles: PropTypes.func.isRequired,
  deleteQualityProfile: PropTypes.func.isRequired,
  fetchLanguages: PropTypes.func.isRequired
};

export default connect(createMapStateToProps, mapDispatchToProps)(QualityProfilesConnector);

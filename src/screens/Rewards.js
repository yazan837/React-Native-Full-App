import React from 'react';
import {Text, View} from 'react-native';
import RewarsCard from '../components/RewarsCard';
import Page from '../components/Page';
import reacttotron from '../redux/Reactotron';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import actions from '../redux/actions';
const {fetchRewards, fetchCategory} = actions;
class Rewards extends React.Component {
  componentDidMount() {
    this.props.fetchRewards();
    this.props.fetchCategory();
  }
  render() {
    return (
      <Page
        isLoading={this.props.isFethingCategory}
        isError={this.props.isFethingCategoryError}>
        <RewarsCard
          data={this.props.category}
          rewards={this.props.rewards}
          total={this.props.Total}
        />
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  isFethingCategory: state.home.isFethingCategory,
  isFethingCategoryError: state.home.isFethingCategoryError,
  rewards: state.home.rewards,
  category: state.home.category,
  Total: state.home.totalPoints,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchRewards, fetchCategory}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Rewards);

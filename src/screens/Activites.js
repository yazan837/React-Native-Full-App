import React from 'react'
import {Text, View} from 'react-native'
import reacttotron from '../redux/Reactotron'
import ActivitesCard from '../components/ActivitesCard'
import Page from '../components/Page'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import actions from '../redux/actions'
const {fetchAllactivity, fetchActivityCategory} = actions
class Activites extends React.Component {
  componentDidMount () {
    this.props.fetchAllactivity()
    this.props.fetchActivityCategory()
  }
  render () {
    return (
      <Page
        isLoading={this.props.isFethingAllactivity}
        isError={this.props.isFethingAllactivityError}>
        <ActivitesCard
          data={this.props.allactivities}
          total={this.props.Total}
          cat={this.props.category}
        />
      </Page>
    )
  }
}

const mapStateToProps = state => ({
  isFethingAllactivity: state.home.isFethingAllactivity,
  isFethingAllactivityError: state.home.isFethingAllactivityError,
  allactivities: state.home.allactivities,
  Total: state.home.totalPoints,
  category: state.home.activitycategory,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({fetchAllactivity, fetchActivityCategory}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Activites)

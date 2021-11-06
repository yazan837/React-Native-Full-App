import React from 'react';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {BackHandler} from 'react-native';
import actions from './src/redux/actions';
const {startUp} = actions;
import {NavigationActions} from 'react-navigation';
class App extends React.Component {
  state = {loaded: false};
  async componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   navigation.goBack();
    //   return true;
    // });

    this.Navigation = (await import('./src/navigation')).default;
    store.dispatch(startUp());
    await this.setState({loaded: true});
  }

  // componentWillUnmount = () => {
  //   BackHandler.removeEventListener('hardwareBackPress');
  // };
  Navigation = () => null;

  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <Provider store={store}>
        <this.Navigation />
      </Provider>
    );
  }
}

export default App;

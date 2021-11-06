import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

import Reactotron from './Reactotron';

const sagaMiddleware = createSagaMiddleware();
export default createStore(
  reducers,
  {},
  compose(
    applyMiddleware(sagaMiddleware),
    Reactotron.createEnhancer(),
  ),
);
sagaMiddleware.run(sagas);

//adb reverse tcp:9090 tcp:9090
//adb reverse tcp:8081 tcp:8081

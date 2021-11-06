import { fork } from 'redux-saga/effects';

import * as auth from './groups/auth';
import * as profile from './groups/profile';
import * as home from './groups/home'
const sagas = Object.values({
    ...auth,
    ...profile,
    ...home
});

export default function* root() {
    for (let index = 0; index < sagas.length; index++) {
        yield fork(sagas[index]);
    }
}


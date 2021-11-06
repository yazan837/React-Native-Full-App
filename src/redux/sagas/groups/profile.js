import {put, takeLatest, call, all, select} from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'
import {
  fetchProfile,
  patchProfile,
  uploadProfilePhoto,
} from '../../network/profile'
import reacttotron from '../../Reactotron'

import {Alert} from 'react-native'

import actions from '../../actions'
import reactotron from 'reactotron-react-native'
const {GET_PROFILE, getProfileDone, setField, UPDATE_PROFILE_USER} = actions

function * performGetProfile () {
  try {
    const result = yield call(fetchProfile)
    reacttotron.log('result', result)
    if (result.networkSuccess) {
      yield put(getProfileDone({data: result.formData}))

      yield all([
        put(
          setField({
            name: 'userName',
            value: `${result.formData.firstName} ${result.formData.lastName}`,
          }),
        ),
        put(
          setField({
            name: 'mobile',
            value: result.formData.meta.filter(item => item.key === 'mobile')[0]
              ? result.formData.meta.filter(item => item.key === 'mobile')[0]
                  .value
              : '',
          }),
        ),
        put(
          setField({
            name: 'birthday',
            value: result.formData.meta.filter(
              item => item.key === 'birthday',
            )[0]
              ? result.formData.meta.filter(item => item.key === 'birthday')[0]
                  .value
              : '',
          }),
        ),
        put(
          setField({
            name: 'city',
            value: result.formData.meta.filter(item => item.key === 'city')[0]
              ? result.formData.meta.filter(item => item.key === 'city')[0]
                  .value
              : '',
          }),
        ),
        put(
          setField({
            name: 'country',
            value: result.formData.meta.filter(
              item => item.key === 'country',
            )[0]
              ? result.formData.meta.filter(item => item.key === 'country')[0]
                  .value
              : '',
          }),
        ),
      ])
    } else {
      yield put(getProfileDone({data: {}}))
    }
  } catch {
    Alert.alert('Sorry', 'Network error')
    return
  }
}

export function * watchGetProfile () {
  yield takeLatest(GET_PROFILE, performGetProfile)
}

function * performUpdateProfile ({field, data}) {
  const value = yield select(state => state.fields[field])
  const profile = yield select(state => state.profile.data)

  let patchedProfile = {}
  if (field === 'userName') {
    const data = value.split(' ')
    const firstName = data[0] || ''
    const lastName = data[1] || ''
    patchedProfile = {firstName, lastName}
  } else if (field === 'photo') {
    const formData = new FormData()
    const photo = {
      uri: data.uri,
      type: data.type,
      name: data.fileName,
    }
    formData.append('file', photo)

    const result = yield call(uploadProfilePhoto, formData)

    
    if (result.status === 200) {
      patchedProfile = {
        ...profile,
        picture: result.data.path.replace(
          'http://services.larsa.io/files/file/',
          '',
        ),
      }
    }
  } else if (field === 'meta') {
    const {mobile, birthday, city, country} = yield select(
      state => state.fields,
    )

    patchedProfile = {
      ...profile,
      meta: [
        {key: 'mobile', value: `${mobile}`},
        {key: 'birthday', value: `${birthday}`},
        {key: 'city', value: `${city}`},
        {key: 'country', value: `${country}`},
      ].filter(item => item.value),
    }
  }

  try {
    const result = yield call(patchProfile, patchedProfile)
    
    if (result.networkSuccess) {
      yield put(getProfileDone({data: result.formData.user}))

      yield all([
        put(
          setField({
            name: 'userName',
            value: `${result.formData.user.firstName} ${result.formData.user.lastName}`,
          }),
        ),
        put(
          setField({
            name: 'mobile',
            value: result.formData.user.meta.filter(
              item => item.key === 'mobile',
            )[0]
              ? result.formData.user.meta.filter(
                  item => item.key === 'mobile',
                )[0].value
              : '',
          }),
        ),
        put(
          setField({
            name: 'birthday',
            value: result.formData.user.meta.filter(
              item => item.key === 'birthday',
            )[0]
              ? result.formData.user.meta.filter(
                  item => item.key === 'birthday',
                )[0].value
              : '',
          }),
        ),
        put(
          setField({
            name: 'city',
            value: result.formData.user.meta.filter(
              item => item.key === 'city',
            )[0]
              ? result.formData.user.meta.filter(item => item.key === 'city')[0]
                  .value
              : '',
          }),
        ),
        put(
          setField({
            name: 'country',
            value: result.formData.user.meta.filter(
              item => item.key === 'country',
            )[0]
              ? result.formData.user.meta.filter(
                  item => item.key === 'country',
                )[0].value
              : '',
          }),
        ),
      ])
    } else {
      yield put(getProfileDone({data: profile}))
    }
  } catch {
    Alert.alert('Sorry', 'Network error')
    return
  }
}

export function * watchUpdateProfile () {
  yield takeLatest(UPDATE_PROFILE_USER, performUpdateProfile)
}

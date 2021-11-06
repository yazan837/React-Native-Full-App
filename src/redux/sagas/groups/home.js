import {put, takeLatest, call, select} from 'redux-saga/effects'
import {
  fetchActivity as fetchActivityApi,
  fetchMyRewards,
  fetchRewards,
  fetchAllactivity,
  fetchAbout,
  uploadfile,
  fetchDashbord,
  fetchVendors,
  fetchCategory,
  uploadPhoto,
  fetchCopon,
  takeAward,
  fetchActivityCategory,
} from '../../network/General'
import actions from '../../actions'
import reactotron from 'reactotron-react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {Alert} from 'react-native'
const {
  completeFetchActivity,
  FETCH_ACTIVITY,
  completeFetchAllactivity,
  FETCH_ALLACTIVITY,
  FETCH_REWARDS,
  FETCH_DASHBORD,
  completeFetchDashbord,
  completeFetchRewards,
  FETCH_VENDORS,
  completeFetchVendors,
  FETCH_ABOUT,
  completeFetchAbout,
  SEND_DOCUMENT,
  sendDocumentFailed,
  sendDocumentSuccess,
  FETCH_CATEGORY,
  completeFetchCategory,
  FETCH_ACTIVITY_CATEGORY,
  completeFetchActivityCategory,
  UPLOAD_PHOTO,
  getUploadDone,
  TAKE_AWARD,
  completeTakeAward,
  fetchActivity,
  setField,
  GET_POINTS,
  getPointsDone,
  getPoints,
} = actions

//functions for activity
function * performFetchActivity ({userId}) {
  try {
    const result = yield call(fetchActivityApi, userId)

    reactotron.log('result', result)
    if (result.networkSuccess && result.formData.contents != null) {
      yield put(completeFetchActivity({data: result.formData.contents}))
    } else yield put(completeFetchActivity({data: []}))
  } catch {
    yield put(completeFetchActivity({data: []}))
    return
  }
}

export function * watchFetchActivity () {
  yield takeLatest(FETCH_ACTIVITY, performFetchActivity)
}

function * performGetPoints ({userId}) {
  let activityPoints = 0
  let awardsPoints = 0
  try {
    const activityResult = yield call(fetchActivityApi, userId)
    if (
      activityResult.networkSuccess &&
      activityResult.formData.contents != null
    ) {
      activityPoints =
        activityResult.formData.contents
          // .filter(item => item.statusApp == 'accept')
          .reduce(
            (prevValue, currentValue) => prevValue + currentValue.earnPoints,
            0,
          ) || 0
    }
    const RewardsResult = yield call(fetchMyRewards, userId)
    if (
      RewardsResult.networkSuccess &&
      RewardsResult.formData.contents != null
    ) {
      awardsPoints =
        RewardsResult.formData.contents.reduce(
          (prevValue, currentValue) =>
            prevValue + parseInt(currentValue.points),
          0,
        ) || 0
    }

    yield put(getPointsDone({points: activityPoints - awardsPoints}))
  } catch {
    yield put(getPointsDone({points: activityPoints - awardsPoints}))
    return
  }
}

export function * watchGetPoints () {
  yield takeLatest(GET_POINTS, performGetPoints)
}
//functions for coupon
function * performTakeAward ({data}) {
  const profile = yield select(state => state.profile)
  try {
    const coupon = yield call(fetchCopon, {reward_id: data._id})

    if (coupon.networkSuccess) {
      const result = yield call(takeAward, {
        unique_code: coupon.formData.coupon.unique_code,
        responsible_party_id: coupon.formData.coupon.responsible_party_id,
        user_id: profile.data._id,
        reward_id: data._id,
        points: data.points,
        user_name: profile.data.firstName+''+profile.data.lastName,
      })
     

      if (result.networkSuccess) {
        yield put(setField({name: 'agreeModal', value: true}))
        yield put(setField({name: 'submitModal', value: false}))
        yield put(
          setField({
            name: 'couponCode',
            value: coupon.formData.coupon.unique_code,
          }),
        )
        yield put(getPoints({userId: profile.data._id}))
      } else {
        Alert.alert(
          'Sorry',
          'Something went wrong please try again or pick another reward',
        )
        yield put(setField({name: 'agreeModal', value: false}))
        yield put(setField({name: 'submitModal', value: false}))
      }
    } else {
      Alert.alert(
        'Sorry',
        'Something went wrong please try again or pick another reward',
      )
      yield put(setField({name: 'agreeModal', value: false}))
      yield put(setField({name: 'submitModal', value: false}))
    }
  } catch {
    Alert.alert(
      'Sorry',
      'Something went wrong please try again or pick another reward',
    )
    yield put(setField({name: 'agreeModal', value: false}))
    yield put(setField({name: 'submitModal', value: false}))
    return
  }
}

export function * watchTakeAward () {
  yield takeLatest(TAKE_AWARD, performTakeAward)
}
//functions for past  activity
function * performFetchAllactivity ({formData}) {
  try {
    const result = yield call(fetchAllactivity, formData)
    if (result.networkSuccess) {
      yield put(completeFetchAllactivity({formData: result}))
    } else yield put(completeFetchAllactivity({formData: []}))
  } catch {
    yield put(completeFetchAllactivity({formData: []}))
    return
  }
}

export function * watchFetchAllactivity () {
  yield takeLatest(FETCH_ALLACTIVITY, performFetchAllactivity)
}
// function for upload photo
function * performUploadPhoto ({data}) {
  const formData = new FormData()
  const photo = {
    uri: data.uri ? data.uri : data.path,
    type: data.type ? data.type : data.mime,
    name: data.name ? data.name : data.modificationDate,
  }
  formData.append('file', photo)
  const result = yield call(uploadPhoto, formData)
  if (result.status === 200) {
    yield put(getUploadDone({data: result.data}))
  }
}

export function * watchUploadPhoto () {
  yield takeLatest(UPLOAD_PHOTO, performUploadPhoto)
}
//functions for dashbord
function * performFetchDashbord ({formData}) {
  try {
    const result = yield call(fetchDashbord, formData)
    if (result.networkSuccess) {
      yield put(completeFetchDashbord({formData: result}))
    } else yield put(completeFetchDashbord({formData: []}))
  } catch {
    yield put(completeFetchDashbord({formData: []}))
    return
  }
}

export function * watchFetchDashbord () {
  yield takeLatest(FETCH_DASHBORD, performFetchDashbord)
}
//functions for vendors
function * performFetchVendors ({formData}) {
  try {
    const result = yield call(fetchVendors, formData)
    if (result.networkSuccess) {
      yield put(completeFetchVendors({formData: result}))
    } else yield put(completeFetchVendors({formData: []}))
  } catch {
    yield put(completeFetchVendors({formData: []}))
    return
  }
}

export function * watchFetchVendors () {
  yield takeLatest(FETCH_VENDORS, performFetchVendors)
}
//functions for rewards
function * performFetchRewards ({formData}) {
  try {
    const result = yield call(fetchRewards, formData)
    if (result.networkSuccess) {
      yield put(completeFetchRewards({formData: result}))
    } else yield put(completeFetchRewards({formData: []}))
  } catch {
    yield put(completeFetchRewards({formData: []}))
    return
  }
}

export function * watchFetchRewards () {
  yield takeLatest(FETCH_REWARDS, performFetchRewards)
}
//functions for category
function * performFetchCategory ({formData}) {
  try {
    const result = yield call(fetchCategory, formData)
    if (result.networkSuccess) {
      yield put(completeFetchCategory({formData: result}))
    } else yield put(completeFetchCategory({formData: []}))
  } catch {
    yield put(completeFetchCategory({formData: []}))
    return
  }
}

export function * watchFetchCategory () {
  yield takeLatest(FETCH_CATEGORY, performFetchCategory)
}
//functions for activity category
function * performFetchActivityCategory ({formData}) {
  try {
    const result = yield call(fetchActivityCategory, formData)
    if (result.networkSuccess) {
      yield put(completeFetchActivityCategory({formData: result}))
    } else yield put(completeFetchActivityCategory({formData: []}))
  } catch {
    yield put(completeFetchActivityCategory({formData: []}))
    return
  }
}

export function * watchFetchActivityCategory () {
  yield takeLatest(FETCH_ACTIVITY_CATEGORY, performFetchActivityCategory)
}
//functions for about us
function * performFetchAbout ({formData}) {
  try {
    const result = yield call(fetchAbout, formData)
    reactotron.log('result for about us', result)
    if (result.networkSuccess) {
      yield put(completeFetchAbout({formData: result}))
    } else yield put(completeFetchAbout({formData: []}))
  } catch {
    yield put(completeFetchAbout({formData: []}))
    return
  }
}

export function * watchFetchAbout () {
  yield takeLatest(FETCH_ABOUT, performFetchAbout)
}
// send document
export function * watchSendDocument () {
  yield takeLatest(SEND_DOCUMENT, performSendDocument)
}

function * performSendDocument ({formData}) {
  const result = yield call(uploadfile, formData)
  const profile = yield select(state => state.profile)

  if (result.networkSuccess) {
    yield put(sendDocumentSuccess({}))
    yield put(getPoints({userId: profile.data._id}))
  } else {
    yield put(sendDocumentFailed())
  }
}

import actions from '../../actions/index'
import {combineReducers} from 'redux'

const {
  FETCH_ACTIVITY,
  COMPLETE_FETCH_ACTIVITY,
  FETCH_DASHBORD,
  COMPLETE_FETCH_DASHBORD,
  FETCH_ALLACTIVITY,
  COMPLETE_FETCH_ALLACTIVITY,
  FETCH_REWARDS,
  COMPLETE_FETCH_REWARDS,
  FETCH_ABOUT,
  COMPLETE_FETCH_ABOUT,
  FETCH_VENDORS,
  COMPLETE_FETCH_VENDORS,
  FETCH_CATEGORY,
  COMPLETE_FETCH_CATEGORY,
  FETCH_ACTIVITY_CATEGORY,
  COMPLETE_FETCH_ACTIVITY_CATEGORY,
  UPLOAD_PHOTO,
  GET_UPLOAD_DONE,
  GET_POINTS_DONE,
} = actions

const initState = false

//for activity
const isFethingActivity = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITY: {
      return true
    }
    case COMPLETE_FETCH_ACTIVITY: {
      return false
    }
    default: {
      return state
    }
  }
}

const activities = (state = [], action) => {
  switch (action.type) {
    case COMPLETE_FETCH_ACTIVITY:
      return action.data
    default:
      return state
  }
}
const totalPoints = (state = 0, action) => {
  switch (action.type) {
    // case COMPLETE_FETCH_ACTIVITY:
    //   return (
    //     action.data
    //       // .filter(item => item.statusApp == 'accept')
    //       .reduce(
    //         (prevValue, currentValue) => prevValue + currentValue.earnPoints,
    //         0,
    //       ) || []
    //   );
    case GET_POINTS_DONE:
      return action.points
    default:
      return state
  }
}
//for all activity
const isFethingAllactivity = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ALLACTIVITY: {
      return true
    }
    case COMPLETE_FETCH_ALLACTIVITY: {
      return false
    }
    default: {
      return state
    }
  }
}

const isFethingAllactivityError = (state = initState, action) => {
  switch (action.type) {
    case COMPLETE_FETCH_ALLACTIVITY:
      return !action.formData.networkSuccess
    default: {
      return state
    }
  }
}

const allactivities = (state = [], action) => {
  switch (action.type) {
    case COMPLETE_FETCH_ALLACTIVITY:
      return action.formData.formData.contents || []
    default:
      return state
  }
}
// upload photo
const isUploadingPhoto = (state = true, action) => {
  switch (action.type) {
    case UPLOAD_PHOTO:
      return Boolean(action.data)
    case GET_UPLOAD_DONE:
      return false
    default:
      return state
  }
}
const data = (state = {}, action) => {
  switch (action.type) {
    case GET_UPLOAD_DONE:
      return action.data
    default:
      return state
  }
}
//for rewards
const isFethingRewards = (state = initState, action) => {
  switch (action.type) {
    case FETCH_REWARDS: {
      return true
    }
    case COMPLETE_FETCH_REWARDS: {
      return false
    }
    default: {
      return state
    }
  }
}

const isFethingRewardsError = (state = initState, action) => {
  switch (action.type) {
    case COMPLETE_FETCH_REWARDS:
      return !action.formData.networkSuccess
    default: {
      return state
    }
  }
}

const rewards = (state = [], action) => {
  switch (action.type) {
    case COMPLETE_FETCH_REWARDS:
      return action.formData.formData.contents || []
    default:
      return state
  }
}

//for category
const isFethingCategory = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ACTIVITY_CATEGORY:
    case FETCH_CATEGORY:
      return true
    case COMPLETE_FETCH_CATEGORY:
    case COMPLETE_FETCH_ACTIVITY_CATEGORY:
      return false
    default: {
      return state
    }
  }
}

const isFethingCategoryError = (state = initState, action) => {
  switch (action.type) {
    case COMPLETE_FETCH_CATEGORY:
    case COMPLETE_FETCH_ACTIVITY_CATEGORY:
      return !action.formData.networkSuccess
    default: {
      return state
    }
  }
}

const category = (state = [], action) => {
  switch (action.type) {
    case COMPLETE_FETCH_CATEGORY:
      return action.formData.formData.contents || []
    default:
      return state
  }
}
const activitycategory = (state = [], action) => {
  switch (action.type) {
    case COMPLETE_FETCH_ACTIVITY_CATEGORY:
      return action.formData.formData.contents || []
    default:
      return state
  }
}
//for dashbord
const isFethingDashbord = (state = initState, action) => {
  switch (action.type) {
    case FETCH_DASHBORD: {
      return true
    }
    case COMPLETE_FETCH_DASHBORD: {
      return false
    }
    default: {
      return state
    }
  }
}

const isFethingDashbordError = (state = initState, action) => {
  switch (action.type) {
    case COMPLETE_FETCH_DASHBORD:
      return !action.formData.networkSuccess
    default: {
      return state
    }
  }
}

const dashbord = (state = [], action) => {
  switch (action.type) {
    case COMPLETE_FETCH_DASHBORD:
      return action.formData.formData.contents || []
    default:
      return state
  }
}
//for vendors
const isFethingVendors = (state = initState, action) => {
  switch (action.type) {
    case FETCH_VENDORS: {
      return true
    }
    case COMPLETE_FETCH_VENDORS: {
      return false
    }
    default: {
      return state
    }
  }
}

const isFethingVendorsError = (state = initState, action) => {
  switch (action.type) {
    case COMPLETE_FETCH_VENDORS:
      return !action.formData.networkSuccess
    default: {
      return state
    }
  }
}

const vendors = (state = [], action) => {
  switch (action.type) {
    case COMPLETE_FETCH_VENDORS:
      return action.formData.formData.contents || []
    default:
      return state
  }
}
//for about us page
const isFethingAbout = (state = initState, action) => {
  switch (action.type) {
    case FETCH_ABOUT: {
      return true
    }
    case COMPLETE_FETCH_ABOUT: {
      return false
    }
    default: {
      return state
    }
  }
}

const isFethingAboutError = (state = initState, action) => {
  switch (action.type) {
    case COMPLETE_FETCH_ABOUT:
      return !action.formData.networkSuccess
    default: {
      return state
    }
  }
}

const about = (state = [], action) => {
  switch (action.type) {
    case COMPLETE_FETCH_ABOUT:
      return action.formData.formData.contents || []
    default:
      return state
  }
}

export default combineReducers({
  isFethingActivity,
  activities,
  isFethingAllactivity,
  isFethingAllactivityError,
  allactivities,
  isFethingRewards,
  isFethingRewardsError,
  rewards,
  isFethingAbout,
  isFethingAboutError,
  about,
  isFethingDashbord,
  isFethingDashbordError,
  dashbord,
  isFethingVendors,
  isFethingVendorsError,
  vendors,
  isFethingCategory,
  isFethingCategoryError,
  category,
  isUploadingPhoto,
  data,
  totalPoints,
  activitycategory,
})

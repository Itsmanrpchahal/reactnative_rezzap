import {combineReducers} from 'redux';
import auth from '@root/store/login/reducer';
import myProfile from '@root/store/my-profile/reducer';
import mySupporters from '@root/store/user-supporter/reducer'
import myGraph from '@root/store/my-graph/reducer'
import spinData from '@root/store/spin/reducer'
import interest from '@root/store/interests/reducer'
import timeline from '@root/store/timeline/reducer'
import profilePicture from '@root/store/uploadPicture/reducer'
import signUpData from '@root/store/register/reducer'
import updatedProfileData from '@root/store/updateProfile/reducer'
import resumeData from '@root/store/resume/reducer'
import resumeCData from '@root/store/resumeCategory/reducer'
import messageListData from '@root/store/message/reducer'
import categoryData from '@root/store/categories/reducer'
import supportUnsupportData from '@root/store/supportUnsupport/reducer'
import notificationsData from '@root/store/notifictions/reducer'
import addCommemtData  from '@root/store/addComment/reducer'
import findSupporterData from '@root/store/findSupporter/reducer'
import collegeStateData from '@root/store/college/reducer'
import collegeListData from '@root/store/collegeList/reducer'
import dreamCollegeData from '@root/store/dreamCollege/reducer'
import allcollegeData from '@root/store/allCollegeList/reducer'



const reducers = combineReducers({
  auth,
  myProfile,
  mySupporters,
  myGraph,
  spinData,
  interest,
  timeline,
  profilePicture,
  signUpData,
  updatedProfileData,
  resumeData,
  messageListData,
  categoryData,
  supportUnsupportData,
  notificationsData,
  resumeCData,
  addCommemtData,
  findSupporterData,
  collegeStateData,
  collegeListData,
  dreamCollegeData,
  allcollegeData
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;

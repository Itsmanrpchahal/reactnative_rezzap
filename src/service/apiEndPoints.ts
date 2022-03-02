const baseURL = 'https://www.rezzap.com/app/api/';

const apiUri = {
  auth: {
    login: 'login', //email,password
    register :'register'
  },

  myProfile :'profile-me',
  updateProfile :'update-profile?',
  mySupporter : 'supporter/list',
  myGraph :'category/show-graph', 
  allSpin :'spin/list',
  mySpin :'spin/my-list',
  supporterProfile : 'supporter/profile?supporter_id=' ,// need to send supporter_id
  supportersSupporterList :'supporter/supporter-list?supporter_id=' ,// need to send supporter_id
  supportersGraphList :'supporter/category-graph-list?supporter_id=' ,// need to send supporter_id
  supportersInterestList : 'supporter/interests-list?supporter_id=',

  interests : '/interests/show',
  deleteInterest :'interests/destroy?id=',
  addInterest: 'interests/store',
  update_Interest: 'interests/update',

  activityShow :'activity/show',
  supporterActivityShow :'supporter/activity-list?supporter_id=',
  searchActivity:'activity/category-activity?category_id=',

  profilePictureUpload : 'update-profile-pic',

  resumeList :'resume/my-resumes',
  resume_Detail:'resume/resume-details?resume_id=',
  resumeCategorylist:'resume/category-list',
  delete_Resume:'resume/delete?id=',
  add_Resume:'resume/add?',
  resume_Activity:'/activity/category-activity?category_id=',

  add_Comment : 'activity/add-comment?',
  delete_Comment:'activity/delete-comment?id=',

  messageList : 'message/supporter-list',
  messageDetail :'message/chat-list?supporter_id=',
  sendMessage : 'message/send-message?',
  searchSupporter :'message/search-supporter?keyword=',
  showCategories:'category/show',
  addCategory:'category/store?title=',
  deleteCategory:'category/destroy?id=',
  storeCategory:'category/store-categories?category_ids=',
  categoryUpdate:'category/update?',
  

  supportUnsupportapi : 'activity/support-unsupport?',
  deleteActivity : 'activity/destroy?id=',

  notifications :'notifications',
  clearNotificatins:'notifications/clear-all',
  followUnfollow : 'spin/follow-unfollow?',

  sendemail : 'password/reset?email=',
  resetPassword : 'password/reset-password?',
  find_Supporter:'supporter/find?keyword=',
  addSupporter:'supporter/send-invite?to_user=',
  deleteSupporter:'supporter/remove?to_user=',

  collegeStateList:'college/state-list',
  collegeList:'college/school-type-list',
  dreamCollege:'college/dream-colleges',
  allCollegeList:'college/list',
  searchStateSchool :'college/search-state-school?state=',
  searchCollegeKeyword:'college/search-college?keyword='
};

export {apiUri, baseURL};

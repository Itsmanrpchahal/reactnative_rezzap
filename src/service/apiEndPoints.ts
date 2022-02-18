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

  interests : '/interests/show',
  deleteInterest :'interests/destroy?id=',
  addInterest: 'interests/store',
  update_Interest: 'interests/update',

  activityShow :'activity/show',
  supporterActivityShow :'supporter/activity-list?supporter_id=',
  profilePictureUpload : 'update-profile-pic',

  resumeList :'resume/my-resumes',
  resume_Detail:'resume/resume-details?resume_id=',
  resumeCategorylist:'resume/category-list',
  delete_Resume:'resume/delete?id=',

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
  followUnfollow : 'spin/follow-unfollow?'

};

export {apiUri, baseURL};

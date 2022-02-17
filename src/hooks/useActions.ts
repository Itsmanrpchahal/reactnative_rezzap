import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authActionCreators,
   getMyProfile,
   getMySupporter,
   getMyGraph ,
   getSpin,
   getSupporterProfile,
   getSupporterSupporterList,
   getSupporterGraph,
   getMyInterest,
   deleteMyInterest,
   addNew_Interest,
   getMyTimeline,
   getSupporterTimeline,
   uploadProfilePicture,
   signUp,
   updateMyProfile,
   getResume,
   getMessageList,
   getMessageDetail,
   sendMessage,
   searchSupporter,
   getCategories,
   addCategory,
   deleteCategory,
   updateCategory,
   setsupport,
   deleteTimelineItem,
   UpdateInterest} from "../store";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    Object.assign(
      {},
      authActionCreators,
      getMyProfile,
      getMySupporter,
      getMyGraph,
      getSpin,
      getSupporterProfile,
      getSupporterSupporterList,
      getSupporterGraph,
      getMyInterest,
      deleteMyInterest,
      addNew_Interest,
      getMyTimeline,
      getSupporterTimeline,
      uploadProfilePicture,
      signUp,
      updateMyProfile,
      getResume,
      getMessageList,
      getMessageDetail,
      sendMessage,
      searchSupporter,
      getCategories,
      addCategory,
      deleteCategory,
      updateCategory,
      setsupport,
      deleteTimelineItem,
      UpdateInterest
    ),
    dispatch,
  );
};
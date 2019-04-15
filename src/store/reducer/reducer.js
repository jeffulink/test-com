import ActionTypes from "../constant";

const INITIAL_STATE = {
  trackerArr: [],
  currentUser: {},
  databaseData: null,
  blockchainData: null,
  publishList: [],
  publicPageDetail: null,




  ////////// for account ethereum address signup and login ////////
  accountKey: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.TRACKER_LOGS:
      return { ...state, trackerArr: action.payload };




    case ActionTypes.SIGNUP_SUCCED:
      return { ...state, currentUser: action.payload };
    // case ActionTypes.SIGNUP_SUCCED:
    //   return { ...state, accountKey: action.payload }







    case ActionTypes.SIGNIN_SUCCED:
      return { ...state, currentUser: action.payload };
    case ActionTypes.DATABASE_CONNECTION_SUCCESS:
      return { ...state, databaseData: action.payload }
    case ActionTypes.FETCH_DATA_SUCCESS:
      return { ...state, blockchainData: action.payload }
    case ActionTypes.PUBLISH_LIST_SUCCESS:
      let storeArr = state.publishList;

      storeArr.push(action.payload);
      // console.log(storeArr)

      return {
        ...state, publishList: storeArr
      }
    case ActionTypes.PUBLIC_PAGE_DETAIL_SUCCEESS:
      return { ...state, publicPageDetail: action.payload }
    default:
      return state;
  }
};

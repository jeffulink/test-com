import ActionTypes from "./constant";
// import firebase from 'firebase';
import dbConfig from "../config";
import web3 from '../web3'
const ROOT_URL = 'http://localhost:8080'
export function AssetTrackerFunc(obj) {
  return dispatch => {
    console.log(obj);
    let arrList = [];
    obj.forEach(element => {
      arrList.push(element.returnValues);
    });

    console.log(arrList);
    dispatch({
      type: ActionTypes.TRACKER_LOGS,
      payload: arrList
    });

    // let valuesOnly = Object.values(obj);

    // console.log(valuesOnly);
  };
}
///        login //////////////////////////////////////////
export function loginAction(obj) {
  return dispatch => {
    // console.log(obj)
    web3.eth.personal.unlockAccount(obj.accountAddress, obj.password, 600)
      .then((res) => {
        console.info('Login successful:', res)
        dbConfig
          .auth()
          .signInWithEmailAndPassword(obj.email, obj.password)
          .then(() => {
            // console.log(userDetail.name)
            let user = dbConfig.auth().currentUser;
            // console.log(user)
            console.log(user)
            obj.history.push("/createAsset");
            let userObj = {
              name: user.displayName,
              uid: user.uid,
              email: user.email,
              accountAddress: obj.accountAddress

            };
            localStorage.setItem('userInfo', JSON.stringify(userObj))

            dispatch(signSucceed(userObj))
          }).catch((err) => {
            console.log(err)
          })
      }).catch(error => {
        console.log('Login Error:', error)
        // dispatch({ type: LOGIN_FAILED, payload: null });
      })
  };
}

function signSucceed(user) {
  return {
    type: ActionTypes.SIGNIN_SUCCED,
    payload: user
  };
}
function signInError(error) {
  return {
    type: ActionTypes.SIGNIN_ERROR,
    payload: error
  }
}
// signUp ////////////////////////////////////////////////////////////////
export function signupAction(obj) {
  let user = null;
  return dispatch => {
    console.log(obj);
    web3.eth.personal.newAccount(obj.password).then((res) => {
      console.log('new account', res)
      // localStorage.setItem('ownerAccount', res)

      alert(`Your ethereum account address is: ${res}. Please save this address for further usage.`)

      dbConfig
        .auth()
        .createUserWithEmailAndPassword(obj.email, obj.password)
        .then(() => {
          obj.history.push("/");
          user = dbConfig.auth().currentUser;

          user
            .updateProfile({
              displayName: obj.name
            })
            .then(() => {
              // console.log(user)
              let userObj = {
                name: user.displayName,
                uid: user.uid,
                email: user.email,
                accountAddress: res,
                dataObj: {}
              };
              // console.log(userObj)
              user.sendEmailVerification().then(function () {
                // Email sent.
                alert('Verification Sent');
                // console.log(user.uid)
                dbConfig.database().ref(`comboware/${user.uid}`).set(userObj);
              }).catch(function (error) {
                // An error happened.
                alert(`Error: ${error}`)
              });

              console.log(userObj);
              dispatch(signUpSucced(userObj));
            }).catch((err) => {
              console.log(err)
            })
        });
    }).catch(error => {
      console.error('error creating account ', error);
      alert(`Error: ${error}`)
      // dispatch({ type: SIGNUP_FAILED })
    })
  };
}

export function fetchDatabaseData() {

  return async dispatch => {
    console.log('......')
    const result = await fetch(`${ROOT_URL}/fetchSQLData`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // authorization: getToken
      }

    })
    const getData = await result.json();
    // console.log(getData)
    if (getData !== null) {
      dispatch({
        type: ActionTypes.DATABASE_CONNECTION_SUCCESS,
        payload: getData
      })

    }
    else {
      console.log('erroe')
    }

  }
}

export function getBlockchainDBData() {
  return async dispatch => {
    const result = await fetch(`${ROOT_URL}/getBlockchainData`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    });
    const getData = await result.json();
    console.log(getData.result[0])
    let objStore = {
      firstName: getData.result[0],
      lastName: getData.result[1],
      address: getData.result[2],
      city: getData.result[3]
    }
    let arrList = [];
    arrList.push(objStore)
    // const [0,1,2,3] = getData.result;
    // [0,1,2,3] = getData.result;
    let onlyValues = Object.values(getData.result)
    // for(let i = 0;i<onlyValues.length;i++){

    // }
    // console.log(onlyValues)
    if (getData !== null) {
      dispatch({
        type: ActionTypes.FETCH_DATA_SUCCESS,
        payload: arrList
      })
    } else {
      console.log('erroe')
    }
    // console.log(getData)
  }
}
export function storeDatabaseData(data) {
  return async dispatch => {
    await fetch(`${ROOT_URL}/pushSQLData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        // 'if-none-match': 'no-match-for-this'
      },
      body: JSON.stringify(data)
    })
  }
}
function signUpSucced(user) {
  return {
    type: ActionTypes.SIGNUP_SUCCED,
    payload: user
  };
}
function signUpError(error) {
  return {
    type: ActionTypes.SIGNUP_ERROR,
    payload: error
  }
}








/////////////////////////////// Publish Pages ////////////////////////////////////

///// create page ///
export function publishPage(data) {

  return dispatch => {
    console.log(data.name)
    let userId = JSON.parse(localStorage.getItem('userInfo'));
    // console.log(userId)
    let uniqueId = dbConfig.database().ref(`comboware`).child('Publish Pages').push().key;
    // console.log(uniqueId)

    let updates = {
      // name: data
    }
    let dataVal = {
      name: data.heading,
      paragraph: data.paragraph,
      userID: userId.uid
    }
    updates[`comboware/Publish Pages/${uniqueId}`] = dataVal
    console.log(updates)
    // console.log(updates)

    dbConfig.database().ref().update(updates)


  }
}
////// create page ////
///// page list ////


export function pageList() {
  return dispatch => {
    let userId = JSON.parse(localStorage.getItem('userInfo'));

    dbConfig.database().ref(`comboware`).child('Publish Pages').on('value', (snapshot) => {
      let pagesDetail = snapshot.val(),
        dataKeys = Object.keys(pagesDetail);
      // console.log(dataKeys)
      dataKeys.map(i => {
        // console.log(i,pagesDetail[i].name)
        let obj = {
          // console.log(i)
          name: pagesDetail[i].name,
          userId: pagesDetail[i].userID,
          id: i
        }
        console.log(obj)
        dispatch(listRetrieveSuccess(obj))


      })


    })
  }
}

export function pageDetail(id) {
  return dispatch => {
    console.log(id)
    dbConfig.database().ref(`comboware`).child(`Publish Pages/${id}`).once('value', (snapshot) => {
      let pageDetail = snapshot.val();
      console.log(pageDetail)
      dispatch(pageDetailSuccess(pageDetail))

    })

  }
}
function listRetrieveSuccess(data) {
  return {
    type: ActionTypes.PUBLISH_LIST_SUCCESS,
    payload: data
  }
}



function pageDetailSuccess(data) {
  return {
    type: ActionTypes.PUBLIC_PAGE_DETAIL_SUCCEESS,
    payload: data
  }
}







/////////////////Publish Page/////////////////////////////
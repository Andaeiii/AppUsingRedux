const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

//state... 
const initialState = {
    loading: false,
    users : [],
    error : ''
};

//actions.. 
//actions types...
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

//action creators... 
const fetchUsersRequest = () => {
    return {
        type : FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type : FETCH_USERS_SUCCESS,
        payload : users
    }
};

const fetchUsersFailure = (error) => {
    return {
        type : FETCH_USERS_FAILURE,
        payload : error
    }
}



//define the reducer functions... 

const reducer = (state=initialState, action) => {
    switch(action.type){

        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
            break;

        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
            break;
        
        case FETCH_USERS_FAILURE:
            return {
                users: [],
                loading: false,
                errors: action.payload
            }
            break;
    }
};

//this is an action creator.. 
//the thunk middleware enables the action creator to reuturn a function ~ that can also dispatch actions made
//possible because it receives a dispatch(callanItem) method as its arguments.. 
const fetchUsers = () => {
    return function(dispatch){      

        dispatch(fetchUsersRequest());                          //dispatch action to set loading to true 

        axios.get('https://jsonplacedholder.typicode.com/users')
        .then(response => {
            const users = response.data.map(user => user.id);   // only pic the ids of each user..
           dispatch(fetchUsersSuccess(users));                  //response .data = users array... 
        })
        .catch(error => {
           dispatch(fetchUsersFailure(error.message));          //error.message  = error string.. 
        })
    }
}

const store = createStore( reducer, applyMiddleware(thunkMiddleware) );
store.subscribe(()=>{ console.log(store.getState()) });

store.dispatch(fetchUsers());           //it should execute the fetch users function... 
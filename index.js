const redux  = require('redux');
const reduxLogger = require('redux-logger');            //loger middleware.. 


const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;         //to apply middleware... 
const logger = reduxLogger.createLogger();

/////////////////////////////////////////////////action creators... here. 

//you could pass the object itself to the dispatch method.. 
//but using functions is better... like repeating the object in every place buycake is called... 
//rather than calling the buyCake() functions instead... 


const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';

function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCream(){
    return {
        type: BUY_ICE_CREAM,
        info: 'First redux action'
    }
}

/////////////////////////////////////////////////       the state here...  

// {previous State, action } => newState
// application state = a simple object.. .


const initCakeState = {
    numOfCakes: 10
};

const initIceCreamState = {
    numOfIceCreams: 20
};

//////////////////////////////////////////////////the reducer... here.... 
// the reducer function controls how the state transitions happen....

//define the cake reducer here... 
const cakeReducer = (state=initCakeState, action) => {
    switch(action.type){
        case BUY_CAKE: 
            return{
                ...state,                           // copy the state object... 
                numOfCakes: state.numOfCakes - 1    // then update this property in the object.. 
            }
            break;
        default: return state
    }
}

//define the icecream reducer here.. bothered about only the ice cream events.. 
const iceCreamReducer = (state=initIceCreamState, action) => {
    switch(action.type){
        case BUY_ICE_CREAM: 
            return{
                ...state,                                   // copy the state object... 
                numOfIceCreams: state.numOfIceCreams - 1    // then update this property in the object.. 
            }
        default: return state
    }

}


//////////////////////////////////////////////////// the Redux Store..
/*  holds the application state
    allows the state to be updated via dispatch... 
    allows the app. to register listeners via subscribe... 
    you can also unsubscribe to the store, by the subscribe functions..
*/

const rootReducer = combineReducers({       //you can assign any key - but the value must be the reducer name.. 
    cake : cakeReducer, 
    iceCream : iceCreamReducer
});

const store = createStore(rootReducer, applyMiddleware(logger));  

console.log('initial state', store.getState());

// allow the app to subscribe to changes in the store...  { unsubscribe = value returned }
// so anytime the state updates, it is logged to the console... 

//no more console log when logger is available.. 
const unsubscribe = store.subscribe(() => {}); //console.log('updated state', store.getState()));

// used to update the state... dispatch(action) // action = buy state.
// to simulate a process multiple times... 


////////////////////////////////////////////// at the application level. 
////////// you dispatch actions to the store. a

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());


/// so to access the items here.. 

//state.cake.numOfCakes
//state.iceCream.numOfIceCreams


//unsubscribe by calling the function returned by the subscribe method.. 
unsubscribe();


// so the redux pattern is as follows.... 
// ------------------------------------------------
// you create a store
// declare the action, state, reducer.. 
// define your actions and the action creators
// subscribe to the store
// dispatch actions to update the store.. 
// finally unsubscribe to the changes..... 


//middleware - a 3rd party extension between dispatching an action and the moment it reaches an action... 



//sync actions - actions that take place as soon as the event occurs. 
//async actions - actions that lag for a while.. 
const redux  = require('redux');
const createStore = redux.createStore;

const BUY_CAKE = 'BUY_CAKE';

//action creators... here.  is defined already.. 
//you could pass the object itself to the dispatch method.. 
//but using functions is better... 
function buyCake(){
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}


// {previous State, action } => newState
// application state = a simple object.. .

//the state of the application.... 
const initialState = {
    numOfCakes : 10
}

//the reducer... here.... 
// the reducer function controls how the state transitions happen....

const reducer = (state=initialState, action) => {
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


// the Redux Store..
/*  holds the application state
    allows the state to be updated via dispatch... 
    allows the app. to register listeners via subscribe... 
    you can also unsubscribe to the store, by the subscribe functions..
*/

const store = createStore(reducer);

console.log('initial state', store.getState());

// allow the app to subscribe to changes in the store...  { unsubscribe = value returned }
// so anytime the state updates, it is logged to the console... 
const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()));

// used to update the state... dispatch(action) // action = buy state.
// to simulate a process multiple times... 
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());


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

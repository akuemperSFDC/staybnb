import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import createListing from './createListing';
import listings from './listings';
import listing from './listing';
import editListing from './editListing';
import bookings from './bookings';
import searchResults from './searchResults';
import reservations from './reservations';
import editReservation from './editReservation';

const rootReducer = combineReducers({
  session,
  createListing,
  listings,
  listing,
  editListing,
  bookings,
  searchResults,
  reservations,
  editReservation,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

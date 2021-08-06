import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Home from './components/Home';
import EditListing from './components/EditListing';
import ManageListings from './components/ManageListings';
import CreateListing from './components/CreateListing';
import SearchResults from './components/SearchResults';
import ViewListing from './components/ViewListing';
import ViewReservations from './components/ViewReservations';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import SplashPage from './components/SplashPage';
import Footer from './components/Footer';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded} />
      <Switch>
        <Route path='/splash' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/signup' exact={true}>
          <SplashPage />
        </Route>
        <ProtectedRoute path='/users' exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute
          path='/listings/view/:listingTitle/:listingId'
          exact={true}
        >
          <ViewListing />
        </ProtectedRoute>
        <ProtectedRoute path='/reservations' exact={true}>
          <ViewReservations />
        </ProtectedRoute>
        <ProtectedRoute path='/create-listing'>
          <CreateListing />
        </ProtectedRoute>
        <ProtectedRoute path='/listings/:listingId/edit'>
          <EditListing />
        </ProtectedRoute>
        <ProtectedRoute path='/listings'>
          <ManageListings />
        </ProtectedRoute>
        <ProtectedRoute
          exact={true}
          path='/search/:cityName--:stateName/guests=:guests/'
        >
          <SearchResults />
        </ProtectedRoute>
        <ProtectedRoute exact={true} path='/search/:cityName--:stateName/'>
          <SearchResults />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true}>
          <Home />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

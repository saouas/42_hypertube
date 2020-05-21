import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import './App.css';
import 'react-notifications/lib/notifications.css';

// pages
import Index from './components/landing/Index';
// import NotFound from './components/landing/NotFound';
import SignUp from './components/landing/SignUp';
import SignIn from './components/landing/SignIn';
import Forget from './components/password/Forget';
import Reset from './components/password/Reset';
import Profile from './components/users/Profile';
import Edit from './components/users/Edit';
import MovieResume from './components/movies/movieResume.js';
import Search from './components/movies/search/Search';

// layout 
import Footer from './components/layout/Footer';
import history from './config/history';
import { NotificationContainer } from 'react-notifications';

// auth
import Github from './components/auth/Github';
import FourtyTwo from './components/auth/FourtyTwo';
import store from './store/store';
import { Provider } from 'react-redux'
import ContainerHeader from './container/ContainerHeader';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <div className='container'>
            <Router history={history}>
              <ContainerHeader />
              <NotificationContainer />

              {/* homepage and basic pages */}
              <Route exact path='/' component={Index} />
              <Route exact path='/index' component={Index} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/forget' component={Forget} />
              <Route exact path='/reset/:token' component={Reset} />

              {/* user pages */}
              <Route exact path='/user/:username' component={Profile} />
              <Route exact path='/account/edit' component={Edit} />

              {/* movie pages */}
              <Route exact path='/movie/:id' component={MovieResume} />
              <Route exact path='/search' component={Search} />

              {/* auth pages */}
              <Route exact path='/auth/github/token/' component={Github} />
              <Route exact path='/auth/42/token/' component={FourtyTwo} />

            </Router>
            <Footer />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
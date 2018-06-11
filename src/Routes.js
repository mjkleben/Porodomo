import React, { Component } from 'react';
import './App.css';
import App from './App.js';
import App2 from './App2.js';
import Leaderboard from './components/Leaderboard.js'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Redirect to='/Login' />
                    <Route path="/Login" component={App} />
                    <Route path="/CreateUser" component={App2} />
                    <Route path="/Leaderboard" component={Leaderboard} />
                </div>
            </BrowserRouter>
        );
    }
}

export default Routes
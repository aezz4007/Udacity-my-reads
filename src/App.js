import React from 'react';
import './App.css';
import { Route } from "react-router-dom";
import MainPage from './components/pages/MainPage';
import SearchPage from './components/pages/SearchPage';

class BooksApp extends React.Component {
 
  render() {
    return (
      <div className="app">
        {/* Router for the two pages of the App.
          * Note: this page is kept clean for routing
          * More pages can be added the future  
          */}
        <Route exact path="/" component={ MainPage } />
        <Route exact path="/search" component={ SearchPage } />
      </div>
    )
  }
}

export default BooksApp

import React, {Component} from 'react';
import {StyleSheet, 
  Text, 
  View, 
  AppRegistry,
} from 'react-native';
import { NativeRouter, Route, Link, Switch } from 'react-router-native'
import SortPage from './sort';
import HomePage from './home';

export default class App extends Component {
  render() {
    return (
  <NativeRouter>
    <Switch>
      <Route exact path="/" component={HomePage}/>
      <Route path="/orderby" component={SortPage}/>
    </Switch>
  </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  
});

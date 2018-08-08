import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';

export default class CardView extends Component {
    constructor(props){
      super(props);
    }

    render(){
      let time = new Date(this.props.data.completion_date);
      return (
        <View style={[this.props.styles,{flex: 1, borderBottomColor: "#eeeeee", borderBottomWidth: 1, flexDirection: "column", padding: 5, elevation: 5}]} elevation={5}>
          <View style={[styles.container, {flex: 1, flexDirection: "row", justifyContent: "space-between"}]}>
            <Text style={[{fontSize: 15,}]}>Distance:</Text><Text style={[{fontSize: 15, fontWeight: "bold"}]}> {this.props.data.distance}</Text>
            <Text style={[{fontSize: 15,}]}>rate:</Text><Text style={[{fontSize: 15, fontWeight: "bold"}]}> {this.props.data.rate}</Text>
          </View>
          <View style={[styles.container, {flex: 1, flexDirection: "row", justifyContent: "space-between"}]}>
            <Text style={[{fontSize: 15,}]}>project_size:</Text><Text style={[{fontSize: 15, fontWeight: "bold"}]}> {this.props.data.project_size}</Text>
            <Text style={[{fontSize: 15,}]}>completion_date:</Text><Text style={[{fontSize: 15, fontWeight: "bold"}]}> {time.toLocaleDateString()}</Text>
          </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    paddingBottom: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  upper: {
    marginBottom: -4,
  },
  
});
  
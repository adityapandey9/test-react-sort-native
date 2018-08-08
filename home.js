import React, { Component } from 'react';
import {StyleSheet,
    Text,
    TouchableHighlight,
    View,
    ToastAndroid,
    FlatList,
    ScrollView,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { Link } from 'react-router-native'
import CardView from './compoents/CardView';

const { width: sliderWidth } = Dimensions.get('window');


export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.onFetch = this.onFetch.bind(this);
        this.state = {data: []}
        this.onFetch();
    }

    onFetch(){
        fetch("http://10.0.2.2:8080/getdata",{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },})
            .then((response) => response.json())
        .then((res)=>{
            if(res.success){
                this.setState({data: res.data});
            } else {
                ToastAndroid.show("Error Occur: "+res.data, ToastAndroid.SHORT);
            }
        })
        .catch(err=>{
            ToastAndroid.show("Error Occur: "+err, ToastAndroid.SHORT);
        })
    }

    renderItem = (item) => {
        //write your own layout in list view
        <TouchableHighlight key={item._id}>
            <Text>{item.distance}</Text>
        </TouchableHighlight>
    };

    render(){
        if(this.state.data.length == 0){
            return <ActivityIndicator style={{marginTop: "20%"}} />
        }
        return (
            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                    <Link to="/orderby" style={[{borderBottomColor: "#eeeeee", alignItems: 'center', borderBottomWidth: 1, marginTop: "2%", padding: "5%", elevation: 5}]}>
                        <Text style={[{fontSize: 20}]}>Sort</Text>
                    </Link>
                <FlatList
                    ItemSeparatorComponent={({highlighted}) => (
                        <View style={[highlighted && {marginLeft: 0}]} />
                      )}
                    numColumns={1}
                    contentContainerStyle={{margin:0,padding:0}}
                    data={this.state.data}
                    renderItem={({item, separators}) => (
                        <TouchableHighlight onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight} style={[{marginBottom: 10, marginTop: 10}]}>
                                <CardView styles={[{width: (sliderWidth)}]}  data={item} />
                        </TouchableHighlight>
                      )}
                />
            </ScrollView>
        );
    }
}
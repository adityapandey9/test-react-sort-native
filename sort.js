import React, { Component } from 'react';
import SortableListView from 'react-native-sortable-listview'
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    ActivityIndicator,
    Button,
    ToastAndroid,
    
} from 'react-native';
import { withRouter } from 'react-router-native'

class RowComponent extends Component {
    render() {
        return (
         <TouchableHighlight underlayColor={'#eee'} style={{padding: 25, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}} {...this.props.sortHandlers}>
            <Text style={{fontSize: 20}}>{this.props.data.text}</Text>
          </TouchableHighlight>
        );
      }
}

class SortPage extends Component {
    constructor(props){
        super(props);
        this.state = {data: null, key: null, order: null};
        this.onFetch = this.onFetch.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.Backit = this.Backit.bind(this);
        this.onFetch();
    }

    onSubmit(orders){
        let obj = {};
        for(let i=0;i<orders.length;i++){
            obj[orders[i]] = i+1;
        }
        fetch("http://10.0.2.2:8080/priority/"+this.state.key,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj),
        }).then((response) => response.json())
        .then((res)=>{
            if(res.success){
                ToastAndroid.show("New Ordered created", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Error Occur: "+res.data, ToastAndroid.SHORT);
            }
        })
        .catch(err=>{
            ToastAndroid.show("Error Occur: "+err, ToastAndroid.SHORT);
        })
    }

    Backit(){
        const {
            history,
          } = this.props;
          history.push("/");
    }

    onFetch(){
        fetch("http://10.0.2.2:8080/priority",{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },})
            .then((response) => response.json())
        .then((res)=>{
            if(res.success){
                let keyt = res.data[0]["_id"];
                delete res.data[0]["_id"];
                delete res.data[0]["__v"];
                const keys = Object.keys(res.data[0]).sort(function(a,b){return res.data[0][a]-res.data[0][b]});
                let data = {};
                for(let i=0;i<keys.length;i++){
                    data[keys[i]] = {text: keys[i]};
                }
                this.setState({data: data, key: keyt, order: keys});
            } else {
                ToastAndroid.show("Error Occur: "+res.data, ToastAndroid.SHORT);
            }
        })
        .catch(err=>{
            ToastAndroid.show("Error Occur: "+err, ToastAndroid.SHORT);
        })
    }

    render(){
        if(this.state.data == null){
            return <ActivityIndicator style={{marginTop: "20%"}} />
        }
        return (
        <View style={styles.container}>
            <View style={{height: "15%", backgroundColor: 'lightblue'}} >
                <Button onPress={this.Backit} style={[{width: "20%"}]} title="X" />
                <Text style={styles.welcome}> Sortable </Text>
            </View>
            <SortableListView
                style={{flex: 1, marginBottom: 0}}
                data={this.state.data}
                order={this.state.order}
                onRowMoved={e => {
                    let orders = this.state.order;
                    orders.splice(e.to, 0, orders.splice(e.from, 1)[0])
                    this.setState({order: orders});
                    this.onSubmit(orders);
                }}
                renderRow={row => <RowComponent data={row} />}
            />
      </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
});

export default withRouter(SortPage);
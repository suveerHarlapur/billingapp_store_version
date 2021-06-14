import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  FlatList
} from 'react-native';
import { Input, Icon, Header,Card ,ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { Entypo, AntDesign, Ionicons, FontAwesome,Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader'
export default class Today extends Component{
    constructor(){
        super();
        this.state={allitem:''}
    }
    getdate=()=>{
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        
        var yyyy = today.getFullYear();
        var date = dd + '-' + mm + '-' + yyyy
        return date
    }
    getdata=()=>{
        var d= []
        var u =firebase.auth().currentUser.email
        db.collection('sells').where('userid','==',u)
        .where('date','==',this.getdate())
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                d.push(doc.data())
                this.setState({allitem:d})
            })
        })
    }
    componentDidMount(){
        this.getdata()
    }
    keyExtractor=(item,i)=>i.toString()
    renderItem=({item})=>(
        <ListItem >
            <ListItem.Content style={{borderWidth:1,color:'white'}}>
                <ListItem.Title style={{marginLeft:RFValue(4)}}>you have sold {item.item} of quantity {item.quantity} at rupees {item.soldRate}
                
                </ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
    render(){
        return(
            <View>
                <MyHeader title={this.getdate()} navigation={this.props.navigation}/>
                {this.state.allitem.length === 0 ?
            <Text>you have not sold any items today</Text>    
            
            :(
                <FlatList 
                keyExtractor={this.keyExtractor}
                data={this.state.allitem}
                renderItem={this.renderItem}
                />
            )
            }
            </View>
                
            
        )
    }
}
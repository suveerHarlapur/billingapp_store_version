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
  FlatList,
  StyleSheet
} from 'react-native';
import { Input, Icon, Header,Card ,ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { Entypo, AntDesign, Ionicons, FontAwesome,Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader';

export default class Settings extends Component{
    constructor(){
        super();
        this.state={storename:'',storeAddress:'',name:'',id:''}
    }
    getdata=()=>{
        var u = firebase.auth().currentUser.email
        db.collection('users').where('emailId','==',u)
        .get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var d = doc.data()
                this.setState({storename:d.storename,storeAddress:d.storeAddress,name:d.name,id:doc.id})
            })
        })
    }
    update(){
        db.collection('users').doc(this.state.id)
        .update({
            storename:this.state.storename,
            name:this.state.name,
            storeAddress:this.state.storeAddress
        })
        Alert.alert('updated')
    }
    componentDidMount(){
        this.getdata()
    }
    render(){
        return(
            <View>
                <MyHeader title="Settings" navigation={this.props.navigation}/>
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Name"}
                  
                  onChangeText={(text)=>{
                    this.setState({
                      name: text
                    })
                  }}
                  value ={this.state.name}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"Store Name"}
                  
                  onChangeText={(text)=>{
                    this.setState({
                      storename: text
                    })
                  }}
                  value ={this.state.storename}
                />
                <TextInput
                  style={styles.formTextInput}
                  placeholder ={"storeAddress"}
                  
                  onChangeText={(text)=>{
                    this.setState({
                      storeAddress: text
                    })
                  }}
                  value ={this.state.name}
                />
                <TouchableOpacity style={styles.button}
                  onPress={()=>{this.update()}}>
                  <Text> Save </Text>
                </TouchableOpacity>
            </View>
        )
    }
} 
const styles = StyleSheet.create({
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        // alignSelf: 'center',
        borderRadius:10,
        backgroundColor:"red",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        alignSelf:'center',
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
      },

}
)
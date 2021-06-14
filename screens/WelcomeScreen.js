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
  TextInput
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
export default class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      storename: '',
      storeaddres: '',
      emailId: '',
      password: '',
      confirmPassword: '',
      modal: false,
      active:false
    };
  }
  signup = (u, p, c) => {
    if (c === p) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(u, p)
        .then((response) => {
          db.collection('users').add({
            name: this.state.name,
            storename: this.state.storename,
            storeaddress: this.state.storeaddres,
            emailId: this.state.emailId,
            active:this.state.active
          });
          Alert.alert('signed up');
          this.setState({
            name: '',
            storename: '',
            storeaddres: '',
            emailId: '',
            password: '',
            confirmPassword: '',
            modal: false,
            
          });
        })
        .catch((error) => {
          var errorcode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    } else {
      return Alert.alert('please check your password');
    }
  };
  signin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('Bottom')
      })
      .catch((error) => {
        var errorm = error.message;
        return Alert.alert(errorm);
      });
  };
  showModal = () => {
    return (
      <Modal
        animationType="slide"
        visible={this.state.modal}
        transparent={true}>
        <ScrollView>
          <KeyboardAvoidingView>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                borderWidth: 1,
                width: 300,
                alignSelf: 'center',
                borderRadius: 20,
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 25,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  fontFamily: 'cursive',
                }}>
                Sign up
              </Text>
              <Input
                placeholder="name"
                leftIcon={<AntDesign name="user" size={24} color="black" />}
                onChangeText={(text) => {
                  this.setState({ name: text });
                }}
                value={this.state.name}
                style={{ marginTop: 30 }}
              />
              <Input
                placeholder="storeName"
                leftIcon={{ type: 'FontAwesome5', name: 'store' }}
                onChangeText={(text) => {
                  this.setState({ storename: text });
                }}
                value={this.state.storename}
                style={{ marginTop: 30 }}
              />
              <Input
                style={{ marginTop: 30 }}
                placeholder="store location"
                leftIcon={
                  <Entypo name="location-pin" size={24} color="black" />
                }
                onChangeText={(text) => {
                  this.setState({ storeaddres: text });
                }}
                value={this.state.storeaddres}
              />
              <Input
                style={{ marginTop: 30 }}
                placeholder="email-id"
                leftIcon={{ type: 'Fontisto', name: 'email' }}
                onChangeText={(text) => {
                  this.setState({ emailId: text });
                }}
                keyBoardType="email-address"
                value={this.state.emailId}
              />
              <Input
                style={{ marginTop: 30 }}
                placeholder="password"
                leftIcon={<Entypo name="lock" size={24} color="black" />}
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                value={this.state.password}
                secureTextEntry={true}
              />
              <Input
                style={{ marginTop: 30 ,marginBottom:18}}
                placeholder="confirm password"
                leftIcon={<Entypo name="lock" size={24} color="black" />}
                onChangeText={(text) => {
                  this.setState({ confirmPassword: text });
                }}
                secureTextEntry={true}
                value={this.state.confirmPassword}
              />
              <Text style={{width:300,height:24,alignSelf:'center',alignItems:'center',backgroundColor:'#03a9fc'}}>Do yo have online delivery option</Text>
              <TouchableOpacity 
              style={{width:100,height:30,alignSelf:'center',alignItems:'center',backgroundColor:'#28fc03'}}
              onPress={()=>{this.setState({active:true})}}

              >
                <Text>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity 
              style={{width:100,height:30,alignSelf:'center',alignItems:'center',backgroundColor:'#ff2643'}}
              onPress={()=>{this.setState({active:false})}}

              >
                <Text>no</Text>
                </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 30,
                  backgroundColor: '#ff0000',
                  borderRadius: 6,
                  shadowOffset: {
                    width: 3,
                    height: 3,
                  },
                  shadowRadius: 3,
                  elevation: 30,
                  shadowOpacity: 0.2,
                }}
                onPress={() => {
                  this.signup(
                    this.state.emailId,
                    this.state.password,
                    this.state.confirmPassword
                  );
                }}>
                <Text style={{ alignSelf: 'center', fontSize: 20 }}>
                  Register
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{}}
                onPress={() => this.setState({ modal: false })}>
                <Text style={{ textDecorationLine: 'underline' }}>cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Modal>
    );
  };
  render() {
    console.log(this.state.name);
    return (
      <View style={{backgroundColor:'red',height:'100%'}}>
        <View>
          {this.showModal()}
        </View>

        <Text style={{fontSize:RFValue(38),color:'white',alignSelf:'center',fontWeight:'bold',marginTop:RFValue(200)}}>Billing App</Text>
        <Text style={{fontSize:RFValue(18),color:'white',alignSelf:'center',}}>A Simple App</Text>
        <TextInput 
        placeholder="abc@gmail.com"
        style={{width:360,height:50,borderBottomWidth:2,marginLeft:RFValue(10),marginTop:RFValue(60),fontSize:RFValue(20)}}
        placeholderTextColor='white'
      
        onChangeText={(text)=>{this.setState({emailId:text})}}
        keyboardType='email-address'
        />
        <TextInput 
        placeholder="password"
        style={{width:360,height:50,borderBottomWidth:2,marginLeft:RFValue(10),marginTop:RFValue(30),fontSize:RFValue(20)}}
        placeholderTextColor='white'
        onChangeText={(text)=>{this.setState({password:text})}}


        secureTextEntry={true}
        />
         <TouchableOpacity
            onPress={() => this.setState({ modal: true })}
            style={{
              borderWidth: 2,
              marginTop: 30,
              alignSelf:'center',
              backgroundColor: 'white',
              width: 300,
              borderRadius: 20,
              
              alignItems: 'center',
              
            }}>
            <Text style={{ fontSize: 30,  }}>sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{borderWidth:2,marginTop:30,alignSelf:'center',borderRadius:30,width:300,alignItems:'center',backgroundColor:'white'}}
            onPress={() => {
              this.signin(this.state.emailId, this.state.password);
            }}>
            <Text style={{ fontSize: 30,fontFamily:'sans-serif' }}>sign in</Text>
          </TouchableOpacity>  
      </View>
    );
  }
}

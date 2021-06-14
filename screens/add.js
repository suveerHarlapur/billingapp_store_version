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
} from 'react-native';
import { Input, Icon, Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { Entypo, AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Add extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      value: '',
      user: firebase.auth().currentUser.email,
    };
  }
  eid=()=>{
    return Math.random().toString(36).substring(5);
  }
  updatedb = () => {
    db.collection('items').add({
      userid: this.state.user,
      itemname: this.state.name,
      value: this.state.value,
      eid:this.eid()
    });
   return alert('item added', [
      { text: 'ok', onPress: this.props.navigation.navigate('HomeScreen') },
    ]);
  };
  render() {
    return (
      <View>
        <Header
          centerComponent={{ text: 'ADD Item', style: { color: 'white' } }}
          containerStyle={{
            backgroundColor: 'red',
            height:60
          }}
        />
        <View style={{  alignItems: 'center' }}>
          <Input
            placeholder="  item name"
            rightIcon={
              <Ionicons name="newspaper-outline" size={24} color="black" style={{marginTop:RFValue(300)}}/>
            }
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
            style={{ marginTop: RFValue(300) }}
          />
          <Input
            placeholder ="  value of 1 gram"
            rightIcon={<FontAwesome name="rupee" size={24} color="black" />}
            onChangeText={(text) => {
              this.setState({ value: text });
            }}
          />
          <TouchableOpacity
            onPress={() => this.updatedb()}
            style={{
              borderWidth: 2,
              marginTop: 30,
              backgroundColor: 'red',
              width: 300,
              borderRadius: 20,
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 30, fontWeight:'bold' }}>add item</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,ToastAndroid
} from 'react-native';
import { Input, Icon,ListItem ,Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
export default class Home extends Component{
  constructor(){
    super();
    this.state={allitems:'',name:'',w:'',userid:firebase.auth().currentUser.email,color:'orange'}
  }
  getdata=()=>{
      
    var u = firebase.auth().currentUser.email
    db.collection('items').where('userid','==',u)
    .onSnapshot((snapshot)=>{
      var data= []
      snapshot.forEach((doc)=>{
          data.push(doc.data())

        
      })
      this.setState({allitems:data})
    })
  }
  keyExtractor = (item, index) => index.toString()
getdate=()=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    
    var yyyy = today.getFullYear();
    var date = dd + '-' + mm + '-' + yyyy
    return date
}
  add=(i)=>{
      var vi = 500 * 20
      console.log(v)
    var v = this.state.w * i.value
    db.collection('added').add({
        Date:this.getdate(),
        item:i.itemname,
        value:v + 'rupees',
        userid:this.state.userid,
        status:'added',
        id:i.eid,
        quantity:this.state.w
    })
    this.setState({w:'',color:'green'})
     ToastAndroid.showWithGravity('item added',ToastAndroid.LONG,ToastAndroid.BOTTOM)
}
  renderItem=({item})=>(
<ListItem bottomDivider>
<ListItem.Content>
    <ListItem.Title style={{fontSize:20,fontWeight:'bold',color:'black'}}>
        {item.itemname}
    </ListItem.Title>
    <ListItem.Subtitle>
       value:  {item.value} rupees
    </ListItem.Subtitle>
    <View>
    <TextInput 
    placeholder="quantity(g)"
    style={{marginLeft:'70%',borderWidth:2,width:100,height:30,marginTop:-26}}
    onChangeText={(text)=>{this.setState({w:text})}}
    keyboardType={'numeric'}
    />
    <TouchableOpacity style={{backgroundColor:this.state.color}} onPress={()=>{this.add(item)}}>
        <Text>ADD</Text>
    </TouchableOpacity>
</View>
</ListItem.Content>
</ListItem>

   ) 
  
  componentDidMount(){
    this.getdata()
  }
  render(){
    console.log(this.state.allitems)
    return(
        
      <View>
      <MyHeader title={"HomeScreen"} navigation={this.props.navigation}/>
          {this.state.allitems.length ===0 ?
        <Text>you have not added any items</Text>
        :(
            <View>
        <FlatList 
        keyExtractor={this.keyExtractor}
        data={this.state.allitems}
        renderItem={this.renderItem}
        />
            <TouchableOpacity style={{backgroundColor:'red',width:300,height:30,alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('A')}}>
                <Text>Proceed Bill</Text>
            </TouchableOpacity>
            </View>
        )  
        }
      </View>
    )
  }
}
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


export default class Added extends Component{
    constructor(){
        super();
        this.state={all:'',docid:'',inr:''}
    }
    getData=()=>{
        
        var u =firebase.auth().currentUser.email
        db.collection('added').where('userid','==',u)
        .where('status','==','added')
        .onSnapshot((snapshot)=>{
            var d = [] 
            snapshot.forEach((doc)=>{
               
                d.push(doc.data())
                
            })
            this.setState({all:d,})
        })
       
    }

    componentDidMount(){
        this.getData()
    }
    u=(i)=>{
        var a = i.item
        var u =firebase.auth().currentUser.email
        console.log('hi ' + i.doc_id)
        db.collection('added').where('id','==',i.id)
        .get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection('added').doc(doc.id)
                .update({
                    status:'sold'
                })
            })
        })
        ToastAndroid.showWithGravity({a }+ 'has been sold',ToastAndroid.LONG,ToastAndroid.BOTTOM)
        if(this.state.inr.length === 0 ){
            db.collection('sells').add({
                date:i.Date,
                item:i.item,
                soldRate:i.value,
                userid:u,
                quantity:i.quantity
            })

        }
        else{
            db.collection('sells').add({
                date:i.Date,
                item:i.item,
                soldRate:this.state.inr,
                userid:u,
                quantity:i.quantity
            })
        }
        
        
    }
    keyExtractor=(item,i)=>i.toString()
    renderItem=({item})=>(
        <ListItem >
            <ListItem.Content style={{borderWidth:1,color:'white'}}>
                <ListItem.Title style={{marginLeft:RFValue(4)}}>{item.item}</ListItem.Title>
                <ListItem.Subtitle>quantity : {item.quantity}</ListItem.Subtitle>
                <TextInput 
                placeholder={item.value}
                onChangeText={(text)=>{this.setState({inr:text})}}
                style={{width:80,marginLeft:'45%',marginTop:-30,borderWidth:2}}
                />
                <TouchableOpacity style={{backgroundColor:'orange',width:80,marginLeft:'75%',marginTop:-20}} onPress={()=>{this.u(item)

                }}>
                    <Text>sell</Text>
                </TouchableOpacity>
            </ListItem.Content>
        </ListItem>

    )

    update=()=>{
        this.props.navigation.navigate('HomeScreen')
    }
    render(){
        return(
            <View>
                <Header
                leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.navigate('HomeScreen')}/>}
                centerComponent={{ text:"Added Items", style: { color: 'white', fontSize:20,fontWeight:"bold", } }}
                backgroundColor = "red"
              />
                {this.state.all.length ===0 ?
            <Text>you have not added any item</Text>
            :(
                <View>
                    <FlatList 
                    keyExtractor={this.keyExtractor}
                    data={this.state.all}
                    renderItem={this.renderItem}
                    />
                </View>
            )    
            }
            </View>
        )
    }
}
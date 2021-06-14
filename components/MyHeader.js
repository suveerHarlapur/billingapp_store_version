import React,{Component} from 'react';
import {View,Text} from 'react-native'
import {Header,Icon} from 'react-native-elements';
import { FontAwesome ,Ionicons} from '@expo/vector-icons';
import color from 'color';
export default class MyHeader extends Component{
    render(){
        return(
            <Header 
            leftComponent={<FontAwesome name="bars" size={24} color="black" onPress={()=>this.props.navigation.toggleDrawer()}/>}
            centerComponent={{text:this.props.title,style:{color:'white'}}}
            rightComponent={<Ionicons name="settings-outline" size={24} color="black" onPress={()=>{this.props.navigation.navigate('Settings')}}/>}
            containerStyle={{backgroundColor:'red'}}
            
            />
        )
    }
}
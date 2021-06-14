import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import Welcome from './screens/WelcomeScreen'
import Home from './screens/HomeScreen'
import Add from './screens/add'
import { Entypo,Ionicons ,FontAwesome} from '@expo/vector-icons'; 
import {Icon} from 'react-native-elements';
import Added from './screens/addedItem'
import {createDrawerNavigator} from 'react-navigation-drawer'
import Today from './screens/Todays'
import All from './screens/allsells'
import Settings from './screens/setting'
import CustomSideBarMenu from './components/side'
export default class App extends React.Component{
  render(){
    return(
      <AppContainer />
    )
  }
}

var bootomtab = createBottomTabNavigator({
HomeScreen:{
  screen:Home,
  
  navigationOptions:{
    tabBarIcon:<Entypo name="home" size={24} color="black" />

  }
},
AddItem:{
  screen:Add,
  navigationOptions:{
    tabBarIcon:<Entypo name="pencil" size={24} color="black" />
  }
}
},
{
  tabBarOptions:{
    activeBackgroundColor:'red',
    inactiveBackgroundColor:'red',
    activeTintColor:'blue',
    inactiveTintColor:'black'
  },
})
var drawer = createDrawerNavigator({
  Home:{
    screen:bootomtab,
    navigationOptions:{
      drawerIcon : <Icon name="home" type ="fontawesome5" />
    }
  },
TodaysSells:{
  screen:Today,
  navigationOptions:{
    drawerIcon:<Ionicons name="today" size={24} color="black" />
  }
},
AllSells:{
  screen:All,
  navigationOptions:{
    drawerIcon:<FontAwesome name="money" size={24} color="black" />
  }
},
Settings:{
  screen:Settings,
  navigationOptions:{
    drawerIcon:<Ionicons name="settings-outline" size={24} color="black" onPress={()=>{this.props.navigation.navigate('Settings')}}/>
  }
}
},
{contentComponent:CustomSideBarMenu}
)
var switchNavigator = createSwitchNavigator({
  Welcome:{screen:Welcome},
  Bottom:{screen:drawer},
  A:{screen:Added}
})
const AppContainer =  createAppContainer(switchNavigator);
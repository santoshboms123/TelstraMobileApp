import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SideMenu, List, ListItem } from 'react-native-elements';

export default class SideMenuDraw extends Component {    
    constructor () {
      super()
      this.state = { toggled: false }
    }
    
    toggleSideMenu () {
      this.setState({
        toggled: !this.state.toggled
      })
    }
    
    render () {
      // SideMenu takes a React Native element as a prop for the actual Side Menu
      const MenuComponent = (
        <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 50}}>

<Text >
Welcome to React Native!
</Text>
<Text >
To get started, edit index.ios.js
</Text>
<Text >
Press Cmd+R to reload,{'\n'}
Cmd+Control+Z for dev menu
</Text>
<Text >
Current selected menu item is: {this.state.selectedItem}
</Text>
        </View>
      )
      return (
        <SideMenu
          MenuComponent={MenuComponent}
          toggled={this.state.toggled}>
    
        </SideMenu>
      )
    }
}

import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './src/screens/Login';
import MessageListScreen from './src/screens/MessageList';

const RootStack = createStackNavigator({
    Login: LoginScreen,
    MessageList: MessageListScreen
},
{
  initialRouteName: 'Login'
});

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <RootStack />
      </View>
    );
  }
}

export default App;

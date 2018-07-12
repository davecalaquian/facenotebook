import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './src/screens/Login';
import MessageListScreen from './src/screens/MessageList';
import RoomScreen from './src/screens/Rooms';

const RootStack = createStackNavigator({
    Login: LoginScreen,
    MessageList: MessageListScreen,
    Room: RoomScreen
},
{
  initialRouteName: 'Login'
});

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <RootStack />
        </View>
      </Provider>
    );
  }
}

export default App;

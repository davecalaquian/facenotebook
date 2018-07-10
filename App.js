import React from 'react';
import { StatusBar, View } from 'react-native';
import Login from './src/screens/Login';
import MessageList from './src/screens/MessageList';

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MessageList />
      </View>
    );
  }
}

export default App;

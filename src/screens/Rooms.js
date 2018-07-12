import React, { Component } from 'react';
import { 
  View, 
  Text, 
  KeyboardAvoidingView,
  TextInput } from 'react-native';
  import { Button } from 'react-native-paper';

class RoomScreen extends Component {

  static navigationOptions = {
    headerTitle: 'Room Title'
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.mainView}>

        <View style={styles.messagesContainer}>
          <Text>Hello</Text>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.textInputContainerStyle}>
            <TextInput
              multiline
              underlineColorAndroid='transparent'
              placeholder='Enter a message'
              style={styles.textInputStyle}
            />
          </View>
          <Button
            onPress={() => console.log('Pressed')}
            style={styles.buttonStyle}
          >
          Send
          </Button>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  mainView: {
    flex: 1
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#FFFDDF'
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 10,
    height: 70,
    backgroundColor: 'transparent'
  },
  textInputContainerStyle: {
    flex: 1,
    height: 40
  },
  textInputStyle: {
    fontSize: 18
  },
  buttonStyle: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 50
  }
};

export default RoomScreen;

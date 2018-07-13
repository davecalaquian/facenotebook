import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  View, 
  Text, 
  KeyboardAvoidingView,
  TextInput } from 'react-native';
  import { Button } from 'react-native-paper';
import { 
  loadTrigger, 
  loadDismiss, 
  typeMessage,
  sendMessage } from '../redux/actions/actions';

class RoomScreen extends Component {

  static navigationOptions = {
    headerTitle: 'Room Title'
  };

  handleTextChange(message) {
    this.props.typeMessage(message);
    console.log(this.props.message);
  }

  handleSendMessage() {
    this.props.sendMessage(this.props.message);
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.mainView}>
        <View style={styles.messagesContainer}>
          <Text>This is a chat</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.textInputContainerStyle}>
            <TextInput
              multiline
              defaultValue={this.props.message}
              name='messageBox'
              numberOfLines={2}
              underlineColorAndroid='transparent'
              placeholder='Enter a message'
              style={styles.textInputStyle}
              onChangeText={(message) => this.handleTextChange(message)}
            />
          </View>
          <Button
            onPress={() => this.handleSendMessage()}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>Send</Text>
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
    flex: 1
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 10,
    height: null,
    maxHeight: 150,
    borderTopColor: '#fff',
  },
  textInputContainerStyle: {
    flex: 1
  },
  textInputStyle: {
    fontSize: 18,
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#000',
  },
  buttonStyle: {
    backgroundColor: '#0d48a8',
    borderRadius: 50,
    padding: 10,
    maxHeight: 60
  },
  buttonTextStyle: {
    color: '#fff',
    fontSize: 16
  }
};

const mapStateToProps = state => {
  return {
    token: state.token.loading,
    loading: state.loading.loading,
    message: state.message.message,
    chatBox: state.chatBox
  };
};

const mapDispatchToProps = dispatch => {
  return {
    triggerLoad: () => dispatch(loadTrigger()),
    dismissLoad: () => dispatch(loadDismiss()),
    typeMessage: (message) => dispatch(typeMessage(message)),
    sendMessage: (message) => dispatch(sendMessage(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen);

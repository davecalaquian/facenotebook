import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import openSocket from 'socket.io-client';
import { BarIndicator } from "react-native-indicators";
import { 
  View,
  ScrollView, 
  Text, 
  KeyboardAvoidingView,
  TextInput,
  Keyboard } from 'react-native';
  import { Button } from 'react-native-paper';
import { 
  loadTrigger, 
  loadDismiss, 
  typeMessage,
  sendMessage,
  storeConvoId } from '../redux/actions/actions';


class RoomScreen extends Component {
  
  static navigationOptions = {
    headerTitle: 'Room Title',
  };

  constructor() {
    super();
    this.state = {
      chat: [],
      temp: '',
      convoId: ''
    };
    this.socket = openSocket('https://cdb4af5a.ngrok.io');
  }

  componentWillMount() {
    // this.setState({
    //   convoId
    // });
    this.props.triggerLoad();
    axios.get(`https://cdb4af5a.ngrok.io/api/v1/chat/${this.props.convoId}`)
      .then(response => {
        this.setState({ chat: response.data.conversation });
        this.props.dismissLoad();
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.socket.emit('ENTER_CONVERSATION', `${this.props.convoId}`);
    this.socket.on('NEW_MESSAGE', (data) => {
      this.setState({ chat: [...this.state.chat, data] });
    });
  }

  handleTextChange(message) {
    this.props.typeMessage(message);
  }

  handleSendMessage() {
    if (this.props.message) {
      this.props.sendMessage(this.props.message.trim());
      axios({
        method: 'post',
        url: `https://cdb4af5a.ngrok.io/api/v1/chat/${this.props.convoId}`,
        data: {
          composedMessage: this.props.message,
          from: this.props.userId
        }
      })
        .then((res) => {
          this.socket.emit('NEW_MESSAGE', { ...res.data.currentMessage });
        })
        .catch((err) => console.log(err));
    }
  }

  loadMessages() {
    // console.log(this.props.chatBox);
    return this.state.chat.map((message, id) => {
      if (message.author.id === this.props.userId) {
        return (
          <View key={id} style={{ alignItems: 'flex-end' }}>
            <View style={{ maxWidth: 200 }}>
              <Text style={{ ...styles.textMessageStyleSender, color: '#fff' }} >
                {message.body}
              </Text>
            </View>
          </View>
        );
      }
      return (
        <View key={id} style={{ alignItems: 'flex-start' }}>
          <View style={{ maxWidth: 200 }}>
            <Text style={styles.textMessageStyleReceiver}>
              {message.body}
            </Text>
          </View>
        </View>
      );
  });
  }

  render() {
    if (this.props.loading) {
      return (
        <View style={styles.viewStyle}>
          <BarIndicator
            size={40}
            color='#000'
          />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView style={styles.mainView}>
        <ScrollView 
          style={styles.scrollViewStyle}
          ref={ref => this.scrollView = ref}
          onContentSizeChange={() => {
            this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          {this.loadMessages()}
        </ScrollView>
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
            onPress={() => {
              this.handleSendMessage();
              Keyboard.dismiss();
            }}
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
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollViewStyle: {
    flex: 1,
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
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 10,
    paddingLeft: 20,
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
  },
  textMessageStyleSender: {
    borderRadius: 30,
    borderBottomRightRadius: 0,
    backgroundColor: '#0076FF',
    padding: 15,
    margin: 5
  },
  textMessageStyleReceiver: {
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    backgroundColor: '#ffd27f',
    padding: 15,
    margin: 5,
    alignItems: 'flex-end',
  }
};

const mapStateToProps = state => {
  return {
    token: state.token.token,
    loading: state.loading.loading,
    message: state.message.message,
    chatBox: state.message.chatBox,
    convoId: state.message.convoId,
    userId: state.user.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    triggerLoad: () => dispatch(loadTrigger()),
    dismissLoad: () => dispatch(loadDismiss()),
    typeMessage: (message) => dispatch(typeMessage(message)),
    sendMessage: (message) => dispatch(sendMessage(message)),
    storeConvoId: (convoId) => dispatch(storeConvoId(convoId)),
    storeUserId: (userId) => dispatch(storeUserId(userId))  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen);

import React, { Component } from 'react';
import axios from 'axios';
import { ScrollView, Alert, View } from 'react-native';
import { connect } from 'react-redux';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardCover,
    Title,
    Paragraph
} from 'react-native-paper';
import { loadTrigger, loadDismiss, storeConvoId } from '../redux/actions/actions';

class MessageListScreen extends Component {

    static navigationOptions = {
        title: 'Channels',
        headerTitleStyle: { textAlign: 'center', flex: 1 },
        headerLeft: null
    };

    constructor() {
        super();
        this.state = {
            loading: false,
            rooms: []
        };
        this.handleJoin = this.handleJoin.bind(this);
        this.onBackButtonPressAndroid = this.onBackButtonPressAndroid.bind(this);
    }

    componentWillMount() {
        // this.authenticateToken(this.props.token);
        axios.get('https://cdb4af5a.ngrok.io/api/v1/chat/all')
            .then(response => this.setState({
                rooms: response.data.conversations
            }))
            .catch(error => console.log(error));
    }

    onBackButtonPressAndroid() {
        Alert.alert(
            'Do you want to logout?',
            null,
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', 
                    onPress: () => {
                    this.props.navigation.goBack();
                    this.props.dismissLoad();
                } },
            ],
            { cancelable: false }
        );
        return true;
    }

    authenticateToken(token) {
        if (token === '') {
            // this.props.navigation.navigate('Login');
            Alert.alert(
                'You do not have access to this page. Please try logging in again.',
                null,
                [
                    { text: 'Exit Now', onPress: () => this.props.navigation.navigate('Login') },
                ],
                { cancelable: false }
            );
        }
    }
2
    handleJoin(roomId) {
        Alert.alert(
            'Are you sure you want to join room?',
            null,
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', 
                    onPress: () => {
                        this.props.storeConvoId(roomId);
                        this.props.navigation.navigate('Room');
                        console.log(this.props.token);
                    } 
                },
            ],
            { cancelable: false }
        );
    }

    renderChannel() {
        return this.state.rooms.map((room) => {
            return (
                <View key={room._id}>
                    <Card>
                        <CardContent>
                            <Title>{room.title}</Title>
                            <Paragraph>Room Description</Paragraph>
                        </CardContent>
                        <CardCover source={{ uri: room.image }} />
                        <CardActions>
                            <Button onPress={() => this.handleJoin(room._id)}>Join</Button>
                        </CardActions>
                    </Card>
                </View>
            );
        });
    }

    render() {
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
                <ScrollView>
                    {this.renderChannel()}
                </ScrollView>
            </AndroidBackHandler>
        );
    }

}

const mapStateToProps = state => {
    return {
        token: state.token.token,
        loading: state.loading.loading,
        convoId: state.message.convoId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleTokenStore: token => dispatch(storeToken(token)),
        triggerLoad: () => dispatch(loadTrigger()),
        dismissLoad: () => dispatch(loadDismiss()),
        sendMessage: (message) => dispatch(sendMessage(message)),
        storeConvoId: (convoId) => dispatch(storeConvoId(convoId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageListScreen);

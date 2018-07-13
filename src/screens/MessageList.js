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
import { loadTrigger, loadDismiss } from '../redux/actions/actions';

class MessageListScreen extends Component {

    static navigationOptions = {
        headerTitle: 'Channels',
        headerLeft: null
    };

    constructor() {
        super();
        this.state = {
            loading: false,
            // rooms: []
        };
        this.handleJoin = this.handleJoin.bind(this);
        this.onBackButtonPressAndroid = this.onBackButtonPressAndroid.bind(this);
    }

    // componentWillMount() {
    //     // this.authenticateToken(this.props.token);
    //     axios.get('https://f46cccf6.ngrok.io/api/v1/chat/5b487e1e425fa14d618a13ff')
    //         .then(response => this.setState({
    //             rooms: response.data.conversation
    //         }));
    // }

    onBackButtonPressAndroid() {
        Alert.alert(
            'Do you want to logout?',
            null,
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => this.props.navigation.goBack() },
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
    handleJoin() {
        Alert.alert(
            'Are you sure you want to join room?',
            null,
            [
                { text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', 
                    onPress: () => {
                        this.props.navigation.navigate('Room');
                    } 
                },
            ],
            { cancelable: false }
        );
    }

    renderChannel() {
        return (
            <View>
                <Card>
                    <CardContent>
                        <Title>Room Title</Title>
                        <Paragraph>Room Description</Paragraph>
                    </CardContent>
                    <CardCover source={{ uri: 'https://picsum.photos/600' }} />
                    <CardActions>
                        <Button onPress={this.handleJoin}>Join</Button>
                    </CardActions>
                </Card>
            </View>
        );
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
        token: state.token.loading,
        loading: state.loading.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleTokenStore: token => dispatch(storeToken(token)),
        triggerLoad: () => dispatch(loadTrigger()),
        dismissLoad: () => dispatch(loadDismiss())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageListScreen);

import React from 'react';
import { View, Text } from 'react-native';
import { BarIndicator } from "react-native-indicators";
import axios from 'axios';
import { connect } from 'react-redux';
import FacebookLogin from '../components/FacebookLogin';
import { storeToken, loadTrigger, loadDismiss, storeUserId } from '../redux/actions/actions';
import { Button } from 'native-base';

class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
    }

    async handleLogin() {
        const APP_ID = '204391506888615';
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
            permissions: ['public_profile'],
        });
        this.props.triggerLoad();
        if (type === 'success') {
            console.log('Access Granted');
            axios({
                method: 'post',
                url: 'https://cdb4af5a.ngrok.io/api/v1/auth/facebook',
                headers: {
                  'Access-Control-Allow-Origin': '*', 
                  'Authorization': `Bearer ${token}`,
                }
            })
            .then((res) => {
                const accessToken = res.headers['x-auth-token'];
                const userCredentials = res.data;
                this.props.handleTokenStore(accessToken);
                this.props.storeUserId(res.data.id)
                this.props.navigation.navigate('MessageList'); 
            })
            .catch((err) => console.log(err));
        }
        // this.props.navigation.navigate('MessageList'); 
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
            <View style={styles.viewStyle}>
                <FacebookLogin handleLogin={this.handleLogin} />
                <Button 
                    onPress={() => {
                    this.props.navigation.navigate('MessageList');
                    this.props.storeUserId('5b49c1cf93abd5be05c27cac');
                    }} 
                >
                    <Text>Dave</Text>
                </Button>
                <Button 
                    onPress={() => {
                    this.props.navigation.navigate('MessageList');
                    this.props.storeUserId('5b49c1b093abd5be05c27cab');
                }}
                >
                    <Text>Angelo</Text>
                </Button>
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

const mapStateToProps = state => {
    return {
        token: state.token.token,
        loading: state.loading.loading,
        userId: state.user.userId
    };
};

const mapDispatchToProps = dispatch => {
    return { 
        handleTokenStore: token => dispatch(storeToken(token)), 
        triggerLoad: () => dispatch(loadTrigger()),
        dismissLoad: () => dispatch(loadDismiss()),
        storeUserId: (userId) => dispatch(storeUserId(userId))  
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

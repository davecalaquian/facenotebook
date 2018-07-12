import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import FacebookLogin from '../components/FacebookLogin';

class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            loading: false
        };
        this.handleLogin = this.handleLogin.bind(this);
    }

    async handleLogin() {
        const APP_ID = '678398929176766';
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
            permissions: ['public_profile'],
        });
        console.log(token);
        if (type === 'success') {
            this.setState({ loading: true });
            axios({
                method: 'post',
                url: 'https://thawing-forest-31945.herokuapp.com/api/v1/auth/facebook',
                headers: {
                  'Access-Control-Allow-Origin': '*', 
                  'Authorization': `Bearer ${token}`,
                }
            })
            .then((res) => {
                const accessToken = res.headers['x-auth-token'];
                this.props.navigation.navigate('MessageList', { accessToken });
            })
            .catch((err) => console.log(err));
        }
    }

    render() {
        if (this.state.loading) {
            return (
            <View style={styles.viewStyle}>
                <ActivityIndicator size='large' color='#000' />
            </View>
            );
        }

        return (
        <View style={styles.viewStyle}>
            <FacebookLogin handleLogin={this.handleLogin} />
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

export default LoginScreen;

import React from 'react';
import { View } from 'react-native';
import { PulseIndicator } from "react-native-indicators";
import axios from 'axios';
import { connect } from 'react-redux';
import FacebookLogin from '../components/FacebookLogin';
import { storeToken, loadTrigger, loadDismiss } from '../redux/actions/actions';

class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.handleLogin = this.handleLogin.bind(this);
    }

    async handleLogin() {
        const APP_ID = '678398929176766';
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            console.log('Access Granted');
            this.props.triggerLoad();
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
                this.props.handleTokenStore(accessToken);
                console.log('redux token', this.props.token);
                this.props.dismissLoad();
                this.props.navigation.navigate('MessageList'); 
            })
            .catch((err) => console.log(err));
        }
    }

    render() {
        if (this.props.loading) {
            return (
            <View style={styles.viewStyle}>
                <PulseIndicator 
                    size={100} 
                    color='#000'
                />
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

const mapStateToProps = state => {
    return {
        token: state.token.token,
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

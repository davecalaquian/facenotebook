import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class FacebookLogin extends Component {
    render() {
        return (
            <View>
                <Icon.Button 
                    name="facebook" 
                    backgroundColor="#3b5998" 
                    padding={15}
                    onPress={this.props.handleLogin}
                >
                    Login with Facebook
                </Icon.Button>
            </View>
        );
    }
}

export default FacebookLogin;

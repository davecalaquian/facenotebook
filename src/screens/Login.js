import React from 'react';
import { View } from 'react-native';
import FacebookLogin from '../components/FacebookLogin';

class Login extends React.Component {

    render() {
        return (
        <View style={styles.viewStyle}>
            <FacebookLogin />
        </View>
        );
    }
}

const styles = {
    viewStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFDDF'
    }
};

export default Login;

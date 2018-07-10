import React from 'react';
import { View } from 'react-native';
import FacebookLogin from '../components/FacebookLogin';

export default class App extends React.Component {

    render() {
        return (
        <View>
            <FacebookLogin />
        </View>
        );
    }
}

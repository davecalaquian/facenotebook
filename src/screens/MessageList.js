import React, { Component } from 'react';
import { ScrollView, Alert, View } from 'react-native';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardCover,
    Title,
    Paragraph
} from 'react-native-paper';

class MessageListScreen extends Component {

    static navigationOptions = {
        title: 'Rooms List',
        headerLeft: null
    };

    constructor() {
        super();
        this.state = {
            loading: false
        };
        this.handleJoin = this.handleJoin.bind(this);
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
                        const { navigation } = this.props;
                        const token = navigation.getParam('accessToken');
                        this.props.navigation.navigate('Room', { token });
                    } 
                },
            ],
            { cancelable: false }
        );
    }


    render() {
        return (
            <ScrollView>
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
                <View>
                    <Card>
                        <CardContent>
                            <Title>Room Title</Title>
                            <Paragraph>Room Description</Paragraph>
                        </CardContent>
                        <CardCover source={{ uri: 'https://picsum.photos/620' }} />
                        <CardActions>
                            <Button onPress={this.handleJoin}>Join</Button>
                        </CardActions>
                    </Card>
                </View>
                <View>
                    <Card>
                        <CardContent>
                            <Title>Room Title</Title>
                            <Paragraph>Room Description</Paragraph>
                        </CardContent>
                        <CardCover source={{ uri: 'https://picsum.photos/630' }} />
                        <CardActions>
                            <Button onPress={this.handleJoin}>Join</Button>
                        </CardActions>
                    </Card>
                </View>
            </ScrollView>

        );
    }

}

export default MessageListScreen;

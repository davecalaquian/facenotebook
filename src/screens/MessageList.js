import React, { Component } from 'react';
import { View } from 'react-native';
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
        title: 'Channels',
    };


    render() {
        const { navigation } = this.props;
        const token = navigation.getParam('accessToken');
        return (
            <View>
                <Card>
                    <CardContent>
                        <Title>{JSON.stringify(token)}</Title>
                        <Paragraph>Room Description</Paragraph>
                    </CardContent>
                    <CardCover source={{ uri: 'https://picsum.photos/600' }} />
                    <CardActions>
                        <Button>Join</Button>
                    </CardActions>
                </Card>
            </View>

        );
    }

}

export default MessageListScreen;

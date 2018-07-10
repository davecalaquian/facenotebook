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

class MessageList extends Component {

    render() {
        return (
            <View>
                <Card>
                    <CardContent>
                        <Title>Room Title</Title>
                        <Paragraph>Room Description</Paragraph>
                    </CardContent>
                    <CardCover source={{ uri: 'https://picsum.photos/700' }} />
                    <CardActions>
                        <Button>Join</Button>
                    </CardActions>
                </Card>
            </View>

        );
    }

}

export default MessageList;

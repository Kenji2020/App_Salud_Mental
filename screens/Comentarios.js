import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Comentarios=()=> {
    const [Comments, SetComments] = useState([]);
    const [commentValue, setCommentValue] = useState('');
    const [showComment, setShowComment] = useState(false);
    const InputRef = useRef();

    // Function to add comments to array
        const AddToComments = () => {
            let temp = {
                id: GenerateUniqueID(),
                commentValue: commentValue,
            };
            SetComments([...Comments, temp]); // Adds comment to Array
            InputRef.current.clear(); // This clears the TextInput Field
        };

    // Function to Generate a Unique ID for array elements
    const GenerateUniqueID = () => {
        return Math.floor(Math.random() * Date.now()).toString();
    };

    return (
        <View style={styles.container}>
            <FontAwesome name="commenting" size={34} color="black" />

            <View style={styles.comment_container}>
                <TextInput
                    style={styles.input_txt}
                    onChangeText={(text) => setCommentValue(text)}
                    placeholder="type something ..."
                    ref={InputRef}
                />
                <Button title="send" onPress={() => AddToComments()} />
            </View>

            {Comments.map((c) => (
                <View style={styles.showComment_container} key={c.id}>
                    <Text>{c.commentValue}</Text>
                </View>
            ))}
        </View>
    );
}

export default Comentarios;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    comment_container: {
        width: '100%',
        minHeight: 50,
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 40,
    },
    input_txt: {
        width: '70%',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
    },
    showComment_container: {
        width: '70%',
        minHeight: 50,
        backgroundColor: '#B0C4DE',
        marginTop: 10,
    },
});

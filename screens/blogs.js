import React, {useState, useRef} from "react";
import {
    View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Text
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {auth, db} from "../firebase";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import {Button} from 'react-native-elements'
import styles from './style'
import {arrayUnion, updateDoc} from "firebase/firestore";

const Blogs = (props) => {
    const initalState = {
        name: "", description: "", tags: [], nickname: "", comments: "",
    };
    const InputRef = useRef();
    const [state, setState] = useState(initalState);

    const handleChangeText = (value, name) => {

        if (name === "tags") {
            const tags = value.split(",");
            console.log(tags);
            console.log("alo")
            setState({...state, tags});
        } else {
            setState({...state, [name]: value});
        }
    };
    const GenerateUniqueID = () => {
        return Math.floor(Math.random() * Date.now()).toString();
    };
    const [Comments, SetComments] = useState([]);
    const [commentValue, setCommentValue] = useState('');
    const addToComments=()=>{
        let temp = {
            commentValue: commentValue,
            id: GenerateUniqueID(),
            autor: auth.currentUser.email
        };
        const ref = db.collection('Inventario').doc(props.route.params.userId);
        updateDoc(ref, {
            comments: arrayUnion(temp)
        }).then(r => {
            console.log(r);
        });
        SetComments([...Comments, temp]); // Adds comment to Array
        setCommentValue(''); // Clears the TextInput Field
        InputRef.current.clear();
    }



    const saveNewUser = async () => {
        if (state.description === "" || state.name === "" ) {
            alert("Por favor ingrese un descripción")
        } else {
            try {
                await db.collection("Inventario").add({
                    autor: auth.currentUser.email,
                    name: state.name,
                    description: state.description,
                    tags: state.tags,
                    nickname: state.nickname,
                    comments: Comments

                })


                db.collection("Inventario").where("autor", "==", auth.currentUser.email).get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        console.log(doc.id, " => ", doc.data());
                    });
                });
            } catch (error) {
                console.log(error)
            }
        }
    };
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
        });


        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>Cuenta tu historia</Text>
                    <TextInput
                        onChangeText={(value) => handleChangeText(value, "name")}
                        placeholder="Titulo"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}/>
                    <TextInput
                        onChangeText={(value) => handleChangeText(value, "nickname")}
                        placeholder="Nickname"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}/>
                    <TextInput
                        onChangeText={(value) => handleChangeText(value, "description")}
                        placeholder="Cuéntanos tu historia" placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                        multiline={true}
                    />
                    <TextInput
                        onChangeText={(value) => handleChangeText(value, "tags")}
                        placeholder="Tags (separados por comas)" placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput}
                    />

                    <Button
                        buttonStyle={{
                            backgroundColor: '#00a680',
                        }}
                        onPress={
                            () => {
                                saveNewUser()
                                props.navigation.navigate("Home")
                            }
                        } title="Publicar"/>

                </View>
            </View>
        </KeyboardAvoidingView>

    );
};

export default Blogs;

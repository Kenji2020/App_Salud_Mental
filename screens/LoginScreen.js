import {useNavigation} from '@react-navigation/core'
import React, {useEffect, useState} from 'react'
import {
    KeyboardAvoidingView,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ImageBackgroundComponent, TouchableWithoutFeedback, Keyboard, TextInput
} from 'react-native'
import styles from './style'
import {auth} from '../firebase'
import FormInput from "../components/FormInput";
import SignupScreen from "./SignupScreen";
import FormButton from "../components/FormButton";
import {Button} from "react-native-elements";
const image = { uri: "https://wallpaperaccess.com/full/1524344.jpg" };
const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
    }, [])


    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => alert('Datos incorrectos, intenta nuevamente'))
    }

    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>Cuéntanos lo que callas</Text>
                        <TextInput
                            onChangeText={(email) => setEmail(email)}
                            placeholder="Correo"
                            placeholderColor="#c4c3cb"
                            style={styles.loginFormTextInput} />
                        <TextInput
                            onChangeText={(password) => setPassword(password)}
                            placeholder="Contraseña" placeholderColor="#c4c3cb"
                            style={styles.loginFormTextInput}
                            secureTextEntry={true} />
                        <Button buttonStyle={styles.loginButton}  onPress={handleLogin} title="Iniciar sesión" />
                        <Button buttonStyle={styles.loginButton}  onPress={()=>navigation.navigate('SignupScreen')} title="¿No tienes cuenta? Regístrate" />

                    </View>
                </View>
        </KeyboardAvoidingView>
    )
}
export default LoginScreen

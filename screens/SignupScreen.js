import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    KeyboardAvoidingView, TextInput
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import SocialButton from "../components/SocialButton";
import {auth} from "../firebase";
import styles from './style'
import {Button} from "react-native-elements";

const SignupScreen = ({navigation})=>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleSignUp = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
            })
            .catch(error => alert(error.message))
    }
    return (
        <KeyboardAvoidingView style={styles.containerView} behavior="padding">
            <View style={styles.loginScreenContainer}>
                <View style={styles.loginFormView}>
                    <Text style={styles.logoText}>Todo empieza por ti</Text>
                    <TextInput
                        placeholder="Nickname (opcional)"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput} />
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
                    <TextInput
                        placeholder="Confirmar contraseña"
                        placeholderColor="#c4c3cb"
                        style={styles.loginFormTextInput} />
                    <Button buttonStyle={styles.loginButton} onPress={handleSignUp} title="Registrarse" />
                    <Button buttonStyle={styles.loginButton} onPress={()=>navigation.navigate('Login')} title="¿Tienes cuenta? Inicia sesión" />

                </View>
            </View>
        </KeyboardAvoidingView>

    )
}
export default SignupScreen


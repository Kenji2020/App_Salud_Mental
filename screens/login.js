import React from "react";

import styles from "./style";
import { Alert, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, Pressable, View } from "react-native";
import { Button, SocialIcon } from "react-native-elements";

const appId = "1047121222092614";

export default function LoginScreen() {
  const onLoginPress = () => {
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Instamobile</Text>
            <TextInput placeholder="Correo" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} />
            <TextInput placeholder="Contraseña" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
            <Button buttonStyle={styles.loginButton} onPress={() => onLoginPress()} title="Login" />
          </View>
        </View>
    </KeyboardAvoidingView>
  );
}

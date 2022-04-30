import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import blogs from './screens/blogs';
import BlogPage from './screens/BlogPage';
import PsicologoPage from "./screens/PsicologoPage";
import ChatPsicologo from "./screens/ChatPsicologo";
import Comentarios from "./screens/Comentarios";
import Articulos from "./screens/Articulos";
import EscribirArticulo from "./screens/EscribirArticulo";
import ArticuloDetallado from "./screens/ArticuloDetallado";

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen}/>
                <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
                <Stack.Screen options={{headerShown: false}} name="SignupScreen" component={SignupScreen}/>
                <Stack.Screen options={{headerShown: false}} name="blogs" component={blogs}/>
                <Stack.Screen options={{headerShown: false}} name="BlogPage" component={BlogPage}/>
                <Stack.Screen options={{headerShown: false}} name="ChatPsicologo" component={ChatPsicologo}/>
                <Stack.Screen options={{headerShown: false}} name="PsicologoPage" component={PsicologoPage}/>
                <Stack.Screen options={{headerShown: false}} name="Comentarios" component={Comentarios}/>
                <Stack.Screen options={{headerShown: false}} name="Articulos" component={Articulos}/>
                <Stack.Screen options={{headerShown: false}} name="EscribirArticulo" component={EscribirArticulo}/>
                <Stack.Screen options={{headerShown: false}} name="ArticuloDetallado" component={ArticuloDetallado}/>


            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

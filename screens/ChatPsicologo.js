import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Image, View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native'
// Packages
import {SharedElement} from 'react-navigation-shared-element';
// Icons

import {Feather} from '@expo/vector-icons'
import {db} from '../firebase'
import {Button} from 'react-native-paper';
import {useNavigation} from "@react-navigation/core";
const ChatPsicologo = (props) => {
    const initialState = {
        autor: "",
        id: "",
        name: "",
        description: "",
        tags: [],
        comments: "",
        nickname: "",
        motivation: "",
        image: "",
        correo:"",
        numero:"",
        tipoDeConsulta:"",
    };
    const [user, setUser] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const getUserById = async (id) => {
        const dbRef = db.collection('Psicólogos').doc(id)
        const doc = await dbRef.get()
        const user = doc.data()
        setUser({...user, id: doc.id});
        setLoading(false);
    }
    const [state, setState] = useState(initialState);
    useEffect(() => {
        getUserById(props.route.params.userId)
    }, []);
    const navigation = useNavigation()
    const {width, height} = Dimensions.get('window')
    const {data} = props.route.params;
    const image = {uri : user.image}
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <View>

                <SharedElement>

                    <Image source={image} style={{
                        width: '100%',
                        height: height - 450,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10
                    }} resizeMode="cover"/>
                </SharedElement>
                <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 14, left: 10}}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: 20
                    }}>
                        <View>
                            <SharedElement>
                                <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}/>
                            </SharedElement>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={{paddingHorizontal: 10, paddingTop: 14}}>
                <SharedElement style={{width: width - 30, marginBottom: 14}}>
                    <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold', lineHeight: 32}}>{user.name}</Text>
                </SharedElement>

                <Text style={{fontSize: 14, lineHeight: 28, textAlign: 'justify', opacity: 0.5}}>
                    {user.motivation}
                </Text>
                <SharedElement>
                    <Text style={{color: 'black', fontSize: 15,}}>{user.numero}</Text>
                </SharedElement>
                <SharedElement>
                    <Text style={{color: 'black', fontSize: 15,}}>{user.correo}</Text>
                </SharedElement>

                <Button
                    title="Desahógate"
                    buttonStyle={{
                        backgroundColor: '#00a680',

                    }}
                    onPress={() => navigation.navigate('Comentarios')}
                />
                <SharedElement>
                    <Text style={{color: 'black', fontSize: 15,}}>Tipo de consulta: {user.tipoDeConsulta}</Text>
                </SharedElement>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 14}}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingRight: 20
                    }}>

                        <View>
                            <SharedElement>
                                <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}/>
                            </SharedElement>


                        </View>


                    </View>
                </View>

            </ScrollView>

            <View style={{position: 'absolute', top: 40, left: 10}}>

            </View>

        </View>
    );
};

export default ChatPsicologo;

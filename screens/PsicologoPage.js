import React,{useState,useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Image, KeyboardAvoidingView, FlatList} from 'react-native';
import {useNavigation} from "@react-navigation/core";
import {db} from '../firebase'
import {Button} from 'react-native-elements';
const LoginScreen = ({ info }) => {

    const navigation = useNavigation()
    const [blogsList, setBlogsList] = useState([]);
    useEffect(()=>{
        db.collection('Psicólogos').onSnapshot(querySnapshot=>{
            const lista = []
            querySnapshot.docs.forEach(doc=>{
                const {name, description, tags,correo,image,numero,tipoDeConsulta} = doc.data()
                lista.push({
                    id:doc.id,name,description,tags,correo,image,numero,tipoDeConsulta
                })
            })
            setBlogsList([...lista])
        })
    },[])
    function renderItem ({item}) {
        const image = {uri : item.image}
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Image style={styles.imageStyle} source={image} />
                    <View style={styles.infoStyle}>
                        <Text style={styles.titleStyle} onPress={() => {
                            navigation.navigate('ChatPsicologo', {userId:item.id})
                        }}
                        >{item.name}</Text>
                        <Text style={styles.categoryStyle}>{item.correo}</Text>
                        <Text style={styles.categoryStyle}>{item.numero}</Text>
                        <Text style={styles.categoryStyle}>Tipo de consulta: {item.tipoDeConsulta}</Text>
                        <Text style={styles.categoryStyle} onPress={() => {
                            navigation.navigate('ChatPsicologo', {userId:item.id})
                        }}
                        >Leer más...</Text>
                    </View>
                </View>
            </View>
        );
    }
    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >

            <View style={{padding: 30}}>
                <FlatList
                    data={blogsList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <Button
                    title="Artículos"
                    buttonStyle={{
                        backgroundColor: '#00a680',
                    }}
                    onPress={() => navigation.navigate('Articulos')}
                />

            </View>
        </KeyboardAvoidingView>
    )

}

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
    container: {
        width: deviceWidth - 20,
        alignItems: 'center',
        marginTop: 25,
    },
    cardContainer: {
        width: deviceWidth - offset,
        backgroundColor: '#fff',
        height: 250,
        borderRadius: radius,

        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
    },
    imageStyle: {
        height: 130,
        width: deviceWidth - offset,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: '800',
    },
    categoryStyle: {
        fontWeight: '200',
    },
    infoStyle: {
        marginHorizontal: 10,
        marginVertical: 5,
    },
    iconLabelStyle: {
        flexDirection: 'row',
        marginTop: 10,
    },
});

export default LoginScreen;

import React, {useState,useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet, Image, FlatList, KeyboardAvoidingView} from 'react-native';
import {db, auth} from '../firebase'
import {Button} from "react-native-elements";
import {useNavigation} from "@react-navigation/core";

const Articulos = ({ info }) => {
    const [articulos, setArticulos] = useState([]);
    const navigation = useNavigation()
    const [blogsList, setBlogsList] = useState([]);
    useEffect(()=>{
        db.collection('Articulos').onSnapshot(querySnapshot=>{
            const lista = []
            querySnapshot.docs.forEach(doc=>{
                const {name, description, tags, nickname} = doc.data()
                lista.push({
                    id:doc.id,name,description,tags, nickname
                })

            })
            setBlogsList([...lista])
        })

    },[])
    React.useEffect(()=>{
        db.collection('correosPsicolgos').onSnapshot(querySnapshot=>{
            const docs = [];
            querySnapshot.forEach(doc=>{
                docs.push({
                    id: doc.id,
                    ...doc.data(),

                })
            })
            setArticulos([...docs]);
        })

    },[])
    function renderItem ({item}) {
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Image style={styles.imageStyle} source={require('../assets/Libros.png')} />
                    <View style={styles.infoStyle}>
                        <Text style={styles.titleStyle} onPress={() => {navigation.navigate('ArticuloDetallado', {userId:item.id})}}>{item.name}</Text>
                        <Text style={styles.categoryStyle}>{item.nickname}</Text>
                        <Text style={styles.categoryStyle}>{item.tags}</Text>
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
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={blogsList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <View>
                    <View style={styles.fixToText}>
                        {function(){
                            if(articulos.length>0){
                                console.log(articulos[0].correos)
                                if(articulos[0].correos.includes(auth.currentUser.email)){
                                    return(
                                        <Button
                                            title="Escribir artículo"
                                            buttonStyle={{
                                                backgroundColor: '#00a680',

                                            }}
                                            onPress={() => navigation.navigate('EscribirArticulo')}
                                        />
                                    )
                                }
                            }

                        }()}


                    </View>
                </View>

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
    button: {
        margin: 2,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        width: deviceWidth - offset,
        backgroundColor: '#fff',
        height: 230,
        borderRadius: radius,
        marginBottom: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 10,
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

export default Articulos;

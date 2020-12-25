import React, { useState, useEffect } from 'react';
//import socketio from 'socket.io-client';
import {  Alert,TouchableOpacity,Text,View, Platform,SafeAreaView ,ScrollView,StyleSheet , Image, AsyncStorage} from 'react-native';

import SpotList from '../componets/spotList';

import logo from '../assets/logo.png';

    export default function List({navigation}){

    const [techs, setTechs]  =useState([]);

    /*useEffect(() => {
        AsyncStorage.getItem('user').then(user_id =>{
            const socket = socketio('http://192.168.15.8:3333',{
                query : { user_id }
            })

            socket.on('booking_response', booking =>{
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })


    }, []) */

    function handdleLogout(){
        AsyncStorage.removeItem('user');

        navigation.navigate('Login');
    }   

    useEffect(() => {
        AsyncStorage.getItem('techs')
            .then((storagedTechs) => {
                const techsArray = storagedTechs.split(',').map(tech => tech.trim())

                setTechs(techsArray)
            })
    },[])

    return (
    <SafeAreaView style = {styles.container}>
        <View style={{flex: 0.2, flexDirection: 'row-reverse'}}>
            <TouchableOpacity  onPress={handdleLogout} style = {styles.button}>
                <Text style = {styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <Image style = {styles.logo} source = {logo}/>
        </View>
        
        <ScrollView>
                { techs.map(tech=> <SpotList key={tech} tech={tech} /> )}
            </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        
    },

    logo : {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
        
    },

    button : {
        marginTop: 30,
        height:30,
        width: 100,
        backgroundColor : '#f05a5b',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10
    },

    buttonText : {
        color: '#fff',
        fontWeight: 'bold',  
        fontSize: 15,
        
    }

});
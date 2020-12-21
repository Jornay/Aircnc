import React, { useState, useEffect } from 'react';
import {  Platform,SafeAreaView ,StyleSheet , Image, AsyncStorage} from 'react-native';

import SpotList from '../componets/spotList';

import logo from '../assets/logo.png';

export default function List(){

    const [techs, setTechs]  =useState([]);

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    return (
    <SafeAreaView style = {styles.container}>
        <Image style = {styles.logo} source = {logo}/>

        {techs.map(tech => <SpotList Key={tech} tech= {tech}/>)}
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
    }
});
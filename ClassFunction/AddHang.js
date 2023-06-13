import { Text, StyleSheet, TextInput, Alert, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.107:3000/Hang/';

const AddHang = ({ navigation }) => {
    const [name, setName] = useState('')

    const add = () => {
        if (name == '') {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin!')
            return;
        }
        let obj = { name: name };
        fetch(api_url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .then((res) => {
                if (res.status == 201) {
                    Alert.alert('Thông báo', 'Thêm hãng thành công!')
                    navigation.navigate('Hang')
                }
            })
    }

    const refresh = () => {
        setName('')
    }

    const previous = () => {
        navigation.navigate('Hang')
    }

    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button1} onPress={previous}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Thêm Hãng</Text>
                <TouchableOpacity onPress={add} style={styles.button1} >
                    <Icon name="check-circle" size={45} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.box2}>
                <Text style={styles.text}>Tên Hãng</Text>
                <TextInput style={styles.textInput} children={name} onChangeText={(content) => { setName(content) }} placeholder='Nhập Tên hãng' />
                <TouchableOpacity onPress={refresh} style={styles.button2} >
                    <Icon name="refresh" size={45} color="green" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default AddHang

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '30%',
        backgroundColor: '#CCFFFF',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
    },
    box1: {
        marginTop: '25%',
        flexDirection: 'row',
    },
    box2: {
        marginTop: '25%',
        width: 300,
        height: 300,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'green',
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '10%',
    },
    textInput: {
        marginTop: '20%',
        height: 50,
        width: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'green'
    },
    button1: {
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    button2: {
        marginTop: '15%'
    },
})
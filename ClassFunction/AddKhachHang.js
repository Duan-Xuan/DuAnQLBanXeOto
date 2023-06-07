import { Text, StyleSheet, TextInput, Alert, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.109:3000/KhachHang/';

const AddKhachHang = (props) => {

    const { navigation } = props
    const [name, setName] = useState('')
    const [sdt, setSdt] = useState('')
    const [diaChi, setDiaChi] = useState('')

    const add = () => {
        if (name == '' || sdt == '' || diaChi == '') {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin!')
            return;
        }
        if (isNaN(sdt)) {
            Alert.alert('Lỗi', 'Vui lòng nhập sdt là số!')
            return;
        }
        let obj = { name: name, sdt: sdt, diaChi: diaChi };
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
                    Alert.alert('Thông báo', 'Thêm khách hàng thành công!')
                    navigation.navigate('KhachHang')
                }
            })
    }

    const refresh = () => {
        setName('')
        setSdt('')
        setDiaChi('')
    }

    const previous = () => {
        navigation.navigate('KhachHang')
    }

    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button1} onPress={previous}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Thêm Khách Hàng</Text>
                <TouchableOpacity onPress={add} style={styles.button1} >
                    <Icon name="check-circle" size={45} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.box2}>
                <Text style={styles.text}>Khách Hàng</Text>
                <TextInput style={styles.textInput} children={name} onChangeText={(content) => { setName(content) }} placeholder='Tên Khách Hàng' />
                <TextInput style={styles.textInput} children={sdt} onChangeText={(content) => { setSdt(content) }} placeholder='Số Điện Thoại Khách Hàng' />
                <TextInput style={styles.textInput} children={diaChi} onChangeText={(content) => { setDiaChi(content) }} placeholder='Địa Chỉ Khách Hàng' />
                <TouchableOpacity onPress={refresh} style={styles.button2} >
                    <Icon name="refresh" size={45} color="green" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default AddKhachHang

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
        marginTop: '15%',
        width: 300,
        height: 320,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'green',
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '5%',
    },
    textInput: {
        marginTop: '5%',
        height: 50,
        width: 250,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'green'
    },
    button1: {
        marginTop: '12%',
    },
    button2: {
        marginTop: '5%'
    },
})
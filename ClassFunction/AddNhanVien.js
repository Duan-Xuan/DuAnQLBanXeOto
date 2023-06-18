import { Text, StyleSheet, TextInput, Alert, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.106:3000/NhanVien/';

const AddNhanVien = ({ navigation }) => {
    const [name, setName] = useState('')
    const [diaChi, setDiaChi] = useState('')
    const [matkhau, setMatKhau] = useState('')
    const [namSinh, setNamSinh] = useState('')

    const add = () => {
        if (name == '' || matkhau == '' || diaChi == '' || namSinh == '') {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin!')
            return;
        }
        let obj = { name: name, namSinh: namSinh, diaChi: diaChi, matKhau: matkhau };
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
                    navigation.navigate('NhanVien')
                }
            })
    }

    const refresh = () => {
        setName('')
        setMatKhau('')
        setDiaChi('')
        setNamSinh('')
    }

    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button1} onPress={() => { navigation.navigate('NhanVien') }}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Thêm Nhân Viên</Text>
                <TouchableOpacity onPress={add} style={styles.button1} >
                    <Icon name="check-circle" size={45} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.box2}>
                <Text style={styles.text}>Nhân Viên</Text>
                <TextInput style={styles.textInput} children={name} onChangeText={(content) => { setName(content) }} placeholder='Tên Nhân Viên' />
                <TextInput style={styles.textInput} children={diaChi} onChangeText={(content) => { setDiaChi(content) }} placeholder='Địa Chỉ Nhân Viên' />
                <TextInput style={styles.textInput} children={namSinh} onChangeText={(content) => { setNamSinh(content) }} placeholder='Năm sinh Nhân Viên' />
                <TextInput style={styles.textInput} children={matkhau} onChangeText={(content) => { setMatKhau(content) }} secureTextEntry placeholder='Mật khẩu Nhân Viên' />
                <TouchableOpacity onPress={refresh} style={styles.button2} >
                    <Icon name="refresh" size={45} color="green" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default AddNhanVien

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
        height: 380,
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
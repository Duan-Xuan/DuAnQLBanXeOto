import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert, Text, TextInput, ImageBackground, DatePickerIOSBase } from 'react-native';
import background from '../assets/backgroud.png';
import facebook from '../assets/facebook.png';
import google from '../assets/google.png';
import twitter from '../assets/twitter.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api_url = 'http://192.168.0.109:3000/NhanVien/';

const Login = ({ navigation }) => {
    const [name, setName] = useState('');
    const [matKhau, setMatKhau] = useState('');

    const login = () => {
        if (name === '' || matKhau === '') {
            Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin');
            return;
        }

        fetch(api_url)
            .then((res) => res.json())
            .then((data_json) => {
                for (let i = 0; i < data_json.length; i++) {
                    if (name == data_json[i].name && matKhau == data_json[i].matKhau) {
                        AsyncStorage.setItem('idNv', '' + data_json[i].id);
                        Alert.alert('Thông báo', 'Đăng nhập thành công');
                        navigation.navigate('Home');
                        return;
                    }
                }
                Alert.alert('Thông báo', 'Tài khoản hoặc mật khẩu không chính xác');
            })
    };

    return (
        <ImageBackground source={background} style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.text1}>Username</Text>
            <TextInput style={styles.textinput} onChangeText={(content) => setName(content)} placeholder="Nhập Username" />
            <Text style={styles.text1}>Password</Text>
            <TextInput style={styles.textinput} onChangeText={(content) => setMatKhau(content)} secureTextEntry placeholder="Nhập Password" />
            <View style={styles.box}>
                <Text style={styles.ke} />
                <Text style={styles.text2}>OR</Text>
                <Text style={styles.ke} />
            </View>
            <View style={styles.box}>
                <TouchableOpacity style={styles.img}>
                    <Image source={facebook} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.img}>
                    <Image source={google} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.img}>
                    <Image source={twitter} />
                </TouchableOpacity>
            </View>
            <Text style={styles.text2}>Don't have an account? Signup</Text>
            <TouchableOpacity onPress={login} style={styles.button}>
                <Text style={styles.text3}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.text4}>Được tạo bởi team nhóm 7!</Text>
        </ImageBackground>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '30%',
        backgroundColor: '#CCFFFF',
        alignItems: 'center'
    },
    title: {
        marginTop: '55%',
        fontSize: 35,
        fontWeight: 'bold',
        color: '#007700',
    },
    text1: {
        padding: 15,
        fontWeight: 'bold',
        marginRight: '50%'
    },
    text2: {
        fontWeight: 'bold'
    },
    text3: {
        fontWeight: 'bold',
        color: 'white'
    },
    text4: {
        marginTop: '15%',
        fontWeight: 'bold',
    },
    textinput: {
        height: 40,
        width: '80%',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    box: {
        flexDirection: 'row',
        marginTop: '5%'
    },
    ke: {
        marginLeft: 10,
        marginRight: 10,
        width: '30%',
        borderBottomWidth: 0.5,
    },
    img: {
        margin: 15
    },
    button: {
        marginTop: '5%',
        height: 50,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'green'
    }
});

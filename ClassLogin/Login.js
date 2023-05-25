import { StyleSheet, View, Image, TouchableOpacity, Alert, Text, TextInput, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import background from '../assets/backgroud.png'
import facebook from '../assets/facebook.png'
import google from '../assets/google.png'
import twitter from '../assets/twitter.png'

export default class Login extends Component {
    state = {
        Username: '',
        Password: ''
    }

    render() {
        const { navigation } = this.props

        const login = () => {
            if (this.state.Username == '' || this.state.Password == '') {
                Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin')
                return
            }
            if (this.state.Username == 'admin' && this.state.Password == 'admin') {
                Alert.alert('Thông báo', 'Đăng nhập thành công')
                navigation.navigate('Home')
            } else {
                Alert.alert('Thông báo', 'Sai thông tin đăng nhập')
            }
        }

        const fix = () => {
            Alert.alert('Thông báo', 'Tính năng đang phát triển ...')
        }

        return (
            <ImageBackground source={background} style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.text1}>Username</Text>
                <TextInput style={styles.textinput} onChangeText={(content) => { this.setState({ Username: content }) }} placeholder='Nhập Username' />
                <Text style={styles.text1}>Password</Text>
                <TextInput style={styles.textinput} onChangeText={(content) => { this.setState({ Password: content }) }} placeholder='Nhập Password' />
                <View style={styles.box}>
                    <Text style={styles.ke} />
                    <Text style={styles.text2}>OR</Text>
                    <Text style={styles.ke} />
                </View>
                <View style={styles.box}>
                    <TouchableOpacity onPress={fix} style={styles.img}>
                        <Image source={facebook} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={fix} style={styles.img}>
                        <Image source={google} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={fix} style={styles.img}>
                        <Image source={twitter} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.text2}>Don't have an account ? singup</Text>
                <TouchableOpacity onPress={login} style={styles.button}>
                    <Text style={styles.text3}>Login</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
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
        backgroundColor: '#00BB00'
    }
})
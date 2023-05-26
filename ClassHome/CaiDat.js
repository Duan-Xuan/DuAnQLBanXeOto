import { Text, StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

const CaiDat = (props) => {
    const { navigation } = props

    const previous = () => {
        navigation.navigate('Home')
    }

    const logout = () => {
        navigation.replace('Login')
    }

    return (
        <ImageBackground source={background} style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Cài đặt</Text>
                <View style={styles.box2}>
                    <TouchableOpacity onPress={previous}>
                        <Icon name="reply" size={45} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Đổi Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logout} style={styles.button}>
                        <Text style={styles.text}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.text4}>Được tạo bởi team nhóm 7 !</Text>
        </ImageBackground>
    )
}

export default CaiDat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '30%',
        alignItems: 'center',
        backgroundColor: '#CCFFFF',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginTop: '20%'
    },
    box: {
        flex: 10,
        alignItems: 'center',
    },
    box2: {
        marginTop: '30%'
    },
    button: {
        width: 300,
        height: 70,
        borderRadius: 25,
        marginTop: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    text4: {
        fontWeight: 'bold',
    }
})
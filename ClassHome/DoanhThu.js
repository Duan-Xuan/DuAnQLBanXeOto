import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.115:3000/HoaDonCt/';

const DoanhThu = (props) => {
    const { navigation } = props
    const [object, setobject] = useState([])
    const [tongTien, setTongTien] = useState(0)
    const [von, setVon] = useState(0)

    const previous = () => {
        navigation.navigate('Home')
    }

    const getList = () => {
        let a = 0, b = 0
        object.splice(0, object.length)
        fetch(api_url)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                for (let i = 0; i < data_json.length; i++) {
                    for (let j = 0; j < data_json[i].object.length; j++) {
                        setTongTien(a += data_json[i].object[j].tongTien)
                        setVon(b += (data_json[i].object[j].giaNhap * data_json[i].object[j].soLuong))
                    }
                }
            })
    }

    return (
        <ImageBackground onLoad={getList} source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button} onPress={previous}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Doanh Thu</Text>
                <View style={styles.button} >
                    <Icon name="ravelry" size={45} color="white" />
                </View>
            </View>
            <View style={styles.box2}>
                <Text style={styles.text}>Tổng tiền: {tongTien}VND</Text>
                <Text style={styles.text}>Vốn: {von}VND</Text>
                <Text style={styles.text}>Lãi: {tongTien - von}VND</Text>
            </View>
        </ImageBackground>
    )
}

export default DoanhThu

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '30%',
        backgroundColor: '#CCFFFF',
        alignItems: 'center',
    },
    title: {
        fontSize: 37,
        fontWeight: 'bold',
        color: 'white',
    },
    box1: {
        marginTop: '25%',
        flexDirection: 'row',
    },
    box2: {
        marginTop: '18%',
    },
    box31: {
        width: 350,
        backgroundColor: '#EEEEEE',
        margin: 5,
        borderWidth: 1,
        borderColor: 'green',
        borderRadius: 20,
        alignItems: 'center',
    },
    button: {
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
    },
    text1: {
        marginTop: '2%',
        fontWeight: 'bold',
    },
    text2: {
        margin: '3%',
        fontWeight: 'bold',
        fontSize: 25,
        color: 'red'
    },
    box2: {
        marginTop: '15%',
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
        fontSize: 18,
        marginTop: '15%',
    },
})
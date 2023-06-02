import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.115:3000/SanPham/';
var api_url2 = 'http://192.168.0.115:3000/HoaDonCt/';

const BanChay = (props) => {
    const { navigation } = props
    const [object, setobject] = useState([])

    const previous = () => {
        navigation.navigate('Home')
    }

    const getList = () => {
        let a = 0
        object.splice(0, object.length)
        fetch(api_url)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                fetch(api_url2)
                    .then((res) => { return res.json(); })
                    .then((data_json2) => {
                        for (let i = 0; i < data_json.length; i++) {
                            a = 0
                            for (let j = 0; j < data_json2.length; j++) {
                                for (let k = 0; k < data_json2[j].object.length; k++) {
                                    if (data_json[i].id == data_json2[j].object[k].idSanPham) {
                                        a += data_json2[j].object[k].soLuong
                                    }
                                }
                            }
                            object.push({ name: data_json[i].name, soLuong: a })
                        }
                    })
            })
    }

    return (
        <ImageBackground onLoad={getList} source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button} onPress={previous}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Top bán</Text>
                <View style={styles.button} >
                    <Icon name="ravelry" size={45} color="white" />
                </View>
            </View>
            <View style={styles.box2}>
                <FlatList data={object} renderItem={(data) => (
                    <View style={styles.box31}>
                        <Text style={styles.text1}>Sản Phẩm: {data.item.name}</Text>
                        <Text style={styles.text2}>Số lượng: {data.item.soLuong}</Text>
                    </View>
                )} />
            </View>
        </ImageBackground>
    )
}

export default BanChay

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
})
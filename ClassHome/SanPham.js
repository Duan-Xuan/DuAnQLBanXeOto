import { Text, StyleSheet, View, TouchableOpacity, Image, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.115:3000/SanPham/';

const SanPham = (props) => {
    const { navigation } = props
    const [object, setobject] = useState([])

    const addSanPham = () => {
        navigation.navigate('AddSanPham')
    }

    const ttSanPham = (x) => {
        navigation.push('TtSanPham', { id: x })
    }

    const previous = () => {
        navigation.navigate('Home')
    }

    const getList = () => {
        fetch(api_url)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject(data_json)
            })
    }

    return (
        <ImageBackground onLoad={getList} source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button} onPress={previous}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Sản Phẩm</Text>
                <TouchableOpacity onPress={addSanPham} style={styles.button} >
                    <Icon name="plus-circle" size={45} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.box2}>
                <FlatList data={object} renderItem={(data) => (
                    <TouchableOpacity onPress={ttSanPham.bind(this, data.item.id)}>
                        <View style={styles.box31}>
                            <Image style={styles.img} source={{ uri: data.item.avatar }} />
                            <View style={styles.box32}>
                                <Text style={styles.text1}>Sản Phẩm: {data.item.name}</Text>
                                <Text style={styles.text1}>Giá nhập: {data.item.giaNhap}</Text>
                                <Text style={styles.text1}>Giá bán: {data.item.giaBan}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )} />
            </View>
        </ImageBackground>
    )
}

export default SanPham

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '30%',
        backgroundColor: '#CCFFFF',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
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
        flexDirection: 'row',
        borderColor: 'green',
        borderRadius: 20,
        alignItems: 'center'
    },
    box32: {
        flex: 2,
    },
    img: {
        flex: 1,
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 20,
        borderColor: 'green',
        borderWidth: 1,
    },
    button: {
        marginLeft: '10%',
        marginRight: '10%',
    },
    text1: {
        marginTop: '3%',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: '10%'
    },
})
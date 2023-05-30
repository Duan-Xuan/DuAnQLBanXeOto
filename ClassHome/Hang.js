import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.115:3000/Hang/';

const Hang = (props) => {
    const { navigation } = props
    const [object, setobject] = useState([])

    const addHang = () => {
        navigation.navigate('AddHang')
    }

    const ttHang = (x) => {
        navigation.push('TtHang', { id: x })
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
                <Text style={styles.title}>Hãng</Text>
                <TouchableOpacity onPress={addHang} style={styles.button} >
                    <Icon name="plus-circle" size={45} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.box2}>
                <FlatList data={object} renderItem={(data) => (
                    <TouchableOpacity onPress={ttHang.bind(this, data.item.id)}>
                        <View style={styles.box31}>
                            <Text style={styles.text1}>Tên Hãng</Text>
                            <Text style={styles.text2}>{data.item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )} />
            </View>
        </ImageBackground>
    )
}

export default Hang

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
        borderColor: 'green',
        borderRadius: 20,
        alignItems: 'center',
    },
    button: {
        marginLeft: '20%',
        marginRight: '20%',
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
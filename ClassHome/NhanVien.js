import { Image, ImageBackground, TextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.107:3000/NhanVien/';

const NhanVien = ({ navigation }) => {
    const [object, setobject] = useState([])
    const [object2, setObject2] = useState([])
    const [seach, setSeach] = useState('')

    const getNhanVien = () => {
        if (seach != '') {
            const array = object.filter(element => element.name.includes(seach))
            setObject2(array)
        } else {
            setObject2(object)
        }
    }

    const ttNhanVien = (x) => {
        navigation.push('TtNhanVien', { id: x })
    }

    const previous = () => {
        navigation.navigate('Home')
    }

    const getList = () => {
        fetch(api_url)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject(data_json)
                setObject2(data_json)
            })
    }

    return (
        <ImageBackground onLoad={getList} source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button} onPress={previous}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Nhân Viên</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddNhanVien')} style={styles.button} >
                    <Icon name="plus-circle" size={45} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.textInput}>
                <TextInput style={{ flex: 1 }} onChangeText={(content) => { setSeach(content) }} placeholder='Seach...' />
                <TouchableOpacity onPress={getNhanVien}>
                    <Icon name="search" size={40} color="green" />
                </TouchableOpacity>
            </View>
            <FlatList data={object2} renderItem={(data) => (
                <TouchableOpacity onPress={ttNhanVien.bind(this, data.item.id)}>
                    <View style={styles.box31}>
                        <Image style={styles.img} resizeMode='stretch' source={{ uri: data.item.id == 0 ? 'https://quantridoanhnghiep.vn/wp-content/uploads/2019/11/icon-10.png' : 'https://th.bing.com/th/id/OIP.yP52-oeLVAFEGwS-E3IHRQAAAA?pid=ImgDet&w=450&h=450&rs=1' }} />
                        <View style={styles.box32}>
                            <Text style={styles.text1}>Họ tên: {data.item.name}</Text>
                            <Text style={styles.text1}>Năm sinh: {data.item.namSinh}</Text>
                            <Text style={styles.text1}>Địa chỉ: {data.item.diaChi}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )} />
        </ImageBackground>
    )
}

export default NhanVien

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
        height: 100,
        margin: 10,
        borderRadius: 20,
        borderColor: 'green',
        borderWidth: 1,
    },
    button: {
        marginLeft: '5%',
        marginRight: '5%',
    },
    text1: {
        marginTop: '3%',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: '10%'
    },
    textInput: {
        width: 300,
        borderWidth: 1,
        padding: 2,
        margin: '3%',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'green'
    }
})
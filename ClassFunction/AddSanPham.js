import { Text, StyleSheet, TextInput, Alert, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'
import { Dropdown } from 'react-native-element-dropdown';

var api_url = 'http://192.168.0.108:3000/SanPham/';
var api_url2 = 'http://192.168.0.108:3000/Hang/';

const AddSanPham = (props) => {

    const { navigation } = props
    const [object, setobject] = useState([])
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [giaNhap, setGiaNhap] = useState('')
    const [giaBan, setGiaBan] = useState('')
    const [idHang, setIdHang] = useState('')

    const add = () => {
        if (avatar == '' || name == '' || giaNhap == '' || giaBan == '' || idHang == '') {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin!')
            return;
        }
        if (isNaN(giaNhap) || isNaN(giaBan)) {
            Alert.alert('Lỗi', 'Vui lòng nhập giá là số!')
            return;
        }
        let obj = { avatar: avatar, name: name, giaNhap: giaNhap, giaBan: giaBan, idHang: idHang };
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
                    Alert.alert('Thông báo', 'Thêm sản phẩm thành công!')
                    navigation.navigate('SanPham')
                }
            })
            .catch((ex) => {
                console.log(ex);
            });
    }

    const refresh = () => {
        setAvatar('')
        setName('')
        setGiaNhap('')
        setGiaBan('')
    }

    const previous = () => {
        navigation.navigate('SanPham')
    }

    const getList = () => {
        fetch(api_url2)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject(data_json)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <ImageBackground onLoad={getList} source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button1} onPress={previous}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Thêm Sản Phẩm</Text>
                <TouchableOpacity onPress={add} style={styles.button1} >
                    <Icon name="check-circle" size={45} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.box2}>
                <Text style={styles.text}>Sản Phẩm</Text>
                <TextInput style={styles.textInput} children={avatar} onChangeText={(content) => { setAvatar(content) }} placeholder='Ảnh Sản Phẩm' />
                <TextInput style={styles.textInput} children={name} onChangeText={(content) => { setName(content) }} placeholder='Tên Sản Phẩm' />
                <TextInput style={styles.textInput} children={giaNhap} onChangeText={(content) => { setGiaNhap(content) }} placeholder='Giá Nhập Sản Phẩm' />
                <TextInput style={styles.textInput} children={giaBan} onChangeText={(content) => { setGiaBan(content) }} placeholder='Giá Bán Sản Phẩm' />
                <Dropdown
                    style={styles.textInput}
                    data={object}
                    search
                    labelField="name"
                    valueField="id"
                    placeholder="Chọn hãng"
                    searchPlaceholder="Search..."
                    value={idHang}
                    onChange={item => {
                        setIdHang(item.id);
                    }}
                />
                <TouchableOpacity onPress={refresh} style={styles.button2} >
                    <Icon name="refresh" size={45} color="green" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

export default AddSanPham

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
        height: 450,
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
        marginTop: '10%',
        marginLeft: '3%',
        marginRight: '3%',
    },
    button2: {
        marginTop: '5%'
    },
})
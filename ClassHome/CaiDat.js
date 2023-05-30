import { Text, StyleSheet, Alert, TextInput, View, TouchableOpacity, ImageBackground, Image, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.115:3000/NhanVien/';

const CaiDat = (props) => {
    const { navigation } = props
    const [object, setobject] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [passWordOld, setPassWordOld] = useState('')
    const [passWord1, setPassWord1] = useState('')
    const [passWord2, setPassWord2] = useState('')
    const [idNv, setIdNv] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('idNv').then(result => {
            setIdNv(result)
        })
    }, [])

    const modal = () => {
        setIsModal(!isModal)
    }

    const update = () => {
        if (passWordOld == '' || passWord1 == '' || passWord2 == '') {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin!')
            return;
        }
        if (passWordOld != object.matKhau) {
            Alert.alert('Lỗi', 'Mật khẩu không chính xác!')
            return;
        }
        if (passWord1 != passWord2) {
            Alert.alert('Lỗi', 'Mật mới không trùng nhau!')
            return;
        }
        let obj = { name: object.name, namSinh: object.namSinh, diaChi: object.diaChi, matKhau: passWord1 };
        fetch(api_url + idNv, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .then((res) => {
                if (res.status == 200) {
                    Alert.alert('Thông báo', 'Sửa thông tin thành công!')
                    logout()
                }
            })
    }

    const previous = () => {
        navigation.navigate('Home')
    }

    const logout = () => {
        AsyncStorage.clear()
        navigation.replace('Login')
    }

    const getList = () => {
        fetch(api_url + idNv)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject(data_json)
            })
    }

    return (
        <ImageBackground onLoad={getList} source={background} style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Cài đặt</Text>
                <View style={styles.box2}>
                    <TouchableOpacity onPress={previous}>
                        <Icon name="reply" size={45} color="white" />
                    </TouchableOpacity>
                    <Image style={styles.img} source={{ uri: idNv == 0 ? 'https://quantridoanhnghiep.vn/wp-content/uploads/2019/11/icon-10.png' : 'https://th.bing.com/th/id/OIP.yP52-oeLVAFEGwS-E3IHRQAAAA?pid=ImgDet&w=450&h=450&rs=1' }} />
                    <Text style={styles.text}>Xin Chào: {object.name}!</Text>
                    <TouchableOpacity onPress={modal} style={styles.button}>
                        <Text style={styles.text2}>Đổi Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={logout} style={styles.button}>
                        <Text style={styles.text2}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal animationType="slide"
                transparent={true}
                visible={isModal}
                onRequestClose={() => { modal }}>
                <View style={styles.khungngoai}>
                    <View style={styles.khungtrong}>
                        <Text style={styles.title2}>Update Password</Text>
                        <Text style={styles.text3}>Password Old</Text>
                        <TextInput style={styles.textInputNgoai} onChangeText={(content) => { setPassWordOld(content) }} secureTextEntry placeholder='Mật khẩu cũ' />
                        <Text style={styles.text3}>Enter password</Text>
                        <TextInput style={styles.textInputNgoai} onChangeText={(content) => { setPassWord1(content) }} secureTextEntry placeholder='Mật khẩu mới' />
                        <Text style={styles.text3}>Change Password</Text>
                        <TextInput style={styles.textInputNgoai} onChangeText={(content) => { setPassWord2(content) }} secureTextEntry placeholder='Nhập lại mật khẩu' />
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <TouchableOpacity onPress={modal} style={styles.button3}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                    Đóng
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={update} style={styles.button3}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                    Lưu
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    img: {
        marginTop: '5%',
        width: 150,
        height: 150,
        marginLeft: '20%',
        borderRadius: 50,
        borderColor: 'green',
        borderWidth: 1,
    },
    box: {
        flex: 10,
        alignItems: 'center',
    },
    box2: {
        marginTop: '5%'
    },
    button: {
        width: 300,
        height: 70,
        borderRadius: 25,
        marginTop: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: '23%',
        marginTop: '2%',
    },
    text2: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    text4: {
        fontWeight: 'bold',
    },
    khungngoai: {
        flex: 1,
        justifyContent: 'center',
    },
    khungtrong: {
        height: 420,
        borderRadius: 20,
        backgroundColor: 'white',
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'green',
    },
    textInputNgoai: {
        width: 250,
        marginTop: '3%',
        marginBottom: '3%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: 'red',
        borderColor: 'green',
    },
    button3: {
        width: 100,
        height: 50,
        margin: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'green'
    },
    title2: {
        fontSize: 30,
        marginTop: '5%',
        fontWeight: 'bold'
    },
    text3: {
        fontWeight: 'bold',
    },
})
import { Text, StyleSheet, Image, TextInput, Alert, View, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.109:3000/NhanVien/';

const TtNhanVien = (props) => {

    const { navigation } = props
    const { id } = props.route.params
    const [object, setobject] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [isName, setIsName] = useState(true)
    const [name, setName] = useState('')
    const [namSinh, setNamSinh] = useState('')
    const [diaChi, setDiaChi] = useState('')

    const modal = () => {
        if (name == 'Admin')
            setIsName(false)
        setIsModal(!isModal)
    }

    const previous = () => {
        navigation.navigate('NhanVien')
    }

    const update = () => {
        if (name == '' || namSinh == '' || diaChi == '') {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin!')
            return;
        }
        if (isNaN(namSinh)) {
            Alert.alert('Lỗi', 'Vui lòng nhập năm sinh là số!')
            return;
        }
        let obj = { name: name, namSinh: namSinh, diaChi: diaChi, matKhau: object.matKhau };
        fetch(api_url + id, {
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
                    getList()
                    modal()
                }
            })
    }

    const xoa = () => {
        if (name == 'Admin') {
            Alert.alert('Thông báo', 'Không thể xóa admin')
            return
        }

        Alert.alert('Thông báo', 'Bạn muốn xóa nhân viên này!', [
            {
                text: 'Không',
                onPress: () => { }
            },
            {
                text: 'Có',
                onPress: () => {
                    fetch(api_url + id, {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((res) => {
                            if (res.status == 200) {
                                Alert.alert("Thông báo", "Xóa thông tin thành công!")
                                navigation.navigate('NhanVien')
                            }
                        })
                }
            }
        ],
            {
                cancelable: true,
                onDismiss: () => { }
            }
        );
    }

    const getList = () => {
        fetch(api_url + id)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject(data_json)
                setName(data_json.name)
                setNamSinh(data_json.namSinh)
                setDiaChi(data_json.diaChi)
            })
    }

    return (
        <ImageBackground onLoad={getList} source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button1} onPress={previous}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Thông Tin Nhân Viên</Text>
                <TouchableOpacity onPress={modal} style={styles.button1} >
                    <Icon name="paint-brush" size={45} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.box2}>
                <Image style={styles.img} source={{ uri: object.id == 0 ? 'https://quantridoanhnghiep.vn/wp-content/uploads/2019/11/icon-10.png' : 'https://th.bing.com/th/id/OIP.yP52-oeLVAFEGwS-E3IHRQAAAA?pid=ImgDet&w=450&h=450&rs=1' }} />
                <Text style={styles.text}>Tên: {object.name}</Text>
                <Text style={styles.text}>Năm sinh: {object.namSinh}</Text>
                <Text style={styles.text}>Địa chỉ: {object.diaChi}</Text>
                <TouchableOpacity onPress={xoa} style={styles.button2} >
                    <Icon name="trash-o" size={45} color="red" />
                </TouchableOpacity>
            </View>
            <Modal animationType="slide"
                transparent={true}
                visible={isModal}
                onRequestClose={() => { modal }}>
                <View style={styles.khungngoai}>
                    <View style={styles.khungtrong}>
                        <Text style={styles.title2}>Update Nhân Viên</Text>
                        <Text style={styles.text3}>Tên Nhân Viên</Text>
                        <TextInput children={object.name} style={styles.textInputNgoai} onChangeText={(content) => { setName(content) }} editable={isName} placeholder='Tên Nhân Viên' />
                        <Text style={styles.text3}>Năm Sinh</Text>
                        <TextInput children={object.namSinh} style={styles.textInputNgoai} onChangeText={(content) => { setNamSinh(content) }} placeholder='Năm Sinh Nhân Viên' />
                        <Text style={styles.text3}>Địa Chỉ</Text>
                        <TextInput children={object.diaChi} style={styles.textInputNgoai} onChangeText={(content) => { setDiaChi(content) }} placeholder='Địa Chỉ Nhân Viên' />
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
        </ImageBackground>
    )
}

export default TtNhanVien

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '30%',
        backgroundColor: '#CCFFFF',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    title2: {
        fontSize: 30,
        marginTop: '5%',
        fontWeight: 'bold'
    },
    box1: {
        marginTop: '25%',
        flexDirection: 'row',
    },
    box2: {
        marginTop: '15%',
        width: 300,
        height: 400,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'green',
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: '5%',
    },
    text3: {
        fontWeight: 'bold',
    },
    button1: {
        marginTop: '12%',
        marginLeft: '-5%',
        marginRight: '-5%',
    },
    button2: {
        marginTop: '5%'
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
    img: {
        width: 200,
        height: 180,
        borderRadius: 10,
        marginTop: '5%',
        borderColor: 'green',
        borderWidth: 1,
    }
})
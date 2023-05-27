import { Text, StyleSheet, Image, TextInput, Alert, View, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'
import { Dropdown } from 'react-native-element-dropdown';

var api_url = 'http://192.168.0.108:3000/SanPham/';
var api_url2 = 'http://192.168.0.108:3000/Hang/';

const TtSanPham = (props) => {

    const { navigation } = props
    const { id } = props.route.params
    const [object, setobject] = useState([])
    const [object2, setobject2] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [giaNhap, setGiaNhap] = useState('')
    const [giaBan, setGiaBan] = useState('')
    const [idHang, setIdHang] = useState(null)

    const modal = () => {
        setIsModal(!isModal)
    }

    const previous = () => {
        navigation.navigate('SanPham')
    }

    const update = () => {
        if (avatar == '' || name == '' || giaNhap == '' || giaBan == '' || idHang == null) {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin!')
            return;
        }
        if (isNaN(giaNhap) || isNaN(giaBan)) {
            Alert.alert('Lỗi', 'Vui lòng nhập giá là số!')
            return;
        }
        let obj = { avatar: avatar, name: name, giaNhap: giaNhap, giaBan: giaBan, idHang: idHang };
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
            .catch((ex) => {
                console.log(ex);
            });
    }

    const xoa = () => {
        Alert.alert('Thông báo', 'Bạn muốn xóa sản phẩm này!', [
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
                                navigation.navigate('SanPham')
                            }
                        })
                        .catch((ex) => {
                            console.log(ex);
                        });
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
                setAvatar(data_json.avatar)
                setName(data_json.name)
                setGiaNhap(data_json.giaNhap)
                setGiaBan(data_json.giaBan)
                setIdHang(data_json.idHang)
                fetch(api_url2 + data_json.idHang)
                    .then((res) => { return res.json(); })
                    .then((data_json) => {
                        setobject(data_json)
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });

        fetch(api_url2)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject2(data_json)
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
                <Text style={styles.title}>Thông Tin Sản Phẩm</Text>
                <TouchableOpacity onPress={modal} style={styles.button1} >
                    <Icon name="paint-brush" size={45} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.box2}>
                <Image style={styles.img} source={{ uri: avatar }} />
                <Text style={styles.text}>Sản Phẩm: {name}</Text>
                <Text style={styles.text}>Giá nhập: {giaNhap}</Text>
                <Text style={styles.text}>Giá bán: {giaBan}</Text>
                <Text style={styles.text}>Hãng: {object.name}</Text>
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
                        <Text style={styles.title2}>Update Hãng</Text>
                        <Text style={styles.text3}>Avatar</Text>
                        <TextInput children={avatar} style={styles.textInputNgoai} onChangeText={(content) => { setAvatar(content) }} placeholder='Ảnh Sản Phẩm' />
                        <Text style={styles.text3}>Tên Sản Phẩm</Text>
                        <TextInput children={name} style={styles.textInputNgoai} onChangeText={(content) => { setName(content) }} placeholder='Tên Sản Phẩm' />
                        <Text style={styles.text3}>Giá Nhập</Text>
                        <TextInput children={giaNhap} style={styles.textInputNgoai} onChangeText={(content) => { setGiaNhap(content) }} placeholder='Giá Nhập Sản Phẩm' />
                        <Text style={styles.text3}>Giá Bán</Text>
                        <TextInput children={giaBan} style={styles.textInputNgoai} onChangeText={(content) => { setGiaBan(content) }} placeholder='Giá Bán Sản Phẩm' />
                        <Text style={styles.text3}>Hãng</Text>
                        <Dropdown
                            style={styles.textInputNgoai}
                            data={object2}
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

export default TtSanPham

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
        marginTop: '10%',
        marginLeft: '1%',
        marginRight: '1%',
    },
    button2: {
        marginTop: '10%'
    },
    khungngoai: {
        flex: 1,
        justifyContent: 'center',
    },
    khungtrong: {
        height: 600,
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
        height: 110,
        borderRadius: 10,
        marginTop: '5%'
    }
})
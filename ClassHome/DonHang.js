import { Text, StyleSheet, TextInput, Modal, View, TouchableOpacity, Image, ImageBackground, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.115:3000/SanPham/';
var api_url2 = 'http://192.168.0.115:3000/HoaDon/';
var api_url3 = 'http://192.168.0.115:3000/KhachHang/';
var api_url4 = 'http://192.168.0.115:3000/HoaDonCt/';

const DonHang = (props) => {
    const { navigation } = props
    const [object, setobject] = useState([])
    const [object2, setobject2] = useState([])
    const [object3, setobject3] = useState([])
    const [object4, setobject4] = useState([])
    const [object5, setobject5] = useState([])
    const [idSanPham, setIdSanPham] = useState('')
    const [avatar, setAvatar] = useState('')
    const [name, setName] = useState('')
    const [giaNhap, setGiaNhap] = useState('')
    const [giaBan, setGiaBan] = useState('')
    const [soLuong, setSoLuong] = useState(0)
    const [s, setS] = useState(0)
    const [n, setN] = useState(0)
    const [isModal, setIsModal] = useState(false)
    const [isModal2, setIsModal2] = useState(false)
    const [date, setDate] = useState('')
    const [idNv, setIdNv] = useState('')
    const [idKh, setIdKh] = useState('')

    useEffect(() => {
        var date = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        setDate(date + '/' + month + '/' + year)
        AsyncStorage.getItem('idNv').then(result => {
            setIdNv(result)
        })

    }, [])

    const gioHang = () => {
        if (object2.length <= 0) {
            Alert.alert('Thông báo', 'Chưa có sản phẩm trong giỏ')
            return
        }
        if (idKh == '') {
            Alert.alert('Thông báo', 'Chưa có khách hàng được chọn')
            return
        }
        let obj = { idHdCt: object5.length + 1, idKh: idKh, idNv: idNv, tongTien: s, trangThai: 'Đã thanh toán', ngayTao: date, loaiHd: 'Bill' };
        fetch(api_url2, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .then((res) => {
                if (res.status == 201) {
                    let obj2 = { idHoaDon: object4.length + 1, object: object2 };
                    fetch(api_url4, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj2)
                    })
                        .then((res) => {
                            if (res.status == 201) {
                                Alert.alert('Thông báo', 'Thêm sản phẩm thành công!')
                                setSoLuong(0)
                                setS(0)
                                object2.splice(0, object2.length)
                                modal2()
                                navigation.navigate('BanHang', { screen: 'Hóa Đơn' })
                            }
                        })
                }
            })
    }

    const tangGiam = (x) => {
        if (x == '+') {
            setN(n + 1)
        }
        if (x == '-' && n > 0) {
            setN(n - 1)
        }
    }

    const addGioHang = () => {
        if (n <= 0) {
            Alert.alert('Thông báo', 'Vui lòng chọn số lượng')
            return
        }
        for (let i = 0; i < object2.length; i++) {
            if (object2[i].idSanPham == idSanPham) {
                Alert.alert('Thông báo', 'Sản phẩm này đã có trong giỏ hàng. Để có thể thêm vui lòng xóa dữ liệu có trong giỏ')
                return
            }
        }
        object2.push({ idSanPham: idSanPham, nameSp: name, soLuong: n, giaNhap: giaNhap, tongTien: giaBan * n })
        let a = 0, b = 0
        for (let i = 0; i < object2.length; i++) {
            setSoLuong(a += object2[i].soLuong)
            setS(b += object2[i].tongTien)
        }
        setIsModal(!isModal)
    }

    const modal = (x) => {
        if (x != []) {
            setIdSanPham(x.id)
            setAvatar(x.avatar)
            setName(x.name)
            setGiaNhap(x.giaNhap)
            setGiaBan(x.giaBan)
            setN(0)
        }
        setIsModal(!isModal)
    }

    const modal2 = () => {
        setIsModal2(!isModal2)
    }

    const clearList = () => {
        Alert.alert('Thông báo', 'Bạn muốn danh sách này!', [
            {
                text: 'Không',
                onPress: () => { }
            },
            {
                text: 'Có',
                onPress: () => {
                    setSoLuong(0)
                    setS(0)
                    object2.splice(0, object2.length)
                    modal2()
                }
            }
        ],
            {
                cancelable: true,
                onDismiss: () => { }
            }
        );
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
        fetch(api_url2)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject4(data_json)
            })
        fetch(api_url3)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject3(data_json)
            })
        fetch(api_url4)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject5(data_json)
            })
    }

    return (
        <ImageBackground onLoad={getList} source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button} onPress={previous}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Đơn Hàng</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={modal2}>
                        <Icon name="shopping-basket" size={45} color="white" />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', }}>
                        <Text style={styles.textHang}>{soLuong}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box2}>
                <FlatList data={object} renderItem={(data) => (
                    <TouchableOpacity onPress={modal.bind(this, data.item)}>
                        <View style={styles.box31}>
                            <Image style={styles.img} source={{ uri: data.item.avatar }} />
                            <View style={styles.box32}>
                                <Text style={styles.text1}>Sản Phẩm: {data.item.name}</Text>
                                <Text style={styles.text1}>Giá bán: {data.item.giaBan}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )} />
            </View>
            <Modal animationType="slide"
                transparent={true}
                visible={isModal}
                onRequestClose={() => { modal }}>
                <View style={styles.khungngoai}>
                    <View style={styles.khungtrong}>
                        <Text style={styles.title2}>Thêm Đơn Hàng</Text>
                        <Image style={styles.img2} source={{ uri: avatar }} />
                        <Text style={styles.text3}>Sản Phẩm: {name} </Text>
                        <TextInput children={n} style={styles.textInputNgoai} editable={false} />
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.button} onPress={tangGiam.bind(this, '-')}>
                                <Icon name="minus-circle" size={45} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={tangGiam.bind(this, '+')}>
                                <Icon name="plus-circle" size={45} color="green" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <TouchableOpacity onPress={modal} style={styles.button3}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                    Đóng
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={addGioHang} style={styles.button3}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                    Thêm vào giỏ
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal animationType="slide"
                transparent={true}
                visible={isModal2}
                onRequestClose={() => { modal2 }}>
                <View style={styles.khungngoai}>
                    <View style={styles.khungtrong}>
                        <Text style={styles.title2}>Tạo Hóa Đơn</Text>
                        <Dropdown
                            style={styles.textInputNgoai}
                            data={object3}
                            search
                            labelField="name"
                            valueField="id"
                            placeholder="Chọn khách hàng"
                            searchPlaceholder="Search..."
                            value={idKh}
                            onChange={item => {
                                setIdKh(item.id);
                            }}
                        />
                        <View style={styles.boxHd}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={styles.text3}>Sản phẩm</Text>
                                <Text style={styles.text3}>Số lượng</Text>
                                <Text style={styles.text3}>Thành tiền</Text>
                            </View>
                            <FlatList data={object2} renderItem={(data) => (
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={styles.text4}>{data.item.nameSp}</Text>
                                    <Text style={styles.text4}>{data.item.soLuong}</Text>
                                    <Text style={styles.text4}>{data.item.tongTien}</Text>
                                </View>
                            )} />
                        </View>
                        <Text style={styles.text3}>Tổng: {s}</Text>
                        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                            <TouchableOpacity onPress={modal2} style={styles.button3}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                    Đóng
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={clearList}>
                                <Icon name="trash-o" size={45} color="red" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={gioHang} style={styles.button3}>
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                    Thanh toán
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    )
}

export default DonHang

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
    img2: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 20,
        borderColor: 'green',
        borderWidth: 1,
    },
    button: {
        marginLeft: '8%',
        marginRight: '8%',
        flexDirection: 'row'
    },
    text1: {
        marginTop: '3%',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: '10%'
    },
    textHang: {
        color: 'red',
        fontWeight: 'bold',
        backgroundColor: 'white',
        height: 20,
        width: 20,
        borderRadius: 15
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
    text3: {
        fontWeight: 'bold',
        marginLeft: '5%',
        marginRight: '5%',
    },
    text4: {
        fontWeight: 'bold',
        marginLeft: '15%',
        marginRight: '15%',
    },
    title2: {
        fontSize: 30,
        marginTop: '5%',
        fontWeight: 'bold'
    },
    boxHd: {
        borderWidth: 1,
        width: '80%',
        height: '40%',
        borderRadius: 10,
        borderColor: 'green'
    },
})
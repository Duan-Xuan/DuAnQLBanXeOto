import { Text, StyleSheet, FlatList, View, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.109:3000/HoaDon/';
var api_url2 = 'http://192.168.0.109:3000/HoaDonCt/';
var api_url3 = 'http://192.168.0.109:3000/KhachHang/';
var api_url4 = 'http://192.168.0.109:3000/NhanVien/';

const TtHoaDon = (props) => {

    const { navigation } = props
    const { id } = props.route.params
    const [object, setobject] = useState([])
    const [object2, setobject2] = useState([])
    const [object3, setobject3] = useState([])
    const [object4, setobject4] = useState([])

    const previous = () => {
        navigation.navigate('BanHang', { screen: 'Hóa Đơn' })
    }

    const getList = () => {
        fetch(api_url + id)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject(data_json)
                fetch(api_url3 + data_json.idKh)
                    .then((res) => { return res.json(); })
                    .then((data_json) => {
                        setobject3(data_json)
                    })
                fetch(api_url4 + data_json.idNv)
                    .then((res) => { return res.json(); })
                    .then((data_json) => {
                        setobject4(data_json)
                    })
            })
        fetch(api_url2 + id)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setobject2(data_json)
            })
    }

    return (
        <ImageBackground onLoad={getList} source={background} style={styles.container}>
            <View style={styles.box1}>
                <TouchableOpacity style={styles.button1} onPress={previous}>
                    <Icon name="reply" size={45} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Thông Tin Hóa Đơn</Text>
                <View style={styles.button1} />
            </View>
            <View style={styles.box2}>
                <Text style={styles.text}>Khách hàng: {object3.name}</Text>
                <Text style={styles.text}>Nhân viên: {object4.name}</Text>
                <View style={styles.boxHd}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={styles.text3}>Sản phẩm</Text>
                        <Text style={styles.text3}>Số lượng</Text>
                        <Text style={styles.text3}>Thành tiền</Text>
                    </View>
                    <FlatList data={object2.object} renderItem={(data) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={styles.text4}>{data.item.nameSp}</Text>
                            <Text style={styles.text4}>{data.item.soLuong}</Text>
                            <Text style={styles.text4}>{data.item.tongTien}</Text>
                        </View>
                    )} />
                </View>
                <Text style={styles.text}>Tổng tiền: {object.tongTien}VND</Text>
                <Text style={styles.text}>Trạng thái: {object.trangThai}</Text>
                <Text style={styles.text}>Ngày tạo: {object.ngayTao}</Text>
                <Text style={styles.text}>Loại hóa đơn: {object.loaiHd}</Text>
            </View>
        </ImageBackground>
    )
}

export default TtHoaDon

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
        marginTop: '4%',
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
    button1: {
        marginTop: '12%',
        marginLeft: '5%',
        marginRight: '5%',
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
    boxHd: {
        borderWidth: 1,
        width: '80%',
        height: '40%',
        borderRadius: 10,
        borderColor: 'green'
    },
})
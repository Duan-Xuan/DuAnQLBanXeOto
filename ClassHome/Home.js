import { View, Image, Alert, TextInput, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'
import image from '../assets/image.jpg'

var api_url = 'http://192.168.0.107:3000/NhanVien/';

const Home = ({ navigation }) => {
    const [object, setobject] = useState([])
    const [idNv, setIdNv] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('idNv').then(result => {
            setIdNv(result)
        })
    }, [])

    const DonHang = () => {
        navigation.navigate('BanHang', { screen: 'Đơn Hàng' })
    }

    const KhachHang = () => {
        navigation.navigate('KhachHang')
    }

    const SanPham = () => {
        navigation.navigate('SanPham')
    }

    const NhanVien = () => {
        if (idNv == 0)
            navigation.navigate('NhanVien')
        else
            Alert.alert('Thông báo', 'Chỉ có admin mới xem được phần này!')

    }

    const Hang = () => {
        navigation.navigate('Hang')
    }

    const BanChay = () => {
        navigation.navigate('BanChay')
    }

    const DoanhThu = () => {
        navigation.navigate('DoanhThu')
    }

    const CaiDat = () => {
        navigation.navigate('CaiDat')
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
            <View style={styles.overlay}>
                <Text style={styles.title}>Xin Chào: {object.name}!</Text>
                <View style={styles.topView}>
                    <Image source={image} style={styles.image} />
                    <TextInput style={styles.searchBar} placeholder="Tìm kiếm..." />
                </View>
                <View style={styles.iconContainer}>
                    <Text style={styles.homeText}>What do you need?</Text>
                    <View style={styles.iconRow}>
                        <TouchableOpacity onPress={DonHang} style={styles.icon}>
                            <Icon name="calendar" size={45} color="green" />
                            <Text style={styles.text}>Đơn hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={KhachHang} style={styles.icon}>
                            <Icon name="users" size={45} color="green" />
                            <Text style={styles.text}>Khách hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={SanPham} style={styles.icon}>
                            <Icon name="dropbox" size={45} color="green" />
                            <Text style={styles.text}>Sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon} onPress={NhanVien}>
                            <Icon name="user-circle-o" size={45} color="green" />
                            <Text style={styles.text}>Nhân viên</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconRow}>
                        <TouchableOpacity onPress={Hang} style={styles.icon}>
                            <Icon name="truck" size={45} color="green" />
                            <Text style={styles.text}>Hãng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={BanChay} style={styles.icon}>
                            <Icon name="bar-chart" size={45} color="green" />
                            <Text style={styles.text}>Bán chạy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={DoanhThu} style={styles.icon}>
                            <Icon name="money" size={45} color="green" />
                            <Text style={styles.text}>Doanh thu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={CaiDat} style={styles.icon}>
                            <Icon name="gear" size={45} color="green" />
                            <Text style={styles.text}>Cài đặt</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Text style={styles.text4}>Được tạo bởi team nhóm 7 !</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '30%',
        alignItems: 'center',
        backgroundColor: '#CCFFFF'
    },
    overlay: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 60,
    },
    title: {
        padding: 20,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    topView: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginBottom: 10,
    },
    image: {
        width: 330,
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    searchBar: {
        backgroundColor: '#EEEEEE',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: 'green'
    },
    homeText: {
        fontSize: 18,
        marginBottom: 16,
        fontWeight: 'bold'
    },
    text: {
        fontWeight: 'bold'
    },
    text4: {
        fontWeight: 'bold',
    },
    iconContainer: {
        flexDirection: 'column',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    icon: {
        width: 80,
        height: 80,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Home;

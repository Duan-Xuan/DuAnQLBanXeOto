import React, { useState } from 'react';
import { StyleSheet, Alert, ScrollView, View, Dimensions, Image, TouchableOpacity, Text, ImageBackground } from 'react-native';
import background from '../assets/backgroud.png';
const api_url = 'http://192.168.0.106:3000/SanPham/';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const XemSp = ({ navigation }) => {
    const [object, setobject] = useState([])
    const [name, setName] = useState('')
    const [imgActive, setImgActive] = useState(0)

    const next = () => {
        navigation.navigate('Login')
    }

    const onchange = (nativeEvent) => {
        if (nativeEvent) {
            const slider = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if (slider != imgActive) {
                setName(object[slider].name)
                setImgActive(slider)
            }
        }
    }

    const xe = (x) => {
        Alert.alert('Thông tin xe', 'Siêu xe: ' + x.name + '\n' + 'Mô tả: ' + x.moTa + '\n' + 'Giá bán: ' + x.giaBan + 'VND')
    }

    const getList = () => {
        fetch(api_url)
            .then((res) => { return res.json(); })
            .then((data_json) => {
                setName(data_json[0].name)
                setobject(data_json)
            })
    }

    return (
        <ImageBackground onLoad={getList} source={background} style={styles.container}>
            <Text style={styles.title}>Welcome to the store</Text>
            <Text style={styles.text1}>{name}</Text>
            <View style={styles.box}>
                <ScrollView
                    onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    style={styles.box}
                >
                    {
                        object.map((x, index) =>
                            <TouchableOpacity
                                key={x.avatar}
                                onPress={xe.bind(this, x)}>
                                <Image
                                    resizeMode='stretch'
                                    style={styles.box}
                                    source={{ uri: x.avatar }}
                                />
                            </TouchableOpacity>

                        )
                    }
                </ScrollView>
                <View style={styles.chamtron}>
                    {
                        object.map((x, index) =>
                            <Text
                                key={x.avatar}
                                style={imgActive == index ? styles.den : styles.trang}
                            >⬤</Text>
                        )
                    }
                </View>
            </View>
            <Text style={styles.text2}>Trên đây là một số sản phẩm cửa hàng chúng tôi!</Text>
            <TouchableOpacity onPress={next} style={styles.button}>
                <Text style={styles.text3}>Mua ngay</Text>
            </TouchableOpacity>
            <Text style={styles.text4}>Được tạo bởi team nhóm 7!</Text>
        </ImageBackground>
    );
};

export default XemSp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '30%',
        backgroundColor: '#CCFFFF',
        alignItems: 'center'
    },
    title: {
        marginTop: '25%',
        fontSize: 35,
        fontWeight: 'bold',
        color: 'white',
    },
    text1: {
        fontWeight: 'bold',
        color: '#007700',
        marginTop: '20%',
        fontSize: 30,
    },
    text2: {
        fontWeight: 'bold',
        color: '#007700',
        marginTop: '5%'
    },
    text3: {
        fontWeight: 'bold',
        color: 'white'
    },
    text4: {
        marginTop: '15%',
        fontWeight: 'bold',
    },
    box: {
        width: Width * 0.95,
        height: Height * 0.4,
        borderRadius: 20,
    },
    chamtron: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    button: {
        marginTop: '5%',
        height: 50,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'green'
    },
    den: {
        margin: 3,
        color: 'black',
    },
    trang: {
        margin: 3,
        color: 'white',
    },
});

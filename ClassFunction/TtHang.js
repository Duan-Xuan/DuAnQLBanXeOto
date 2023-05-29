import { Text, StyleSheet, TextInput, Alert, View, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.109:3000/Hang/';

const TtHang = (props) => {

    const { navigation } = props
    const { id } = props.route.params

    const [object, setobject] = useState([])
    const [isModal, setIsModal] = useState(false)
    const [name, setName] = useState('')

    const modal = () => {
        setIsModal(!isModal)
    }

    const previous = () => {
        navigation.navigate('Hang')
    }

    const update = () => {
        if (name == '') {
            Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin')
            return
        }
        let obj = { name: name };
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
        Alert.alert('Thông báo', 'Bạn muốn xóa hãng này!', [
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
                                navigation.navigate('Hang')
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
                <Text style={styles.title}>Thông Tin Hãng</Text>
                <TouchableOpacity onPress={modal} style={styles.button1} >
                    <Icon name="paint-brush" size={45} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.box2}>
                <Text style={styles.text}>Tên Hãng</Text>
                <Text style={styles.text2}>{object.name}</Text>
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
                        <Text style={styles.text3}>Tên Hãng</Text>
                        <TextInput children={object.name} style={styles.textInputNgoai} onChangeText={(content) => { setName(content) }} placeholder='Nhập hãng' />
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

export default TtHang

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
        marginTop: '25%',
        width: 300,
        height: 300,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'green',
        backgroundColor: '#EEEEEE',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '10%',
    },
    text2: {
        marginTop: '20%',
        fontWeight: 'bold',
        fontSize: 25,
        color: 'red'
    },
    text3: {
        marginTop: '5%',
        fontWeight: 'bold',
    },
    button1: {
        marginTop: '10%',
        marginLeft: '5%',
        marginRight: '5%',
    },
    button2: {
        marginTop: '15%'
    },
    khungngoai: {
        flex: 1,
        justifyContent: 'center',
    },
    khungtrong: {
        height: 300,
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
        marginTop: '5%',
        marginBottom: '7%',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: 'red',
        borderColor: 'green',
    },
    button3: {
        width: 100,
        height: 50,
        margin: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'green'
    },
})
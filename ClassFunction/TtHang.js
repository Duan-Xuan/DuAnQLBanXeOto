import { Text, StyleSheet, TextInput, Alert, View, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import background from '../assets/backgroud.png'

var api_url = 'http://192.168.0.108:3000/Hang/';

const TtHang = (props) => {

    const { navigation } = props
    const { id } = props.route.params

    const [object, setobject] = useState([])

    const previous = () => {
        navigation.navigate('Hang')
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
                <TouchableOpacity style={styles.button1} >
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
    button1: {
        marginLeft: '5%',
        marginRight: '5%',
    },
    button2: {
        marginTop: '15%'
    },
})
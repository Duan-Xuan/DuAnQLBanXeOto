import React from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const Home = (props) => {
    const { navigation } = props

    const CaiDat = () => {
        navigation.navigate('CaiDat')
    }

    return (
        <View style={styles.container}>
            <Image source={require('../assets/backgroud.png')} style={styles.backgroundImage} />
            <View style={styles.overlay}>
                <View style={styles.topView}>
                    <Image source={require('../assets/image.jpg')} style={styles.image} />
                    <TextInput style={styles.searchBar} placeholder="Tìm kiếm..." />
                </View>
                <View style={styles.iconContainer}>
                    <Text style={styles.homeText}>Bạn cần gì?</Text>
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="calendar" size={45} color="green" />
                            <Text>Đơn hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="user-circle-o" size={45} color="green" />
                            <Text>Khách hàng</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="dropbox" size={45} color="green" />
                            <Text>Sản phẩm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="users" size={45} color="green" />
                            <Text>Nhân viên</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="truck" size={45} color="green" />
                            <Text>Hãng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="bar-chart" size={45} color="green" />
                            <Text>Bán chạy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="money" size={45} color="green" />
                            <Text>Doanh thu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={CaiDat} style={styles.icon}>
                            <Icon name="gear" size={45} color="green" />
                            <Text>Cài đặt</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '30%', // Chiều cao của phần background hiển thị
        resizeMode: 'cover',
        backgroundColor: '#CCFFFF',
        width: '100%'
    },
    overlay: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 102,
    },
    topView: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 24,
        marginBottom: 16,
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
        marginBottom: 16,
        borderWidth: 0.5,
        borderColor: 'green'
    },
    homeText: {
        fontSize: 18,
        marginBottom: 16,
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
        backgroundColor: '#CCFFFF',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Home;

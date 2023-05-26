import React from 'react';
import { View, Image, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/backgroud.png')} style={styles.backgroundImage} />
            <View style={styles.overlay}>
                <View style={styles.topView}>

                    <Image source={require('../assets/image.jpg')} style={styles.image} />
                    <TextInput style={styles.searchBar} placeholder="Tìm kiếm..." />
                </View>
                <View style={styles.iconContainer}>
                    <Text style={styles.homeText}>What do you need?</Text>
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="comments" size={45} color="green" />
                            <Text>Setting</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="comments" size={45} color="green" />
                            <Text>Setting</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="comments" size={45} color="green" />
                            <Text>Setting</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="comments" size={45} color="green" />
                            <Text>Setting</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconRow}>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="comments" size={45} color="green" />
                            <Text>Setting</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="comments" size={45} color="green" />
                            <Text>Setting</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="comments" size={45} color="green" />
                            <Text>Setting</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Icon name="comments" size={45} color="green" />
                            <Text>Setting</Text>
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
        height: 200, // Chiều cao của phần background hiển thị
        resizeMode: 'cover',
        backgroundColor: 'green',
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
        width: 340,
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
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingLeft: 20
    },
});

export default Home;

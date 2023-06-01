import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Image } from "react-native"
import box from './assets/box.png'
import category from './assets/category.png'
import Login from './ClassLogin/Login'
import Home from './ClassHome/Home'
import DonHang from './ClassHome/DonHang'
import HoaDon from './ClassHome/HoaDon'
import TtHoaDon from './ClassFunction/TtHoaDon'
import KhachHang from './ClassHome/KhachHang'
import AddKhachHang from './ClassFunction/AddKhachHang'
import TtKhachHang from './ClassFunction/TtKhachHang'
import SanPham from './ClassHome/SanPham'
import AddSanPham from './ClassFunction/AddSanPham'
import TtSanPham from './ClassFunction/TtSanPham'
import NhanVien from './ClassHome/NhanVien'
import AddNhanVien from "./ClassFunction/AddNhanVien"
import TtNhanVien from "./ClassFunction/TtNhanVien"
import Hang from './ClassHome/Hang'
import AddHang from './ClassFunction/AddHang'
import TtHang from './ClassFunction/TtHang'
import BanChay from './ClassHome/BanChay'
import DoanhThu from './ClassHome/DoanhThu'
import CaiDat from './ClassHome/CaiDat'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="BanHang"
          component={BanHang}
        />
        <Stack.Screen name="TtHoaDon" component={TtHoaDon} />
        <Stack.Screen name="KhachHang" component={KhachHang} />
        <Stack.Screen name="AddKhachHang" component={AddKhachHang} />
        <Stack.Screen name="TtKhachHang" component={TtKhachHang} />
        <Stack.Screen name="SanPham" component={SanPham} />
        <Stack.Screen name="AddSanPham" component={AddSanPham} />
        <Stack.Screen name="TtSanPham" component={TtSanPham} />
        <Stack.Screen name="NhanVien" component={NhanVien} />
        <Stack.Screen name="AddNhanVien" component={AddNhanVien} />
        <Stack.Screen name="TtNhanVien" component={TtNhanVien} />
        <Stack.Screen name="Hang" component={Hang} />
        <Stack.Screen name="AddHang" component={AddHang} />
        <Stack.Screen name="TtHang" component={TtHang} />
        <Stack.Screen name="BanChay" component={BanChay} />
        <Stack.Screen name="DoanhThu" component={DoanhThu} />
        <Stack.Screen name="CaiDat" component={CaiDat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function BanHang() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
    }}>
      <Tab.Screen name='Đơn Hàng' component={DonHang} options={{
        tabBarIcon: (focused) => (
          <Image
            source={focused = category}
            style={{ width: 25, height: 25 }}
          />
        )
      }} />
      <Tab.Screen name='Hóa Đơn' component={HoaDon} options={{
        tabBarIcon: (focused) => (
          <Image
            source={focused = box}
            style={{ width: 25, height: 25 }}
          />
        )
      }} />
    </Tab.Navigator>
  )
}
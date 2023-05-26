import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Login from './ClassLogin/Login'
import Home from './ClassHome/Home'
import DonHang from './ClassHome/DonHang'
import KhachHang from './ClassHome/KhachHang'
import SanPham from './ClassHome/SanPham'
import NhanVien from './ClassHome/NhanVien'
import Hang from './ClassHome/Hang'
import AddHang from './ClassFunction/AddHang'
import TtHang from './ClassFunction/TtHang'
import BanChay from './ClassHome/BanChay'
import DoanhThu from './ClassHome/DoanhThu'
import CaiDat from './ClassHome/CaiDat'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DonHang" component={DonHang} />
        <Stack.Screen name="KhachHang" component={KhachHang} />
        <Stack.Screen name="SanPham" component={SanPham} />
        <Stack.Screen name="NhanVien" component={NhanVien} />
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
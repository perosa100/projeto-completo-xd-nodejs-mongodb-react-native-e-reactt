import React from 'react';

// import { Container } from './styles';

import styles from './styles';
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';
import qrcode from '../../assets/qrcode.png';
import back from '../../assets/back.png';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Notification {
  showNotification: boolean;
  showBack: boolean;
  late: number;
  pressNotification: (event: GestureResponderEvent) => void;
  onPress: (event: GestureResponderEvent) => void;
}

const Header: React.FC<Notification> = ({
  showNotification,
  showBack,
  late,
  pressNotification,
}) => {
  const navigation = useNavigation();
  function goBack() {
    navigation.goBack();
  }
  function openQrCode() {
    navigation.navigate('QrCode');
  }
  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity style={styles.leftIcon} onPress={goBack}>
          <Image style={styles.leftIconImage} source={back} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.leftIcon} onPress={openQrCode}>
          <Image style={styles.leftIconImage} source={qrcode} />
        </TouchableOpacity>
      )}
      <Image style={styles.logo} source={logo} />
      {showNotification && late > 0 && (
        <TouchableOpacity
          style={styles.notification}
          onPress={pressNotification}
        >
          <Image source={bell} style={styles.notificationBell} />
          <View style={styles.circle}>
            <Text style={styles.notificationText}>{late}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

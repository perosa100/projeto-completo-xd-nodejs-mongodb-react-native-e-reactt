import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

import styles from './styles';
import add from '../../assets/add.png';
import save from '../../assets/save.png';

interface AddNotification {
  icon: String;
  onPress: (event: GestureResponderEvent) => void;
}
const Footer: React.FC<AddNotification> = ({ icon, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image style={styles.image} source={icon === 'add' ? add : save} />
      </TouchableOpacity>
      <Text style={styles.buttonText}>Organizando sua vida</Text>
    </View>
  );
};

export default Footer;

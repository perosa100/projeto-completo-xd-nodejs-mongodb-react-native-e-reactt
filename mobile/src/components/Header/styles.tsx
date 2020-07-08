import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 65,
    backgroundColor: '#20295f',
    borderBottomWidth: 5,
    borderBottomColor: '#ee6b26',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 30,
  },
  notification: {
    position: 'absolute',
    right: 20,
  },
  notificationBell: {
    width: 30,
    height: 35,
  },
  circle: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 13,
    bottom: 15,
  },
  notificationText: {
    fontWeight: 'bold',
    color: '#ee6b26',
  },
  leftIcon: {
    position: 'absolute',
    left: 20,
  },
  leftIconImage: {
    width: 30,
    height: 30,
  },
});

export default styles;

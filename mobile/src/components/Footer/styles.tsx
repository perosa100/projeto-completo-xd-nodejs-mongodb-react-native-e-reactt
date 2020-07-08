import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    backgroundColor: '#20295f',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 5,
    borderTopColor: '#ee6b26',
    alignItems: 'center',
  },
  button: {
    position: 'relative',
    top: -40,
  },
  image: {
    height: 58,
    width: 58,
  },
  buttonText: {
    position: 'relative',
    top: -40,
    color: '#fff',
  },
});

export default styles;

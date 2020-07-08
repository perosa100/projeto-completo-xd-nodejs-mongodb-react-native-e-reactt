import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  filter: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    height: 70,
    alignItems: 'center',
  },
  filterTextActived: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ee6b26',
  },
  filterTextInative: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#20295f',
    opacity: 0.5,
  },
  title: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#20295f',
    alignItems: 'center',
  },
  titleText: {
    color: '#20295f',
    fontSize: 18,
    position: 'relative',
    top: 11,
    backgroundColor: '#fff',
  },
  content: {
    width: '100%',
    marginTop: 10,
    marginBottom: 80,
  },
});

export default styles;

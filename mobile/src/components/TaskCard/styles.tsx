import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 85,
    marginVertical: 15,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeActive: {
    width: 50,
    height: 50,
  },
  cardTitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardDate: {
    color: '#EE6B26',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardTime: {
    color: '#707070',
  },
  done: {
    opacity: 0.5,
  },
});

export default styles;

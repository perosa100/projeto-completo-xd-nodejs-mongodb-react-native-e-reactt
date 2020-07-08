import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageIcon: {
    width: 40,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  label: {
    color: '#707070',
    fontSize: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    padding: 5,
    width: '95%',
    borderBottomWidth: 1,
    borderBottomColor: '#ee6b26',
    marginHorizontal: 10,
  },
  inputArea: {
    fontSize: 16,
    padding: 10,
    width: '95%',
    borderWidth: 1,
    borderColor: '#ee6b26',
    marginHorizontal: 10,
    borderRadius: 10,
    height: 100,
    textAlignVertical: 'center',
  },
  inLine: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  inputInLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontWeight: 'bold',
    color: '#ee6b26',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  removeLabel: {
    fontWeight: 'bold',
    color: '#20295f',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  typeIconInative: {
    opacity: 0.5,
  },
});

export default styles;

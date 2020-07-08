import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
  Button,
} from 'react-native';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import iconCalendar from '../../assets/calendar.png';
import iconClock from '../../assets/clock.png';
import styles from './styles';
interface Type {
  type: string;
  save: any;
  dated?: any;
  hour?: any;
}
const DateTimeInput: React.FC<Type> = ({ type, save, dated, hour }) => {
  const [datetime, setDateTime] = useState<string>();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  /*   if (type === 'date' && dated) {
    setDateTime(format(new Date(date), 'dd/MM/yyyy'));
  } */
  /*  if (isPast(new Date(algo))) {
    return Alert.alert('voce não pode voltar no passado');
  } */
  useEffect(() => {
    if (type == 'date' && date) {
      if (loading === true) {
        setDateTime(format(new Date(date), 'dd/MM/yyyy'));
        save(format(new Date(date), 'yyyy-MM-dd'));
      }
    }
    if (type == 'time' && date) {
      if (loading === true) {
        setDateTime(format(new Date(date), 'HH:mm'));
        save(format(new Date(date), 'HH:mm:ss'));
      }
    }
  }, [loading]);

  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (event.type === 'dismissed') {
      setLoading(false);
      setShow(false);
    } else {
      setDate(currentDate);
      setLoading(true);
    }
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showPicker = () => {
    showMode(type);
  };

  return (
    <View>
      <TouchableOpacity onPress={showPicker}>
        <TextInput
          style={styles.input}
          placeholder={
            type == 'date'
              ? 'Clique aqui para definir a data...'
              : 'Clique aqui para definir a hora...'
          }
          editable={false}
          value={datetime}
        />

        <Image
          style={styles.iconTextInput}
          source={type == 'date' ? iconCalendar : iconClock}
        />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}
    </View>
  );
};

export default DateTimeInput;

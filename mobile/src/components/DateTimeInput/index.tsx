import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { format, isPast } from 'date-fns';
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
  const [dateNow, setDateNow] = useState(new Date());

  useEffect(() => {
    if (type === 'date' && dated) {
      setDateTime(format(new Date(dated), 'dd/MM/yyyy'));
      save(format(new Date(dated), 'yyyy-MM-dd'));
    }
    if (type === 'time' && hour) {
      setDateTime(format(new Date(hour), 'HH:mm'));
      save(format(new Date(hour), 'HH:mm:ss'));
    }
  }, []);
  const onChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShow(Platform.OS === 'ios');

    if (event.type === 'dismissed') {
      setShow(false);
    } else {
      if (type == 'date' && currentDate) {
        setDateTime(format(new Date(currentDate), 'dd/MM/yyyy'));
        save(format(new Date(currentDate), 'yyyy-MM-dd'));
      }
      if (type == 'time' && currentDate) {
        if (currentDate < dateNow) {
          Alert.alert('voce não pode voltar no passado');
        } else {
          setDateTime(format(new Date(currentDate), 'HH:mm'));
          save(format(new Date(currentDate), 'HH:mm:ss'));
        }
      }
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

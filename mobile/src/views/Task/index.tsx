import React, { useState, useEffect } from 'react';
import styles from './styles';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import typeIcons from '../../utils/typeIcons';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimeInput from '../../components/DateTimeInput';
import api from '../../services/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Network from 'expo-network';
interface Id {
  idTask: string;
}
const Task: React.FC<Id> = ({ idTask }) => {
  const [done, setDone] = useState(false);
  const [type, setType] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState();
  const [when, setWhen] = useState<string>();
  const [macaddress, setMacaddress] = useState<string>();
  const [hour, setHour] = useState<string>();
  const [date, setDate] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute();

  const id = route.params?.idTask;
  async function loadTask() {
    await api.get(`/task/${id}`).then((response) => {
      setLoading(true);
      setType(response.data.type);
      setDone(response.data.done);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setDate(response.data.when);
      setHour(response.data.when);
    });
  }

  async function buttonNewForm() {
    if (!title) {
      return Alert.alert('Defina a Tarefa');
    }
    if (!description) {
      return Alert.alert('Defina Descrição');
    }

    if (!type) {
      return Alert.alert('Defina Tipo de tarefa');
    }
    if (!date) {
      return Alert.alert('Defina Data');
    }
    if (!hour) {
      return Alert.alert('Defina Horario');
    }

    if (id) {
      await api
        .put(`/task/${id}`, {
          macaddress,
          done,
          type,
          title,
          description,
          when: `${date}T${hour}.000`,
        })
        .then(() => {
          navigation.navigate('Home');
        })
        .catch((err) => console.log(err));
    } else {
    }
    await api
      .post('/task', {
        macaddress,
        type,
        title,
        description,
        when: `${date}T${hour}.000`,
      })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((err) => console.log(err));
  }

  async function getMac() {
    await Network.getMacAddressAsync().then((mac) => {
      setMacaddress(mac);
      setLoading(false);
    });
  }

  async function deleteTask() {
    await api
      .delete(`/task/${id}`)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((err) => console.log(err));
  }

  async function remove() {
    Alert.alert(
      'Remover tarefa',
      'Deseja realmente remover esta tarefa',
      [
        { text: 'Cancelar' },
        { text: 'Confirmar', onPress: () => deleteTask() },
      ],
      {
        cancelable: true,
      }
    );
  }

  useEffect(() => {
    getMac();

    if (id) {
      loadTask().then(() => setLoading(false));
    }
  }, []);
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header showBack={true} />

      {loading ? (
        <ActivityIndicator
          color="#ee6b26"
          size={50}
          style={{ paddingTop: 30 }}
        />
      ) : (
        <ScrollView style={{ width: '100%' }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {typeIcons.map(
              (icon, index) =>
                index > 0 && (
                  <TouchableOpacity
                    key={String(icon)}
                    onPress={() => setType(index)}
                  >
                    <Image
                      source={icon}
                      style={[
                        styles.imageIcon,
                        type && type != index && styles.typeIconInative,
                      ]}
                    />
                  </TouchableOpacity>
                )
            )}
          </ScrollView>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            maxLength={30}
            placeholder="Lembre-me de fazer..."
            onChangeText={(text) => setTitle(text)}
            value={title}
          />

          <Text style={styles.label}>Detalhes</Text>
          <TextInput
            style={styles.inputArea}
            maxLength={200}
            placeholder="Detalhes da atividades"
            multiline={true}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />

          <DateTimeInput type={'date'} save={setDate} dated={date} />
          <DateTimeInput type={'time'} save={setHour} hour={hour} />

          {id && (
            <View style={styles.inLine}>
              <View style={styles.inputInLine}>
                <Switch
                  onValueChange={() => setDone(!done)}
                  value={done}
                  thumbColor={done ? '#00761b' : '#ee6b26'}
                />
                <Text style={styles.switchLabel}>Concluído</Text>
              </View>
              <TouchableOpacity onPress={remove}>
                <Text style={styles.removeLabel}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
      <Footer icon={'save'} onPress={buttonNewForm} />
    </KeyboardAvoidingView>
  );
};

export default Task;

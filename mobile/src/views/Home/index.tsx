import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import TaskCard from '../../components/TaskCard';
import api from '../../services/api';
import * as Network from 'expo-network';
interface Tasks {
  _id: string;
  type: number;
  title: string;
  when: Date;
  done: boolean;
}
const Home: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [lateCount, setLateCount] = useState<number>(0);
  const [macaddress, setMacaddress] = useState<string>();
  const navigation = useNavigation();

  async function loadTasks() {
    setLoading(true);
    await api.get(`/task/filter/${filter}/${macaddress}`).then((response) => {
      setTasks(response.data);
      setLoading(false);
    });
  }

  async function lateVerify() {
    await api.get(`/task/filter/late/${macaddress}`).then((response) => {
      setLateCount(response.data.length);
    });
  }

  async function getMac() {
    await Network.getMacAddressAsync().then((mac) => {
      setMacaddress(mac);
    });
  }
  useEffect(() => {
    getMac().then(() => loadTasks());

    lateVerify();
  }, [filter, macaddress]);

  function Notification() {
    setFilter('late');
  }
  function newButtonTasks() {
    navigation.navigate('Task');
  }
  function showButtonTasks(id: string) {
    navigation.navigate('Task', {
      idTask: id,
    });
  }

  return (
    <View style={styles.container}>
      <Header
        showNotification={true}
        showBack={false}
        pressNotification={Notification}
        late={lateCount}
      />
      <View style={styles.filter}>
        <TouchableOpacity
          onPress={() => {
            setFilter('all');
          }}
        >
          <Text
            style={
              filter === 'all'
                ? styles.filterTextActived
                : styles.filterTextInative
            }
          >
            Todos
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter('today');
          }}
        >
          <Text
            style={
              filter === 'today'
                ? styles.filterTextActived
                : styles.filterTextInative
            }
          >
            Hoje
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter('week');
          }}
        >
          <Text
            style={
              filter === 'week'
                ? styles.filterTextActived
                : styles.filterTextInative
            }
          >
            Semana
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter('month');
          }}
        >
          <Text
            style={
              filter == 'month'
                ? styles.filterTextActived
                : styles.filterTextInative
            }
          >
            Mês
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setFilter('year');
          }}
        >
          <Text
            style={
              filter == 'year'
                ? styles.filterTextActived
                : styles.filterTextInative
            }
          >
            Ano
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          {' '}
          TAREFAS {filter === 'late' && 'ATRASADAS '}
          {''}
        </Text>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color="#ee6b26" size={50} />
        ) : (
          tasks.map((t) => (
            <TaskCard
              key={t._id}
              type={t.type}
              title={t.title}
              when={t.when}
              done={t.done}
              onPress={() => showButtonTasks(t._id)}
            />
          ))
        )}
      </ScrollView>
      <Footer icon={'add'} onPress={newButtonTasks} />
    </View>
  );
};

export default Home;

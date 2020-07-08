import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  GestureResponderEvent,
} from 'react-native';
import styles from './styles';
import iconDefault from '../../assets/default.png';
import { format } from 'date-fns';
import typeIcons from '../../utils/typeIcons';
interface Tasks {
  done: boolean;
  type: number;
  title: string;
  when: Date;
  onPress: (event: GestureResponderEvent) => void;
}
const TaskCard: React.FC<Tasks> = ({ type, title, when, done, onPress }) => {
  const date = useMemo(() => format(new Date(when), 'dd/MM/yyyy'), [when]);
  const hour = useMemo(() => format(new Date(when), 'HH:mm'), [when]);

  return (
    <TouchableOpacity
      style={[styles.card, done && styles.done]}
      onPress={onPress}
    >
      <View style={styles.cardLeft}>
        <Image source={typeIcons[type]} style={styles.typeActive} />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.cardRight}>
        <Text style={styles.cardDate}>{date}</Text>
        <Text style={styles.cardTime}>{hour}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

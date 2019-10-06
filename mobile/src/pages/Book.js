import React, { useState, useEffect } from 'react'

import {
  Alert,
  SafeAreaView,
  Text,
  Platform,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet
} from 'react-native'

import api from '../services/api'

const DatePicker = Platform.OS === 'ios' ? require('DatePickerIOS') : require('../components/DatePickerAndroid');

export default ({ navigation }) => {
  const initalDate = Platform.OS === 'ios' ? new Date() : new Date().toDateString()
  
  const id = navigation.getParam('id')
  const [date, setDate] = useState(initalDate)

  const handleSubmit = async () => {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spots/${id}/bookings`, { 
      date: Platform.OS === 'ios' ? date.toDateString() : date 
    }, 
    {
      headers: { user_id }
    });

    Alert.alert('Solicitação de reserva enviada.')
    navigation.navigate('List')
  }

  const handleCancel = () => navigation.navigate('List');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Qual data você quer reservar?</Text>

      {<DatePicker date={date} onDateChange={setDate} />}

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>
          Reservar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginTop: 20,
    marginBottom: 8
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },

  button: {
    height: 42,
    backgroundColor: '#ec3246',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2
  },

  cancelButton: {
    backgroundColor: '#7a8188',
    marginTop: 10

  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  }
})

import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const EventListScreen = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);   // State to manage loading spinner
  const [error, setError] = useState(null);       // State to manage error messages

  useEffect(() => {
    axios.get('http://192.168.55.107:3000/api/events')  // Replace with correct IP address
      .then(response => {
        setEvents(response.data);
        setLoading(false);  // Turn off loader once data is fetched
      })
      .catch(error => {
        setError('Failed to fetch events. Please try again later.');
        setLoading(false);  // Turn off loader even in case of error
      });
  }, []);

  // Render the loader while data is loading
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading events...</Text>
      </View>
    );
  }

  // Render the error message if something goes wrong
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Render the list of events once the data is available
  const renderEvent = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetails', { event: item })}>
      {/* <Image
        source={{ uri: 'https://via.placeholder.com/400x200.png?text=Event+Image' }} // Placeholder for event image
        style={styles.eventImage}
      /> */}
      <View style={styles.cardContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.detailsRow}>
          <Image source={require('../Assets/calendar.png')} style={styles.detailIcon} />
          <Text style={styles.eventDetails}>{item.date} | {item.time}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Image source={require('../Assets/google-map.png')} style={styles.detailIcon} />
          <Text style={styles.eventDetails}>{item.location}</Text>
        </View>
        <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('EventDetails', { event: item })}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={events}
      renderItem={renderEvent}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  eventDetails: {
    fontSize: 16,
    color: '#666',
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default EventListScreen;

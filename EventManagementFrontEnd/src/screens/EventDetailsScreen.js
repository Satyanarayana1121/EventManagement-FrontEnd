import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const EventDetailsScreen = ({ route, navigation }) => {
  const { event } = route.params;
  const [isRSVP, setRSVP] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);       

  const handleRSVP = () => {
    setLoading(true);
    axios.post('http://192.168.55.107:3000/api/rsvp', { eventId: event.id, attendee: 'John Doe' })  
      .then(() => {
        setRSVP(true);
        setLoading(false);  
      })
      .catch(err => {
        setError('Failed to RSVP. Please try again later.');
        setLoading(false);  
      });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Processing your RSVP...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.detailsRow}>
          <Image source={require('../Assets/calendar.png')} style={styles.icon} />
          <Text style={styles.detailsText}>{event.date} | {event.time}</Text>
        </View>
        <View style={styles.detailsRow}>
          <Image source={require('../Assets/google-map.png')} style={styles.icon} />
          <Text style={styles.detailsText}>{event.location}</Text>
        </View>
        <Text style={styles.description}>{event.description}</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={[styles.rsvpButton, isRSVP && { backgroundColor: '#D32F2F' }]} onPress={handleRSVP}>
          <Text style={styles.rsvpButtonText}>{isRSVP ? "Cancel RSVP" : "RSVP"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.attendeesButton} onPress={() => navigation.navigate('Attendees', { eventId: event.id })}>
          <Text style={styles.attendeesButtonText}>View Attendees</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  detailsText: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  rsvpButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  rsvpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attendeesButton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  attendeesButtonText: {
    color: '#fff',
    fontSize: 16,
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
    textAlign: 'center',
    marginTop: 10,
  },
});

export default EventDetailsScreen;

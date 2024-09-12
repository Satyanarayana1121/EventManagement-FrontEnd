import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const AttendeesScreen = ({ route }) => {
  const { eventId } = route.params;
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);       

  useEffect(() => {
    axios.get(`http://192.168.55.107:3000/api/events/${eventId}/attendees`)
      .then(response => {
        setAttendees(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch attendees. Please try again later.');
        setLoading(false);
      });
  }, [eventId]);

  
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading attendees...</Text>
      </View>
    );
  }

  
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  
  const renderAttendee = ({ item }) => (
    <View style={styles.attendeeCard}>
      <Text style={styles.attendeeName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendees</Text>
      <FlatList
        data={attendees}
        renderItem={renderAttendee}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  listContent: {
    paddingVertical: 10,
  },
  attendeeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  attendeeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AttendeesScreen;

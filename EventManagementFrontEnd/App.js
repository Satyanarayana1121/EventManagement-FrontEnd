import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EventListScreen from './src/screens/EventListScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import AttendeesScreen from './src/screens/AttendeesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EventList">
        <Stack.Screen name="EventList" component={EventListScreen} options={{ title: 'Upcoming Events' }} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} />
        <Stack.Screen name="Attendees" component={AttendeesScreen} options={{ title: 'Attendees' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Dashboard from '../screens/Dashboard';
import Pickup from '../screens/Pickup'
import Destination from '../screens/Destination';
import CarSelection from '../screens/CarSelection';
import SignIn from '../screens/SignIn';
import Ride from '../screens/Ride';
import PastRide from '../screens/PastRide';
import PastRideDetails from '../screens/PastRideDetail';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Main() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Dashboard" component={DashboardStack} />
                <Drawer.Screen name="Past Rides" component={PastRideStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
        }

    function DashboardStack() {
        return (
            <Stack.Navigator initialRouteName='SignIn'>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Pickup" component={Pickup} />
                <Stack.Screen name="Destination" component={Destination} />
                <Stack.Screen name="CarSelection" component={CarSelection} />
                <Stack.Screen name="Ride" component={Ride} />
            </Stack.Navigator>
        );
    }
    
    function PastRideStack() {
        return (
          <Stack.Navigator>
            <Stack.Screen name="PastRide" component={PastRide} />
            <Stack.Screen name="PastRideDetails" component={PastRideDetails} />
          </Stack.Navigator>
        );
      }
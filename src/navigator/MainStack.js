import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../pages/HomeScreen';
import HorasScreen from '../pages/HorasScreen';
import ItinsScreen from '../pages/ItinScreen';
import LoginScreen from '../pages/LoginScreen';
import SignupScreen from '../pages/SignupScreen';


const MainStack = createStackNavigator();

export default () => (
    <MainStack.Navigator>
        <MainStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
        />

        <MainStack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={SignupScreen}
        />


        <MainStack.Screen
            options={{ headerShown: false }, ({ route }) => ({ title: route.params.name })}
            name="HOME"
            component={HomeScreen}
        />
        <MainStack.Screen
            name="horas"
            component={HorasScreen}
            options={({ route }) => ({ title: route.params.name })} />
        <MainStack.Screen
            name="itins"
            component={ItinsScreen}
            options={({ route }) => ({ title: route.params.name })} />
    </MainStack.Navigator>
);
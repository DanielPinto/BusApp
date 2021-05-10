import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../pages/HomeScreen';
import HorasScreen from '../pages/HorasScreen';
import ItinsScreen from '../pages/ItinScreen';


const MainStack = createStackNavigator();

export default () => (
    <MainStack.Navigator>
        <MainStack.Screen 
            options={{headerShown: false}} 
            name="HOME" 
            component={HomeScreen}
        />
        <MainStack.Screen 
            name="horas" 
            component={HorasScreen}
            options={({ route }) => ({ title: route.params.name })}/>  
        <MainStack.Screen 
            name="itins" 
            component={ItinsScreen}
            options={({ route }) => ({ title: route.params.name })}/>  
    </MainStack.Navigator>
);
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';

const StackNavigator = () => {
    const Stack  = createNativeStackNavigator()
    return (
        <Stack.Navigator
            screenOptions={{headerShown : false}}>
            <Stack.Screen 
                name='Home'
                component={Home}/> 
        </Stack.Navigator>
    )
}

export default StackNavigator
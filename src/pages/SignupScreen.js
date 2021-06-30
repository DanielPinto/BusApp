import React, { useState } from 'react';
import { SafeAreaView, Button, Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {registration} from '../methods/firebaseMethods';


export default SignupScreen = () => {

    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const emptyState = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    const handlePress = () => {
        if (!firstName) {
            Alert.alert('First name is required');
        } else if (!email) {
            Alert.alert('Email field is required.');
        } else if (!password) {
            Alert.alert('Password field is required.');
        } else if (!confirmPassword) {
            setPassword('');
            Alert.alert('Confirm password field is required.');
        } else if (password !== confirmPassword) {
            Alert.alert('Password does not match!');
        } else {
            registration(
                email,
                password,
                lastName,
                firstName,
            );
            navigation.navigate('Loading');
            emptyState();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textTitle}>Sign Up</Text>
                <TextInput
                    value={firstName}
                    onChangeText={(name) => setFirstName(name)}
                    placeholder={'First Name*'}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={(name) => setLastName(name)}
                    style={styles.input}
                />

                <TextInput
                    placeholder="Enter your email*"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter your password*"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Retype your password to confirm*"
                    value={confirmPassword}
                    onChangeText={(password2) => setConfirmPassword(password2)}
                    secureTextEntry={true}
                />

                <Button
                    title={'Enviar'}
                    style={styles.input}
                    onPress={handlePress}
                />



                <Text
                    style={styles.textAccountCreate}
                    onPress={() => getLoginScreen()}
                >
                    Login
                    </Text>
            </View>

        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textTitle: {

        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold'
    },
    wrip: {
        backgroundColor: "#eee",

        flex: 1,
        marginTop: 100,
        margin: 50,
        borderRadius: 10,
        padding: 10
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: '#b9b9b9',
        marginBottom: 10,
    },
    textAccountCreate: {
        color: "blue",
        fontSize: 18,
        marginTop: 7
    },


});
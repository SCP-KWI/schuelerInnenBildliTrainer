import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MainScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student Training App</Text>
            <Button
                title="Train Existing Class"
                onPress={() => navigation.navigate('TrainClass')}
            />
            <Button
                title="Scan New Class"
                onPress={() => navigation.navigate('ScanClass')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default MainScreen;
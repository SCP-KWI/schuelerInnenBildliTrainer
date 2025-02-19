import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput, StyleSheet } from 'react-native';
import StudentQuiz from './StudentQuiz';
import nameValidator from '../utils/nameValidator';

const TrainClassScreen = () => {
    const [mode, setMode] = useState(null);
    const [studentImage, setStudentImage] = useState(null);
    const [studentName, setStudentName] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleModeSelection = (selectedMode) => {
        setMode(selectedMode);
        // Load a student image and name for training
        // This is a placeholder; implement logic to load actual student data
        setStudentImage('path/to/student/image.jpg');
        setStudentName('John Doe');
    };

    const handleNameEntry = () => {
        if (nameValidator(studentName, 'John Doe')) {
            setFeedback('Correct!');
        } else {
            setFeedback('Wrong');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Train Class</Text>
            {mode === null ? (
                <View>
                    <Button title="Mode 1: Multiple Choice" onPress={() => handleModeSelection('multipleChoice')} />
                    <Button title="Mode 2: Name Entry" onPress={() => handleModeSelection('nameEntry')} />
                </View>
            ) : mode === 'multipleChoice' ? (
                <StudentQuiz studentImage={studentImage} />
            ) : (
                <View>
                    <Image source={{ uri: studentImage }} style={styles.image} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter student's name"
                        value={studentName}
                        onChangeText={setStudentName}
                    />
                    <Button title="Submit" onPress={handleNameEntry} />
                    <Text>{feedback}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%',
    },
});

export default TrainClassScreen;
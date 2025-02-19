import React, { useState } from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet } from 'react-native';
import { validateName } from '../utils/nameValidator';

const StudentQuiz = ({ student, options, mode, onCorrect, onIncorrect }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (option === student.name) {
            setFeedback('Correct!');
            onCorrect();
        } else {
            setFeedback('Wrong!');
            onIncorrect();
        }
    };

    const handleInputSubmit = () => {
        if (validateName(inputValue, student.name)) {
            setFeedback('Correct!');
            onCorrect();
        } else {
            setFeedback('Wrong!');
            onIncorrect();
        }
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: student.image }} style={styles.image} />
            {mode === 'multiple-choice' ? (
                <View>
                    {options.map((option, index) => (
                        <Button
                            key={index}
                            title={option}
                            onPress={() => handleOptionSelect(option)}
                        />
                    ))}
                </View>
            ) : (
                <TextInput
                    style={styles.input}
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder="Enter student's name"
                    onSubmitEditing={handleInputSubmit}
                />
            )}
            {feedback && <Text style={styles.feedback}>{feedback}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    feedback: {
        marginTop: 20,
        fontSize: 18,
        color: 'red',
    },
});

export default StudentQuiz;
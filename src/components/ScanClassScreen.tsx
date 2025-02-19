import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { extractImagesFromPDF } from '../utils/pdfProcessor';
import { saveImages } from '../utils/imageSaver';

const ScanClassScreen = () => {
    const [loading, setLoading] = useState(false);

    const handleLoadPDF = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
            if (result.type === 'success') {
                setLoading(true);
                const images = await extractImagesFromPDF(result.uri);
                await saveImages(images);
                Alert.alert('Success', 'Images extracted and saved successfully!');
            } else {
                Alert.alert('Error', 'Failed to load PDF.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while processing the PDF.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan Class</Text>
            <Button title={loading ? 'Loading...' : 'Load PDF'} onPress={handleLoadPDF} disabled={loading} />
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

export default ScanClassScreen;
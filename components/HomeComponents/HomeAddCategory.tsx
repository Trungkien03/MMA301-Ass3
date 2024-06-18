import React, { useState } from 'react';
import {
    Alert,
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
    AddCategoryPayload,
    addCategoryAsync,
    updateCategoryAsync
} from '../../store/redux/api/CategoryApis';

const HomeUpdateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const dispatch = useDispatch();

    const handleUpdateCategory = async () => {
        if (!categoryName.trim()) {
            Alert.alert('Error', 'Both Category ID and Name are required');
            return;
        }

        try {
            // Create the payload for the API request
            const addCategory: AddCategoryPayload = {
                name: categoryName,
                items: []
            };

            // Dispatch the async action to update the category
            await dispatch(addCategoryAsync(addCategory)).unwrap();

            // Show success message if the API call was successful
            Alert.alert('Success', 'Category updated successfully');
            setCategoryName(''); // Clear the input field
        } catch (error: any) {
            // Handle any errors that occur during the API call
            Alert.alert('Error', `Failed to update category: ${error.message}`);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Category Name</Text>
            <TextInput
                style={styles.input}
                value={categoryName}
                onChangeText={setCategoryName}
            />
            <Button title="Add Category" onPress={handleUpdateCategory} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333'
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center'
    }
});

export default HomeUpdateCategory;

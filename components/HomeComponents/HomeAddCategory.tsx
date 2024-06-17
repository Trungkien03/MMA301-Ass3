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
import { Category, addCategory } from '../../store/redux/slice/CategorySlice';

const HomeAddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const dispatch = useDispatch();

    const handleAddCategory = () => {
        if (!categoryName.trim()) {
            Alert.alert('Error', 'Category name is required');
            return;
        }

        const newCategory: Category = {
            id: new Date().toISOString(),
            name: categoryName,
            items: []
        };

        dispatch(addCategory(newCategory));
        Alert.alert('Success', 'Category added successfully');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Category Name</Text>
            <TextInput
                style={styles.input}
                value={categoryName}
                onChangeText={setCategoryName}
            />
            <Button title="Add Category" onPress={handleAddCategory} />
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

export default HomeAddCategory;

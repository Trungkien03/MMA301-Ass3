import { RouteProp, useRoute } from '@react-navigation/native';
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
    OrchidItem,
    addItemCategory // Import the action creator
} from '../../store/redux/slice/CategorySlice';
import { RootStackParamList } from '../../types/app.types';

const HomeAddCategoryItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemWeight, setItemWeight] = useState('');
    const [itemRating, setItemRating] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemImage, setItemImage] = useState('');
    const [itemColor, setItemColor] = useState('');
    const [itemBonus, setItemBonus] = useState('');
    const [itemOrigin, setItemOrigin] = useState('');

    const dispatch = useDispatch();
    const route = useRoute<RouteProp<RootStackParamList, 'AddCategoryItem'>>();

    const selectedCategoryId = route.params?.categoryId;

    const handleAddItem = () => {
        if (!itemName.trim() || !itemWeight.trim() || !itemPrice.trim()) {
            Alert.alert('Error', 'Please fill out all required fields');
            return;
        }

        if (isNaN(parseFloat(itemWeight)) || isNaN(parseFloat(itemPrice))) {
            Alert.alert('Error', 'Item weight and price must be numbers');
            return;
        }

        const newItem: OrchidItem = {
            id: new Date().toISOString(),
            name: itemName,
            weight: parseFloat(itemWeight),
            rating: itemRating,
            price: parseFloat(itemPrice),
            isTopOfTheWeek: false,
            image: itemImage,
            color: itemColor,
            bonus: itemBonus,
            origin: itemOrigin
        };

        // Dispatch action to add item to the selected category
        dispatch(
            addItemCategory({ categoryId: selectedCategoryId, item: newItem })
        );
        Alert.alert('Success', 'Item added successfully');
        // Reset input fields after adding item
        resetFields();
    };

    const resetFields = () => {
        setItemName('');
        setItemWeight('');
        setItemRating('');
        setItemPrice('');
        setItemImage('');
        setItemColor('');
        setItemBonus('');
        setItemOrigin('');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Item Name</Text>
            <TextInput
                style={styles.input}
                value={itemName}
                onChangeText={setItemName}
            />

            <Text style={styles.label}>Item Weight</Text>
            <TextInput
                style={styles.input}
                value={itemWeight}
                onChangeText={setItemWeight}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Item Rating</Text>
            <TextInput
                style={styles.input}
                value={itemRating}
                onChangeText={setItemRating}
            />

            <Text style={styles.label}>Item Price</Text>
            <TextInput
                style={styles.input}
                value={itemPrice}
                onChangeText={setItemPrice}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Item Image URL</Text>
            <TextInput
                style={styles.input}
                value={itemImage}
                onChangeText={setItemImage}
            />

            <Text style={styles.label}>Item Color</Text>
            <TextInput
                style={styles.input}
                value={itemColor}
                onChangeText={setItemColor}
            />

            <Text style={styles.label}>Item Bonus</Text>
            <TextInput
                style={styles.input}
                value={itemBonus}
                onChangeText={setItemBonus}
            />

            <Text style={styles.label}>Item Origin</Text>
            <TextInput
                style={styles.input}
                value={itemOrigin}
                onChangeText={setItemOrigin}
            />

            <Button title="Add Item" onPress={handleAddItem} />
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
    }
});

export default HomeAddCategoryItem;

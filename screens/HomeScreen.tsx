// HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import HomeGridTitle from '../components/HomeComponents/HomeGridTitle';
import { RootState } from '../store/redux/Store';
import { Category } from '../store/redux/slice/CategorySlice';
import { useAppDispatch } from '../hooks/useDispatch';
import { fetchCategories } from '../store/redux/api/CategoryApis';

const HomeScreen = () => {
    const categoriesState = useSelector((state: RootState) => state.categories);
    const [numColumns, setNumColumns] = useState(2);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const renderCategoryItem = (itemData: { item: Category }) => {
        return (
            <HomeGridTitle title={itemData.item.name} id={itemData.item.id} />
        );
    };

    return (
        <FlatList
            data={categoriesState.allCategories}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={numColumns}
            extraData={numColumns}
        />
    );
};

const styles = StyleSheet.create({});

export default HomeScreen;

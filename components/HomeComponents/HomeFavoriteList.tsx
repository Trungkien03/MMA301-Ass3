// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import HomeMealList from './HomeMealList';
// import { RootState } from '../../store/redux/Store';
// import { loadFavoritesAsync } from '../../store/redux/slice/CategorySlice';

// const FavoritesScreen = () => {
//     const dispatch = useDispatch();

//     // Load favorite meal IDs from Redux state
//     const favoriteMealIds = useSelector(
//         (state: RootState) => state.categories.favorites
//     );

//     // Load categories from Redux state
//     const CategoriesStates = useSelector(
//         (state: RootState) => state.categories
//     );

//     // Load favorites when the component mounts
//     useEffect(() => {
//         dispatch(loadFavoritesAsync());
//     }, [dispatch]);

//     // Filter favorite items from all categories
//     const favoriteMeals = CategoriesStates.allCategories.flatMap((category) =>
//         category.items.filter((item) => favoriteMealIds.includes(item.id))
//     );

//     return <HomeMealList displayMeals={favoriteMeals} />;
// };

// export default FavoritesScreen;

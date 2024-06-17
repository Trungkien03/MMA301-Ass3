import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/redux/Store';

// Export a hook that can be reused to resolve types
export const useAppDispatch: () => AppDispatch = useDispatch;

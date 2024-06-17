import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type IconButtonProps = {
    iconName: keyof typeof Ionicons.glyphMap;
    color: string;
    onTap?: () => void;
};

const IconButton: FC<IconButtonProps> = ({ iconName, color, onTap }) => {
    return (
        <TouchableOpacity onPress={onTap}>
            <Ionicons name={iconName} size={24} color={color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7
    }
});

export default IconButton;

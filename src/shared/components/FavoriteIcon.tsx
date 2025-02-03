import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FC} from "react";

interface Props {
    isFavorite: boolean;
    onPress: () => void;
}

// Casting MaterialIcons to the correct JSX type
const MaterialIconComponent = MaterialIcons as unknown as FC<{ name: string; size?: number; color?: string }>;

export const FavoriteIcon = ({ isFavorite, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <MaterialIconComponent
                name={isFavorite ? "star" : "star-border"}
                size={30}
                color={isFavorite ? "gold" : "gray"}
            />
        </TouchableOpacity>
    );
};

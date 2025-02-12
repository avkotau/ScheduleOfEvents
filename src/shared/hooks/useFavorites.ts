import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Event } from "../../entities/event/types";
import {Alert} from "react-native";

export const useFavorites = (event: Event) => {
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem("favorites");
                if (storedFavorites) {
                    const parsedFavorites = JSON.parse(storedFavorites) as number[];
                    setFavorites(parsedFavorites);
                    setIsFavorite(parsedFavorites.includes(event.id));
                }
            } catch (error) {
                Alert.alert("Error", "Failed to load featured events. Please try again.");
            }
        };

        loadFavorites();
    }, [event.id]);


    const toggleFavorite = async () => {
        try {
            const updatedFavorites = isFavorite
                ? favorites.filter(id => id !== event.id)
                : [...favorites, event.id];

            setFavorites(updatedFavorites);
            setIsFavorite(!isFavorite);

            await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } catch (error) {
            Alert.alert("Error", "Couldn't save changes. Check your network connection and try again.");
        }
    };

    return { isFavorite, toggleFavorite };
};

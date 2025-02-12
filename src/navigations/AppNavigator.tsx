import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { EventList } from '../pages/EventList';
import { EventDetailsScreen } from '../pages/EventDetailsScreen';
import {TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Typography } from '../shared/styles/typography';
import {vScale} from "../shared/util/scale";
import {theme} from "../shared/styles/theme";

const Stack = createStackNavigator();

export const AppNavigator = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState("ru");

    useEffect(() => {
        const loadLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem("language");
                if (storedLanguage) {
                    setLanguage(storedLanguage);
                    await i18n.changeLanguage(storedLanguage);
                }
            } catch (error) {
                Alert.alert("Error", "Loading language");
            }
        };

        loadLanguage();
    }, []);

    const toggleLanguage = async () => {
        const newLang = i18n.language === "en" ? "ru" : "en";
        await i18n.changeLanguage(newLang);
        setLanguage(newLang);

        try {
            await AsyncStorage.setItem("language", newLang);
        } catch (error) {
            Alert.alert("Error", "Loading language");
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={() => ({
                    headerRight: () => (
                        <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
                            <Typography variant="proSemibold" style={styles.languageText}>
                                {language.toUpperCase()}
                            </Typography>
                        </TouchableOpacity>
                    ),
                    headerStyle: { backgroundColor: theme.background.accent },
                    headerTintColor: theme.text.white,
                })}
            >
                <Stack.Screen name="EventList" component={EventList} options={{ title: t("common.events") }} />
                <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: t("common.eventDetails") }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    languageButton: {
        marginRight: vScale(15),
        padding: vScale(10),
        backgroundColor: theme.background.secondary,
        borderRadius: 5,
    },
    languageText: {
        color: theme.text.accent,
    },
});

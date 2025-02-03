import { View, StyleSheet } from 'react-native';
import { useFavorites } from "../shared/hooks/useFavorites";
import { useTranslation } from 'react-i18next';
import { FavoriteIcon } from '../shared/components/FavoriteIcon';
import { Event as EventType } from '../entities/event/types';
import { observer } from "mobx-react-lite";
import { eventStore } from "../store/eventStore";
import { Typography } from '../shared/styles/typography';
import {vScale} from "../shared/util/scale";
import {theme} from "../shared/styles/theme";

export const EventDetailsScreen = observer(() => {
    const { t } = useTranslation();

    const events = t("eventData", { returnObjects: true }) as EventType[];
    const event = events.find(e => e.id === eventStore.eventId);

    if (!event) {
        return (
            <View style={styles.container}>
                <Typography variant="proBold">{t("common.eventNotFound")}</Typography>
            </View>
        );
    }

    const { isFavorite, toggleFavorite } = useFavorites(event);

    return (
        <View style={styles.container}>
            <Typography variant="proBold" style={styles.title}>{event.title}</Typography>
            <Typography variant="proRegular" style={styles.date}>{t("common.selectDate")}: {event.date}</Typography>
            <Typography variant="proRegular">{event.description}</Typography>

            <View style={styles.favoriteContainer}>
                <FavoriteIcon isFavorite={isFavorite} onPress={toggleFavorite} />
                <Typography variant="proRegular" style={styles.favoriteText}>
                    {t(isFavorite ? "common.removeFromFavorites" : "common.addToFavorites")}
                </Typography>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: vScale(20),
        backgroundColor: theme.background.secondary,
    },
    title: {
        marginBottom: vScale(10)
    },
    date: {
        color: theme.text.secondary,
        marginBottom: vScale(15)
    },
    favoriteContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: vScale(10),
    },
    favoriteText: {
        marginLeft: vScale(8),
    },
});

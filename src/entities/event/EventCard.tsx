import { View, StyleSheet } from 'react-native';
import { Event } from './types';
import { Typography } from '../../shared/styles/typography';
import {vScale} from "../../shared/util/scale";
import {theme} from "../../shared/styles/theme";

interface Props {
    event: Event;
}

export const EventCard = ({ event }: Props) => {
    return (
        <View style={styles.card}>
            <Typography variant="proBold" style={styles.title}>{event.title}</Typography>
            <Typography variant="proRegular" style={styles.date}>{event.date}</Typography>
            <Typography variant="proRegular">{event.description}</Typography>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: vScale(15),
        marginVertical: vScale(8),
        backgroundColor: theme.background.secondary,
        borderRadius: 10,
    },
    title: {
        marginBottom: vScale(5),
    },
    date: {
        color: theme.text.secondary,
        marginBottom: vScale(8),
    },
});

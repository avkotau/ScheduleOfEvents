import { useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, TouchableOpacity, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { EventCard } from '../entities/event/EventCard';
import { NavigationType } from '../navigations/types';
import { useTranslation } from 'react-i18next';
import { Event } from '../entities/event/types';
import { observer } from "mobx-react-lite";
import { eventStore } from "../store/eventStore";
import {Typography} from "../shared/styles/typography";
import {vScale} from "../shared/util/scale";
import {theme} from "../shared/styles/theme";

export const EventList = observer(() => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation<NavigationType<'EventList'>>();

    const events = t("eventData", { returnObjects: true }) as Event[];

    const filteredByTitle = events.filter((event: Event) =>
        event.title
            .toLowerCase()
            .split(" ")
            .some((word: string) => word.startsWith(searchQuery.toLowerCase()))
    );

    const filteredEvents = selectedDate
        ? filteredByTitle.filter((event: Event) => event.date === selectedDate.toISOString().split('T')[0])
        : filteredByTitle;

    const onDateChange = (event: any, date?: Date) => {
        if (event.type === "set" && date) {
            setSelectedDate(date);
        }
        setShowDatePicker(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder={t("common.searchPlaceholder")}
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            <View style={styles.dateFilterContainer}>
                <Button title={t("common.selectDate")} onPress={() => setShowDatePicker(true)} />
                {selectedDate && (
                    <Typography variant="proRegular" style={styles.selectedDateText}>
                        {selectedDate.toLocaleDateString()}
                    </Typography>
                )}
                {selectedDate && (
                    <Button title={t("common.clear")} color="red" onPress={() => setSelectedDate(null)} />
                )}
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                />
            )}

            <FlatList
                data={filteredEvents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            eventStore.setEventId(item.id);
                            navigation.navigate('EventDetails');
                        }}
                    >
                        <EventCard event={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: vScale(15),
        backgroundColor: theme.background.primary,
    },
    searchInput: {
        backgroundColor: theme.background.secondary,
        height: vScale(60),
        borderRadius: 8,
        paddingHorizontal: vScale(10),
        marginBottom: vScale(10),
        borderWidth: 1,
        borderColor: '#ddd'
    },
    dateFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: vScale(10)
    },
    selectedDateText: {
        marginLeft: vScale(10)
    },
});

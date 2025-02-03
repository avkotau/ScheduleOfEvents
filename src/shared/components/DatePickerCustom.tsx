import {useState} from "react";
import {View, StyleSheet, Platform, Modal, TouchableWithoutFeedback, TouchableOpacity, Text} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Typography} from "../styles/typography";
import {vScale} from "../util/scale";
import {useTranslation} from "react-i18next";
import {t} from "i18next";

interface Props {
    selectedDate: Date | null;
    showDatePicker: boolean;
    setShowDatePicker: (value: boolean) => void;
    setSelectedDate: (date: Date | null) => void;
    onDateChange: (event: any, date?: Date) => void;
    selectDateText: string;
    clearText: string;
}

export const DatePickerCustom = (
    {
        selectedDate,
        showDatePicker,
        setShowDatePicker,
        setSelectedDate,
        onDateChange,
        selectDateText,
        clearText,
    }: Props) => {
    const [tempDate, setTempDate] = useState<Date | null>(selectedDate);

    const { i18n } = useTranslation();

    const handleConfirm = () => {
        if (tempDate) {
            setSelectedDate(tempDate);
        }
        setShowDatePicker(false);
    };

    const handleCancel = () => {
        setShowDatePicker(false);
    };

    const language = i18n.language === 'ru' ? 'ru-RU' : 'en-US'

    return (
        <View style={styles.dateFilterContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
                <Text style={styles.buttonText}>{selectDateText}</Text>
            </TouchableOpacity>
            {selectedDate && (
                <Typography variant="proRegular" style={styles.selectedDateText}>
                    {selectedDate.toLocaleDateString()}
                </Typography>
            )}
            {selectedDate && (
                <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={() => setSelectedDate(null)}>
                    <Text style={[styles.buttonText, styles.clearButtonText]}>{clearText}</Text>
                </TouchableOpacity>
            )}

            {Platform.OS === "ios" ? (
                <Modal
                    transparent={true}
                    visible={showDatePicker}
                    animationType="slide"
                    onRequestClose={handleCancel}
                >
                    <TouchableWithoutFeedback onPress={handleCancel}>
                        <View style={styles.modalContainer}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalContent}>
                                    <DateTimePicker
                                        key={i18n.language}
                                        value={tempDate || new Date()}
                                        mode="date"
                                        display="spinner"
                                        locale={language}
                                        onChange={(event, date) => setTempDate(date || tempDate)}
                                    />
                                    <View style={styles.modalButtons}>
                                        <TouchableOpacity style={[styles.button, styles.clearButton]}
                                                          onPress={handleCancel}>
                                            <Typography variant={'proSemibold'} style={[styles.buttonText, styles.clearButtonText]}>{t("common.cancel")}</Typography>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                                            <Typography variant={'proSemibold'} style={styles.buttonText}>{t("common.ok")}</Typography>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            ) : (
                showDatePicker && (
                    <DateTimePicker
                        key={i18n.language}
                        value={selectedDate || new Date()}
                        mode="date"
                        display="default"
                        locale={language}
                        onChange={onDateChange}
                    />
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dateFilterContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: vScale(10),
    },
    selectedDateText: {
        marginLeft: vScale(10),
    },
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: vScale(10),
        paddingHorizontal: vScale(15),
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: vScale(16),
        fontWeight: "bold",
        textAlign: "center",
    },
    clearButton: {
        backgroundColor: "red",
    },
    clearButtonText: {
        color: "#fff",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: vScale(20),
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: vScale(10),
        width: "100%",
    },
});

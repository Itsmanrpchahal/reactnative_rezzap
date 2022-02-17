import React  from 'react';
import {  View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type CustomTimePickerProps = {
    showDateTimePicker: boolean;
    setDateTimePicker: (value: boolean) => void;
    handlePickerData: (date: any) => void;
};

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
    showDateTimePicker = false,
    handlePickerData,
    setDateTimePicker,
}) => {
    const hideTimePicker = () => {
        setDateTimePicker(false);
    };

    const setTimeValue = (date: any) => {
        handlePickerData(date);
        setDateTimePicker(false);
    };

    return (
        <View>
            <DateTimePickerModal
                isVisible={showDateTimePicker}
                mode="date"
                maximumDate={new Date()}
                onConfirm={setTimeValue}
                onCancel={hideTimePicker}
            />
        </View>
    );
};

export default CustomTimePicker;

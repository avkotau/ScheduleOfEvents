import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    EventList: undefined;
    EventDetails: undefined;
};

export type NavigationType<T extends keyof RootStackParamList> =
    StackNavigationProp<RootStackParamList, T>;

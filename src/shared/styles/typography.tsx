import {StyleSheet, TextStyle, Text, StyleProp, TextProps} from "react-native";
import {ReactNode} from "react";
import {vScale} from "../util/scale";

export type VariantType = keyof typeof styles;

export type TypographyProps = TextProps & {
    variant?: VariantType;
    children: ReactNode;
    style?: StyleProp<TextStyle>;
    fontSize?: number;
    fontWeight?: "400" | "500" | "600" | "700" | "900";
};

export const Typography = (
    {
        variant = "proRegular",
        children,
        style,
        fontSize,
        fontWeight,
        ...rest
    }: TypographyProps) => {
    return (
        <Text
            style={[
                styles[variant],
                style,
                {
                    fontSize: fontSize ?? StyleSheet.flatten(styles[variant]).fontSize,
                    fontWeight: fontWeight ?? StyleSheet.flatten(styles[variant]).fontWeight,
                },
            ]}
            {...rest}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    proBold: {
        fontFamily: "SF-Pro-Display-Bold",
        fontWeight: "700",
        fontSize: vScale(22),
    },
    proMedium: {
        fontFamily: "SF-Pro-Display-Medium",
        fontWeight: "500",
        fontSize: vScale(22),
    },
    proRegular: {
        fontFamily: "SF-Pro-Display-Regular",
        fontWeight: "400",
        fontSize: vScale(16),
    },
    proSemibold: {
        fontFamily: "SF-Pro-Display-Semibold",
        fontWeight: "600",
        fontSize: vScale(18),
    },
    proBlack: {
        fontFamily: "SF-Pro-Display-Black",
        fontWeight: "900",
        fontSize: vScale(34),
    },
});

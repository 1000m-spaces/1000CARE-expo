import { StyleSheet } from "react-native";
import { deviceHeight, width_90_percent } from '../../assets/config';
import Colors from "../../common/Colors/Colors";

let heightModal = deviceHeight - 150;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        width: "90%",
        overflow: "hidden",
        height: heightModal,
        alignItems: "center",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    user_or_admin: {
        flexDirection: "row",
        width: "100%",
        height: 42,
        backgroundColor: "#f3f4f5"
    },
    button: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    label : {
        fontWeight: '600',
        fontSize: 15,
        color : 'gray'
    },
    touchableAdmin: {
        fontWeight: "600",
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4
    },
    txtTouchableAdmin: { color: "#949799", fontWeight: "600" },
    txtTouchableUser: { fontWeight: "normal", color: "#949799" },
    img_space: {
        height: 30,
        resizeMode: "contain",
        position: "relative",
        top: 8
    }
});

export default styles;

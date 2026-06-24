import { StyleSheet } from "react-native";

import { deviceWidth, deviceHeight } from "../../assets/config";

import Colors from "../../common/Colors/Colors";

let widthText = (deviceWidth * 90 * 90) / 100 / 100 - 18 - 30 - 10;
let heightModal = deviceHeight - 150;
let heightScrollView = heightModal - 100;

const stylesUser = StyleSheet.create({
    container: { marginLeft: 1, overflow: "hidden", width: "100%" },
    top_content: {
        marginBottom: 10,
        marginTop: 10,
        justifyContent: "center",
        marginLeft: 18,
        width: "90%",
    },
    center_content: {
        width: "100%",
        height: heightScrollView,
    },
    button_new_msg: {
        flexDirection: "row",
        alignItems: "center",
    },
    text_button_new: {
        color: Colors.txt_desc,
        justifyContent: "center",
        marginLeft: 10,
        fontSize: 16,
    },
    itemMsg: {
        paddingTop: 10,
        flexDirection: "row",
        width: "100%",
        borderTopWidth: 1,
        borderColor: "#e5e6e8",
        marginBottom: 7,
        paddingBottom: 7,
    },
    itemMsgLeft: {
        width: "10%",
        justifyContent: "center",
        marginLeft: 15,
        marginRight: 10,
    },
    itemMsgContent: {
        width: "52.5%",
        paddingRight: 8,
    },
    rowTime: {
        width: "27.5%",
        justifyContent: "center",
    },
    timeMsg: {
        textAlign: "center",
        justifyContent: "center",
    },
    username: {
        fontWeight: "normal",
        fontSize: 16,
    },
    noRead: {
        fontWeight: "600",
    },
    contentMsg: {
        fontSize: 13,
    },
    userReceive: {
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ccc",
        paddingTop: 7,
        paddingBottom: 7,
    },
    textUserReceive: {
        paddingLeft: 8,
        fontWeight: "600",
        fontSize: 16,
        textAlign: "left",
        width: "100%",
    },
    containerModal: {
        width: deviceWidth - 40,
        height: 290,
        padding: 10,
        marginTop: 15,
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    inputUserReceive: {
        width: "98.5%",
        borderWidth: 0,
        backgroundColor: "transparent",
        paddingLeft: 8,
        paddingTop: 0,
        paddingBottom: 0,
        height: 30,
    },
    rowInput: {
        marginTop: 13,
        width: "100%",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#c4c4c4",
    },
    inputMessage: {
        paddingLeft: 8,
        fontSize: 15,
        minHeight: 150,
        width: "98.5%",
        maxHeight: 150,
        textAlignVertical: "top",
    },
    rowButton: {
        width: "100%",
        marginTop: 13,
        justifyContent: "center",
        alignItems: "center",
        height: 45,
    },
    button: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.btn_update_pass,
        borderRadius: 5,
    },
    textButton: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    view_new_message: {
        borderWidth: 1,
        borderColor: "#d9dbdd",
        width: widthText,
        height: 40,
        borderRadius: 5,
        marginLeft: 10,
        paddingTop: 8,
    },
    view_indicator1: {
        zIndex: 100,
        flex: 1,
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    view_indicator2: {
        position: "absolute",
        top: -120,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    view_isLoading: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    view_flatList: {
        height: "100%",
        paddingBottom: 20,
    },
    touch_no_message: {
        height: "100%",
        width: "100%",
        marginVertical: 50,
        marginHorizontal: 10,
    },
    icon_mail: {
        width: 30,
        resizeMode: "contain",
    },
});

export default stylesUser;

import { StyleSheet } from "react-native";
import Colors from "../Colors/Colors";

const commonStyles = StyleSheet.create({
  text_footer: {
    fontWeight: "normal"
  },
  text_default_add: {
    color: "#000",
    fontWeight: "normal",
    fontSize: 15
  },
  full_screen: {
    width: "100%",
    height: "100%",
    margin: 0
  },
  txt_back: {
    fontSize: 20,
    color: Colors.white,
    marginLeft: 10
  },
  back_header: {
    height: 50,
    width: "100%",
    justifyContent: "flex-start",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black
  },
  privacy_check_icon: {
    width: 15,
    height: 15
  },
  add_check_icon: {
    width: 20,
    height: 20
  },
  privacy_checkbox: {
    backgroundColor: "transparent",
    paddingLeft: 0,
    marginLeft: 0,
    borderWidth: 0
  },
  text_black_normal: {
    color: Colors.black,
    fontWeight: "normal"
  },
  btn_confirm: { width: "80%", padding: 5, marginTop: 5, borderRadius: 5 },
  txt_confirm: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600"
  },
  normal_radius_container: {
    borderRadius: 5,
    overflow: "hidden"
  },
  loading: { position: "absolute", left: 20, top: 10 }
});

export default commonStyles;

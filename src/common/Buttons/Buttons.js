import React from "react";
import Colors from "../../common/Colors/Colors";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { s, fs } from '~/utils/responsive'
import { brandShadow, radiusScale } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import PressScale from '~/design-system/PressScale'

const Buttons = props => {
  const {text, onPressEvent, styleView, styleButton, styleText } = props;
  return (
    <View style={[styles.container,styleView]}>
      <PressScale
        style={[styles.btn_container,styleButton]}
        onPress={onPressEvent}
      >
          <Text style={[styles.text,styleText]}>{text}</Text>
      </PressScale>
    </View>
  );
};

const styles = StyleSheet.create({
  btn_container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: s(52),
    paddingVertical: s(12),
    paddingHorizontal: s(24),
    backgroundColor: Colors.colorMain,
    borderRadius: s(radiusScale.xxl),
    ...brandShadow.teal,
  },
  container: {
    alignItems: 'center',
    marginTop: s(10)
  },
  loading: { position: "absolute", left: 20 },
  text: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: fs(16),
    fontWeight: "normal",
    textAlign: "center"
  }
});

export default Buttons;

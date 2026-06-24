import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AppBackground from './AppBackground';

const AppScreen = ({
  children,
  scroll = false,
  style,
  contentContainerStyle,
  safeAreaStyle,
  ...scrollProps
}) => {
  const content = scroll ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.body, style]}
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      {...scrollProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.body, style]}>{children}</View>
  );

  return (
    <AppBackground safeAreaStyle={safeAreaStyle}>
      {content}
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 24,
  },
});

export default AppScreen;

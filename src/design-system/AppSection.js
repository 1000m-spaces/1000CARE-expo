import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { s, fs } from '~/utils/responsive';
import { brandColors } from './tokens';
import { Fonts } from '~/assets/config';

const AppSection = ({ title, subtitle, action, children, style, headerStyle }) => {
  return (
    <View style={[styles.section, style]}>
      {(title || subtitle || action) && (
        <View style={[styles.header, headerStyle]}>
          <View style={styles.titleBlock}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
          {action}
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: s(24),
  },
  header: {
    paddingHorizontal: s(18),
    marginBottom: s(10),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontSize: fs(18),
    lineHeight: fs(24),
    fontWeight: 'normal',
  },
  subtitle: {
    marginTop: s(3),
    color: brandColors.muted,
    fontSize: fs(12),
    fontWeight: 'normal',
  },
});

export default AppSection;

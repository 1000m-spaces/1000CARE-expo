import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import LoadingView from '../LoadingView/LoadingView';
import MessageView from '../MessageView/MessageView';
import Status from '../Status/Status';
import {ThemeContext} from '../../theme';

const GenericTemplate = ({
  children,
  footer = <></>,
  scrollable = false,
  status = Status.SUCCESS,
  errorMessage = '',
  style = {},
  refreshControl,
  onLayout,
  assignRef,
}) => {
  const {theme} = useContext(ThemeContext);
  const ViewGroup = scrollable ? ScrollView : View;
  const props = {};

  if (scrollable) {
    props.contentContainerStyle = style;
    if (refreshControl) {
      props.refreshControl = refreshControl;
    }
  } else {
    props.style = [styles.content, style];
  }

  return (
    <SafeAreaView {...(onLayout && {onLayout})} style={styles.container(theme)}>
      <ViewGroup ref={component => assignRef?.(component)} {...props}>
        {!refreshControl &&
          (status === Status.DEFAULT || status === Status.LOADING) && (
            <LoadingView variant="list" />
          )}
        {status === Status.ERROR && (
          <MessageView type="error" message={errorMessage} />
        )}
        {status === Status.SUCCESS && children}
      </ViewGroup>
      {footer}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.backgroundColor,
  }),
  content: {
    flex: 1,
  },
  stickyFooter: {},
});

export default GenericTemplate;

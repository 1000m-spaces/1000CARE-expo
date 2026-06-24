import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import ModalSelector from 'react-native-modal-selector';
import Text from '../Text/index';
import Icon from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';
import TextInput from '../TextInput/TextInput';
import { ThemeContext } from '../../theme';
import strings from '../../i18n';

const ModalSelect = ({
  data,
  label,
  selectedKey = null,
  onChange = () => { },
  disabled = false,
  loading = false,
  style = {},
  inputContainerStyle = {},
  textStyle = {},
  placeholderTextColor = '',
}) => {
  const [value, setValue] = useState('');
  const { theme } = useContext(ThemeContext);

  const dataWithLabel = [
    {
      id: '5d80812e', // Random key
      section: true,
      name: label,
    },
    ...data,
  ];

  useEffect(() => {
    if (selectedKey) {
      let option =
        dataWithLabel.find(_item => _item.key === selectedKey) ||
        dataWithLabel.find(_item => _item.id === selectedKey);

      if (option) {
        setValue(option.name);
      } else {
        return;
      }
    } else {
      setValue(null);
      onChange({});
    }
  }, [selectedKey]);

  useEffect(() => {
    if (selectedKey) {
      let option =
        dataWithLabel.find(_item => _item.key === selectedKey) ||
        dataWithLabel.find(_item => _item.id === selectedKey);

      if (option) {
        setValue(option.name);
      }
    }
  }, [data]);

  const _onChange = option => {
    if (!selectedKey) {
      setValue(option?.name);
    }
    onChange?.(option);
  };

  return (
    <ModalSelector
      accessible
      disabled={loading || disabled}
      data={dataWithLabel}
      onChange={_onChange}
      selectedKey={selectedKey}
      keyExtractor={item => item.id}
      labelExtractor={item => item.name}
      scrollViewAccessibilityLabel={'Label'}
      cancelButtonAccessibilityLabel={'Hủy'}>
      <TextInput
        containerStyle={StyleSheet.flatten([
          style,
          disabled && styles.disabledContainer,
        ])}
        inputContainerStyle={inputContainerStyle}
        inputStyle={StyleSheet.flatten([styles.inputStyle, textStyle])}
        editable={false}
        placeholder={label}
        value={value}
        placeholderTextColor={placeholderTextColor}
        rightIcon={
          loading ? (
            <Spinner size="small" />
          ) : (
            <Icon
              name="arrow-drop-down"
              size={30}
              color={placeholderTextColor || theme.labelTextColor}
            />
          )
        }
      />
    </ModalSelector>
  );
};

const styles = {
  inputStyle: {
    textAlign: 'center',
  },
  disabledContainer: {
    opacity: 0.5,
  },
};

export default ModalSelect;

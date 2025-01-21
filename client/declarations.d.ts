declare module 'react-native-datepicker' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';
  
    interface DatePickerProps {
      style?: ViewStyle;
      date: string;
      mode?: 'date' | 'datetime' | 'time';
      placeholder?: string;
      format?: string;
      onDateChange?: (date: string) => void;
      customStyles?: {
        dateInput?: ViewStyle;
        dateText?: TextStyle;
      };
    }
  
    export default class DatePicker extends Component<DatePickerProps> {}
  }
  
import React, {useCallback, useMemo, useState} from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from 'react-native';

interface Props
  extends Omit<
    TextProps,
    'numberOfLines' | 'onPress' | 'onLayout' | 'disabled'
  > {
  onReadMore?: () => void;
  readMoreText?: String;
  readLessText?: String;
  readMoreStyle?: TextStyle;
  readLessStyle?: TextStyle;
}

const ReadMore = ({
  children,
  onReadMore,
  style,
  readLessText = 'read less',
  readMoreText = 'read more',
  readLessStyle = {color: 'red'},
  readMoreStyle = {color: 'red'},
  ...rest
}: Props) => {
  const [maxWidth, setMaxWidth] = useState(0);
  const [readMoreWidth, setReadMoreWidth] = useState(0);

  const [textHeight, setTextHeight] = useState(0);
  const [textHeightOneLine, setTextHeightOneLine] = useState(0);

  const [numOfLine, setNumOfLine] = useState(1);

  const onLayoutMaxWidth = useCallback((e: LayoutChangeEvent) => {
    setMaxWidth(e.nativeEvent.layout.width);
  }, []);

  const onLayoutReadMoreWidth = useCallback((e: LayoutChangeEvent) => {
    setReadMoreWidth(e.nativeEvent.layout.width);
  }, []);

  const onLayoutTextHeight = useCallback((e: LayoutChangeEvent) => {
    setTextHeight(e.nativeEvent.layout.height);
  }, []);
  const onLayoutTextHeightOneLine = useCallback((e: LayoutChangeEvent) => {
    setTextHeightOneLine(e.nativeEvent.layout.height);
  }, []);

  const isShowReadMore = textHeight > textHeightOneLine && numOfLine === 1;

  const isShowReadLess = !onReadMore && !numOfLine;

  const onPressReadMore = useCallback(() => {
    setNumOfLine(0);
  }, []);

  const onPressReadLess = useCallback(() => {
    setNumOfLine(1);
  }, []);

  const handleReadMore = useCallback(() => {
    if (onReadMore) {
      onReadMore();
    } else {
      onPressReadMore();
    }
  }, [onReadMore, onPressReadMore]);

  const textStyle: StyleProp<TextStyle> = useMemo(() => {
    const width = isShowReadMore ? maxWidth - readMoreWidth : undefined;

    if (style) {
      return StyleSheet.compose(style, {width});
    }
    return {width};
  }, [isShowReadMore, maxWidth, readMoreWidth, style]);

  const readMoreFinalStyle: StyleProp<TextStyle> = useMemo(() => {
    return StyleSheet.compose(readMoreStyle, {
      position: 'absolute',
      opacity: +isShowReadMore,
      right: 0,
    });
  }, [isShowReadMore, readMoreStyle]);

  return (
    <>
      <View onLayout={onLayoutMaxWidth} style={styles.fake}>
        {/* This block to know actually textHeight */}
        <Text
          numberOfLines={1}
          onLayout={onLayoutTextHeightOneLine}
          style={style}>
          {children}
        </Text>
        <Text onLayout={onLayoutTextHeight} style={style}>
          {children}
        </Text>
      </View>
      <View>
        {/* This block is displayed on screen */}
        <Text {...rest} numberOfLines={numOfLine} style={textStyle}>
          {children}
          {isShowReadLess && (
            <Text>
              {' - '}
              <Text style={readLessStyle} onPress={onPressReadLess}>
                {readLessText}
              </Text>
            </Text>
          )}
        </Text>

        <Text
          style={readMoreFinalStyle}
          onLayout={onLayoutReadMoreWidth}
          onPress={handleReadMore}
          disabled={!isShowReadMore}>
          {readMoreText}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fake: {
    position: 'absolute',
    backgroundColor: 'red',
    opacity: 0,
    zIndex: -100,
  },
});

export default ReadMore;

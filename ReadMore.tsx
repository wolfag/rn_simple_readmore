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
  const [textWidth, setTextWidth] = useState(0);

  const [numOfLine, setNumOfLine] = useState(1);

  const isShowFull = numOfLine === 0;

  const onLayoutMaxWidth = useCallback((e: LayoutChangeEvent) => {
    setMaxWidth(e.nativeEvent.layout.width);
  }, []);

  const onLayoutReadMoreWidth = useCallback((e: LayoutChangeEvent) => {
    setReadMoreWidth(e.nativeEvent.layout.width);
  }, []);

  const onLayoutTextWidth = useCallback((e: LayoutChangeEvent) => {
    setTextWidth(e.nativeEvent.layout.width);
  }, []);

  const isShowReadMore = useMemo(() => {
    return textWidth >= maxWidth - readMoreWidth - 10 && numOfLine === 1;
  }, [textWidth, maxWidth, readMoreWidth, numOfLine]);

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
    const width = isShowFull ? maxWidth : maxWidth - readMoreWidth;
    const st: TextStyle = isShowReadMore ? {width} : {width: textWidth};
    if (style) {
      return StyleSheet.compose(style, st);
    }
    return st;
  }, [isShowFull, maxWidth, readMoreWidth, isShowReadMore, style, textWidth]);

  const readMoreFinalStyle: StyleProp<TextStyle> = useMemo(() => {
    return StyleSheet.compose(readMoreStyle, {
      position: 'absolute',
      opacity: +isShowReadMore,
      right: 0,
    });
  }, [isShowReadMore, readMoreStyle]);

  return (
    <>
      <View style={styles.fake}>
        {/* This block to know actually textWidth */}
        <Text numberOfLines={1} onLayout={onLayoutTextWidth}>
          {children}
        </Text>
      </View>
      <View onLayout={onLayoutMaxWidth}>
        {/* This block is displayed on screen */}
        <Text {...rest} numberOfLines={numOfLine} style={textStyle}>
          {children}
          {isShowReadLess && (
            <Text>
              {' '}
              -{' '}
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
  fake: {flexDirection: 'row', height: 0},
});

export default ReadMore;

// import {curveBasis, line, scaleLinear, scaleTime} from 'd3';
import React, {useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DateTimePicker from 'react-native-date-picker';
import FastImage from 'react-native-fast-image';
import {format} from 'date-fns';
import StatusBarUnderlay, {STATUS_BAR_HEIGHT} from './StatusBarUnderlay';
import {ImageGrid} from './ImageGrid';

interface SectionProps {
  children?: any;
}

function Section({children}: SectionProps) {
  return <View style={styles.section}>{children}</View>;
}

interface FeatureTextProps {
  text?: string;
  style?: any;
  children?: any;
}

function FeatureText({text, style, children}: FeatureTextProps) {
  return (
    <Text style={[stylesFeatureText.style, style]}>{text || children}</Text>
  );
}

const stylesFeatureText = StyleSheet.create({
  style: {
    color: '#222',
  },
});

export const DefaultImageGrid = () => <ImageGrid ImageComponent={Image} />;

export const FastImageGrid = () => <ImageGrid ImageComponent={FastImage} />;

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button title="Open" onPress={() => setOpen(true)} />
      <Text>{format(date, 'MMMM do, yyyy H:mma')}</Text>
      <DateTimePicker
        modal
        open={open}
        date={date}
        onConfirm={date => (setOpen(false), setDate(date))}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

export const FastImageExamples = () => (
  <View style={styles.container}>
    <StatusBar
      translucent
      barStyle="dark-content"
      backgroundColor="transparent"
    />
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.scrollContentContainer}>
      <View style={styles.contentContainer}>
        <Section>
          <Text style={styles.titleText}>🚩 FastImage</Text>
          <FeatureText text="Tap images to reload examples." />
          <Calendar />
        </Section>
        {/* <PriorityExample />
          <GifExample />
          <BorderRadiusExample />
          <ProgressExample />
          <PreloadExample />
          <ResizeModeExample />
          <TintColorExample />
          <LocalImagesExample />
          <AutoSizeExample /> */}
      </View>
    </ScrollView>
    <StatusBarUnderlay />
  </View>
);

const styles = StyleSheet.create({
  titleText: {
    fontWeight: '900',
    marginBottom: 20,
    color: '#222',
  },
  contentContainer: {
    marginTop: 20,
  },
  image: {
    flex: 1,
    height: 100,
    backgroundColor: '#ddd',
    margin: 10,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    marginTop: STATUS_BAR_HEIGHT,
  },
  scrollContentContainer: {
    alignItems: 'stretch',
    flex: 0,
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  statusBarUnderlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'white',
  },
});

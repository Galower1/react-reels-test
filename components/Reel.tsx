import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import { ReelVideo } from "./ReelVideo";
import data from "../data.json";

export interface VideoRefKeys {
  [id: string]: React.MutableRefObject<Video | null>;
}

export interface VideoProps {
  id: string;
  uri: string;
  handleRef?: (ref: VideoRefKeys) => void;
}

export const Reel: React.FC = () => {
  const [childVideoRefs, setChildVideoRefs] = useState<VideoRefKeys>({});
  const [videos, setVideos] = useState<VideoProps[]>([]);

  useEffect(() => {
    loadVideos();
  }, []);

  const handleRef = (ref: VideoRefKeys) => {
    setChildVideoRefs((prev) => {
      Object.assign(prev, ref);
      return prev;
    });
  };

  const loadVideos = () => {
    const start = videos.length;

    const newVideos = data.map((item, i) => ({
      ...item,
      id: String(start + i),
    }));

    setVideos((prev) => {
      const items = [...prev, ...newVideos];
      return items;
    });
  };

  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 90 });

  const _onViewableItemsChanged = useRef((items: any) => {
    if (Object.keys(childVideoRefs).length) {
      const changed = items.changed;
      changed.forEach((item: any) => {
        const video = childVideoRefs[item.key].current;
        if (video) {
          if (item.isViewable) {
            setTimeout(() => video.playAsync(), 600);
          } else {
            video.pauseAsync();
          }
        }
      });
    }
  });

  return (
    <FlatList
      style={styles.list}
      data={videos}
      snapToAlignment="center"
      renderItem={({ item }) => (
        <ReelVideo uri={item.uri} handleRef={handleRef} id={item.id} />
      )}
      keyExtractor={(item) => item.id}
      pagingEnabled
      viewabilityConfig={viewConfigRef.current}
      onViewableItemsChanged={_onViewableItemsChanged.current}
      decelerationRate="fast"
      windowSize={10}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      getItemLayout={(_data, index) => ({
        length: Dimensions.get("window").height,
        offset: Dimensions.get("window").height * index,
        index,
      })}
      removeClippedSubviews
      onEndReached={loadVideos}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: "black",
  },
});

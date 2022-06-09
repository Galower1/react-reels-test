import { Video } from "expo-av";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";
import { ReelVideo } from "./ReelVideo";

const data = [
  {
    id: "4321",
    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "4324234c23432c",
    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "44c234c234c23321",
    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "4324c324c234c2365vc45g1",
    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "43rgvgvdfg21",
    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
  {
    id: "43dfgvdfgvsgn21",
    uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  },
];

export interface VideoRefKeys {
  [id: string]: React.MutableRefObject<Video | null>;
}

export const Reel: React.FC = () => {
  const [childVideos, setChildVideos] = useState<VideoRefKeys>({});

  const handleRef = (ref: VideoRefKeys) => {
    setChildVideos((prev) => {
      Object.assign(prev, ref);
      return prev;
    });
  };

  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 90 });

  const _onViewableItemsChanged = useRef((items: any) => {
    if (Object.keys(childVideos).length) {
      const changed = items.changed;
      changed.forEach((item: any) => {
        const video = childVideos[item.key].current;
        if (video) {
          if (item.isViewable) {
            video.playAsync();
          } else {
            video.pauseAsync();
          }
        }
      });
    }
  });

  return (
    <FlatList
      data={data}
      snapToAlignment="center"
      renderItem={({ item }) => (
        <ReelVideo uri={item.uri} handleRef={handleRef} id={item.id} />
      )}
      keyExtractor={(item) => item.id}
      pagingEnabled
      viewabilityConfig={viewConfigRef.current}
      onViewableItemsChanged={_onViewableItemsChanged.current}
      decelerationRate={0.5}
      windowSize={5}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      getItemLayout={(_data, index) => ({
        length: Dimensions.get("window").height,
        offset: Dimensions.get("window").height * index,
        index,
      })}
      removeClippedSubviews
    />
  );
};

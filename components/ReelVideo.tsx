import React, { useEffect, useRef, useState } from "react";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import { Dimensions, StyleSheet } from "react-native";
import { VideoProps } from "./Reel";

const [width, height] = [
  Dimensions.get("window").width,
  Dimensions.get("window").height,
];

export const ReelVideo: React.FC<VideoProps> = ({
  id,
  uri,
  handleRef,
}: VideoProps) => {
  const [status, setStatus] = useState<
    AVPlaybackStatusSuccess | AVPlaybackStatus
  >();
  const video = useRef<Video | null>(null);

  useEffect(() => {
    if (handleRef) {
      handleRef({ [id]: video });
    }

    return () => {
      video.current?.unloadAsync();
    };
  }, []);

  return (
    <Video
      style={styles.video}
      ref={video}
      source={{
        uri,
      }}
      useNativeControls
      resizeMode={ResizeMode.CONTAIN}
      isLooping
      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width,
    height,
    backgroundColor: "black",
  },
});

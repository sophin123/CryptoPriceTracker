import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";

export default function ListItem({
  name,
  symbol,
  currentPrice,
  priceChangePercentage7d,
  logoUrl,
}) {
  return (
    <TouchableOpacity>
      <View style={styles.itemWrapper}>
        <View style={styles.leftWrapper}>
          <Image
            source={{
              uri: logoUrl,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{symbol}</Text>
        </View>

        <View style={styles.rightWrapper}>
          <Text style={styles.title}>{currentPrice}</Text>
          <Text style={[styles.subTitle, { color: "red" }]}>
            {priceChangePercentage7d}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleWrapper: {
    position: "absolute",
    left: 80,
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#A9ABB1",
  },

  image: {
    width: 48,
    height: 48,
  },
  rightWrapper: {
    alignItems: "flex-end",
  },
});

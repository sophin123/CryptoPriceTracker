import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import CurrencyFormat from "./CurrencyFormat";

export default function Chart({
  currentPrice,
  logoUrl,
  name,
  priceChangePercentage7d,
  symbol,
}) {
  return (
    <View style={styles.chartWrapper}>
      <View style={styles.titleWrapper}>
        <View style={styles.upperTitles}>
          <View style={styles.upperLeftTitle}>
            <Image source={{ uri: logoUrl }} style={styles.image} />
            <Text style={styles.subtitle}>
              {name} ({symbol.toUpperCase()})
            </Text>
          </View>
          <Text style={styles.subtitle}>7d</Text>
        </View>
        <View style={styles.lowerTitle}>
          <Text style={styles.boldTitle}>{CurrencyFormat(currentPrice)}</Text>
          <Text
            style={[
              styles.title,
              { color: priceChangePercentage7d < 0 ? "red" : "green" },
            ]}
          >
            {priceChangePercentage7d.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartWrapper: {
    margin: 16,
  },
  titleWrapper: {},
  upperTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#a9abb1",
  },
  lowerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
  },
});

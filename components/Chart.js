import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

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
              {name} ({symbol})
            </Text>
          </View>

          <View style={styles.lowerTitle}>
            <Text>
              ${currentPrice.toLocaleString("en-US", { currency: "USD" })}
            </Text>
            <Text>{priceChangePercentage7d.toFixed(2)}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartWrapper: {},
});

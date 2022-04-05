import React, { useRef, useMemo, useState, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
} from "react-native";
import ListItem from "./components/ListItem";

import { SAMPLE_DATA } from "./assets/data";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Chart from "./components/Chart";

const ListHeader = () => (
  <>
    <View style={styles.titleWraper}>
      <Text style={styles.largeTitle}>Markets</Text>
    </View>
    <View style={styles.divider}></View>
  </>
);

export default function App() {
  const bottomSheetModalRef = useRef();

  const [selectedCoinData, setSelectedCoinData] = useState(null);

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const openModal = (item) => {
    setSelectedCoinData(item);
    bottomSheetModalRef.current?.present();
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={SAMPLE_DATA}
            renderItem={({ item }) => (
              <ListItem
                name={item.name}
                symbol={item.symbol}
                currentPrice={item.current_price}
                priceChangePercentage7d={
                  item.price_change_percentage_7d_in_currency
                }
                logoUrl={item.image}
                onPress={() => openModal(item)}
              />
            )}
            ListHeaderComponent={<ListHeader />}
          />

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            style={styles.modalView}
          >
            {selectedCoinData ? (
              <Chart
                currentPrice={selectedCoinData.current_price}
                logoUrl={selectedCoinData.image}
                name={selectedCoinData.name}
                priceChangePercentage7d={
                  selectedCoinData.price_change_percentage_7d_in_currency
                }
                symbol={selectedCoinData.symbol}
                sparkline={selectedCoinData.sparkline_in_7d.price}
              />
            ) : (
              <View>
                <Text>Chart Unavailable</Text>
              </View>
            )}
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleWraper: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginTop: 16,
  },
  modalView: {
    margin: 5,
    backgroundColor: "black",
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  textStyle: {
    fontSize: 30,
    padding: 10,
  },
  contentContainer: {
    flex: 1,
  },
  bottomSheet: {
    elevation: 9,
  },
});

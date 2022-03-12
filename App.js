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
import BottomSheet from "./components/BottomSheet";
import Testing from "./Screens/Testing";

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

  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
                onPress={() => handlePresentModalPress()}
              />
            )}
            ListHeaderComponent={<ListHeader />}
          />

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
          >
            <View style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
            </View>
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
    paddingHorizontal: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginTop: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    alignItems: "center",
  },
});

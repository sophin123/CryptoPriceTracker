import { StatusBar } from "expo-status-bar";
import React, { useRef, useMemo, useState } from "react";

import { Button, LogBox, Modal, Alert } from "react-native";

import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import ListItem from "./components/ListItem";

import { SAMPLE_DATA } from "./assets/data";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const ListHeader = () => (
  <>
    <View style={styles.titleWraper}>
      <Text style={styles.largeTitle}>Markets</Text>
    </View>
    <View style={styles.divider}></View>
  </>
);

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["50%"]);

  const handleModal = () => {
    bottomSheetModalRef.current.present();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: 0,
            height: "50%",
            width: "100%",
            backgroundColor: "blue",
          }}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
            onPress={() => setModalVisible(true)}
          />
        )}
        ListHeaderComponent={<ListHeader />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS == "android" ? 35 : 0,
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
});

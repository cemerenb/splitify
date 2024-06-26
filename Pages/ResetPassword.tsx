import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { RootStackNavigatorParamsList } from "../App";
import { MaxSpacer } from "../Utils/Spacers";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import validator from "validator";
import { ThemeContext } from "../Theme/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import i18n from "../Language/i18n";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const { theme } = useContext(ThemeContext);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigation =
    useNavigation<StackNavigationProp<RootStackNavigatorParamsList>>();
  const handleResetPassword = async () => {
    await sendPasswordResetEmail(FIREBASE_AUTH, email)
      .then(() => {
        setProcessing(false);
        setModalVisible2(true);
      })
      .catch((error: any) => {
        setProcessing(false);
        setErrorMessage(error.message);
        setModalVisible(true);
        console.log(error.message);
      });
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme.background,
        flex: 1,
        paddingHorizontal: 20,
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(10,10,10,0.6)",
            flex: 1,
            height: Dimensions.get("window").height,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: theme.primary,
              width: "80%",
              paddingTop: 20,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: theme.text, fontSize: 18, paddingBottom: 20 }}
            >
              {i18n.emailsent2}
            </Text>
            <Text
              style={{
                color: theme.text,
                fontSize: 14,
                paddingBottom: 20,
                paddingHorizontal: 10,
              }}
            >
              {i18n.forgotpassemail}
            </Text>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.replace("Login");
                  setModalVisible2(false);
                }}
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: theme.shadow,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: theme.text, fontSize: 18 }}>
                  {i18n.okay}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(10,10,10,0.6)",
            flex: 1,
            height: Dimensions.get("window").height,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: theme.primary,
              width: "80%",
              paddingTop: 50,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{ color: theme.text, fontSize: 16, paddingBottom: 40 }}
            >
              {errorMessage}
            </Text>
            <View style={{ width: "100%", flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  width: "100%",
                  height: 50,
                  backgroundColor: theme.shadow,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: theme.text, fontSize: 18 }}>
                  {i18n.close}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ paddingTop: Dimensions.get("window").height / 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Ionicons
                name="chevron-back-outline"
                size={30}
                color={theme.text}
              ></Ionicons>
              <Text style={{ fontSize: 18, color: theme.text }}>
                {i18n.back}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: Dimensions.get("window").height / 10 }}></View>

        <View
          style={{
            justifyContent: "space-between",
            flex: 1,
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flex: 1, width: "100%" }}>
            <Text
              style={{ color: theme.text, fontSize: 50, fontWeight: "300" }}
            >
              {i18n.resetpass}
            </Text>
            <Text
              style={{ color: theme.text, fontWeight: "200", width: "70%" }}
            >
              {i18n.resetpasssubtitle}
            </Text>
          </View>
          <View style={{ height: Dimensions.get("window").height / 10 }}></View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "column",
              height: Dimensions.get("window").height / 3,
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={[styles.inputStyle, { backgroundColor: theme.primary }]}
              >
                <TextInput
                  style={{
                    flex: 1,
                    color: theme.text,
                    backgroundColor: theme.primary,
                    height: Dimensions.get("window").height / 15,
                    paddingVertical: 10,
                    paddingRight: 10,
                    fontSize: Dimensions.get("window").width / 24,
                  }}
                  keyboardType="email-address"
                  placeholder="Email"
                  placeholderTextColor={theme.text}
                  onChangeText={setEmail}
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  value={email}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    this.secondTextInput.focus();
                  }}
                />
              </View>
            </View>

            <View style={[styles.button, { backgroundColor: theme.button }]}>
              <TouchableOpacity
                onPress={() => {
                  setProcessing(true);
                  if (email.length < 1) {
                    setErrorMessage("Email can't be empty");
                    setModalVisible(true);
                  }
                  if (email.length > 0 && !validator.isEmail(email)) {
                    setErrorMessage("Email is bad formatted");
                    setModalVisible(true);
                  }
                  if (email.length > 0 && validator.isEmail(email)) {
                    handleResetPassword();
                  }
                }}
                style={styles.button}
              >
                {!processing ? (
                  <Text
                    style={{
                      fontSize: Dimensions.get("window").width / 24,
                      color: "white",
                    }}
                  >
                    {i18n.sendemail}
                  </Text>
                ) : (
                  <ActivityIndicator
                    color={theme.text}
                    size={"small"}
                  ></ActivityIndicator>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: Dimensions.get("window").height / 10 }}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height / 15,
    borderRadius: 10,
  },
  inputStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3f3",
    height: Dimensions.get("window").height / 15,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
});

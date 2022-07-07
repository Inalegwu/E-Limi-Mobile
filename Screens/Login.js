import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Input from "../Components/Input";
import * as API from "../data/remote/userApiCalls";
import { NetworkContext } from "../Components/ContextProvider";

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [fetchedEmail, setEmail] = useState();
  const [fetchedPassword, setPassword] = useState();

  const data = React.useContext(NetworkContext);

  const submitPassword = (password) => {
    setPassword(password);
  };
  const submitEmail = (email) => {
    setEmail(email);
  };
  const authenticate = () => {
    if (fetchedEmail === undefined && fetchedPassword === undefined) {
      alert("Cant Login without an Email or Password");
    } else {
      API.login(fetchedEmail, fetchedPassword)
        .then((data) => {
          if (data.data.validity == 1) {
            navigation.navigate("Home", { data: data.data });
          } else {
            alert("Invalid Username or Password");
          }
        })
        .catch((data, error) => {
          alert(error);
          console.log(data);
        });
    }
  };
  return (
    <NetworkContext.Provider value={data}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View style={tw`p-9`}>
            <View style={tw`mt-1 w-100`}>
              <TouchableOpacity
                style={tw`p-1 mt-4`}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Feather name="arrow-left" size={20} style={tw`text-red-800`} />
              </TouchableOpacity>
            </View>
            <View>
              <Image
                style={[tw`h-40 w-80 mt-3`, styles.image]}
                source={require("../assets/images/3.png")}
              />
            </View>
            <Text style={tw`w-50 font-bold text-4xl mt-2`}>Welcome Back</Text>
          </View>
          <View style={tw`p-3 m-2`}>
            <Input
              style={tw`p-4 bg-gray-200 rounded-xl`}
              placeholder="Email"
              autoFocus={true}
              submit={submitEmail}
            />
            <Input
              style={tw`p-4 bg-gray-200 mt-3 rounded-xl`}
              placeholder="Password"
              secureTextEntry={true}
              submit={submitPassword}
            />
            <TouchableOpacity
              style={tw`p-3`}
              onPress={() => {
                authenticate();
              }}
            >
              <Text style={tw`text-red-800 mt-1`}>Forgot Password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-4 mt-3 rounded-xl bg-red-800 items-center content-center`}
              onPress={() => {
                authenticate();
              }}
            >
              <Text style={[tw`text-lg font-bold`, { color: "white" }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          {/* Login With Container */}
          <View
            style={tw`flex items-center content-center justify-evenly w-80 flex-row p-2 ml-4 mr-4`}
          >
            <TouchableOpacity
              style={tw`p-3 h-15 w-15 items-center content-center shadow-md rounded-full bg-gray-200`}
            >
              <FontAwesome name="google" size={20} style={tw`mt-2`} />
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-3 h-15 w-15 shadow-md items-center content-center rounded-full bg-gray-200`}
            >
              <FontAwesome name="facebook" size={20} style={tw`mt-2`} />
            </TouchableOpacity>
          </View>
          {/* Gutter */}
          <View style={tw`flex ml-20 flex-row p-5 items-center content-center`}>
            <Text>Don't have an account ?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateAccount");
              }}
            >
              <Text style={[tw`ml-2`, { color: "#8D161A" }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {console.log(data)}
      </KeyboardAvoidingView>
    </NetworkContext.Provider>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});

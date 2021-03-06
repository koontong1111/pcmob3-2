import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SQLite from "expo-sqlite";
import NotesStack from "./screens/NotesStack";
import AddScreen from "./screens/AddScreen";

const db = SQLite.openDatabase("notes.db");

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator mode="modal" headerMode="none">
       <Stack.Screen
         name="Notes Stack"
         component={NotesStack}
         options={{ headerShown: false }}
       />
       <Stack.Screen name="Add Note" component={AddScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}











// import { NavigationContainer } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
// import React, { useEffect, useState } from "react";
// import { Entypo } from "@expo/vector-icons";
// import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
// import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
// import * as SQLite from "expo-sqlite";

// const db = SQLite.openDatabase("notes.db");

// function NotesScreen({ navigation }) {
//   const [notes, setNotes] = useState([
//     { title: "Walk the cat", done: false, id: "0" },
//     { title: "Feed the elephant", done: false, id: "1" },
//   ]);
 
//   useEffect(() => {
//     navigation.setOptions({
//       headerRight:() => (
//         <TouchableOpacity onPress={addNote}>
//           <Entypo
//           name="new-message"
//           size={24}
//           color="black"
//           style={{ marginRight: 20}}
//           />
//           </TouchableOpacity>
//       ),
//     });
//   });

//   function addNote() {
//     let newNote = {
//       title: "Sample new note",
//       done: false,
//       id: notes.length.toString(),
//     };
//     setNotes([...notes, newNote]);
//   }
 
//   function renderItem({ item }) {
//     return (
//       <View
//         style={{
//           padding: 10,
//           paddingTop: 20,
//           paddingBottom: 20,
//           borderBottomColor: "#ccc",
//           borderBottomWidth: 1,
//         }}
//       >
//         <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
//       </View>
//     );
//   }
 
//   return (
//     <View style={styles.container}>
//       <FlatList
//         style={{ width: "100%" }}
//         data={notes}
//         renderItem={renderItem}
//       />
//     </View>
//   );
//  }
 

// const Stack = createStackNavigator();

// export default function App() {
//  return (
//    <NavigationContainer>
//      <Stack.Navigator>
//        <Stack.Screen
//          name="Notes"
//          component={NotesScreen}
//          options={{
//            headerTitle: "Notes App",
//            headerTitleStyle: {
//              fontWeight: "bold",
//              fontSize: 30,
//            },
//            headerStyle: {
//              height: 120,
//              backgroundColor: "yellow",
//              borderBottomColor: "#ccc",
//              borderBottomWidth: 1,
//            },
//          }}
//        />
//      </Stack.Navigator>
//    </NavigationContainer>
//  );
// }

// const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: "#ffc",
//    alignItems: "center",
//    justifyContent: "center",
//  },
// });

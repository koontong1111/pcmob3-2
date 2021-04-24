import React, { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import {
 StyleSheet,
 Text,
 View,
 FlatList,
 TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from '@expo/vector-icons';
import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("notes.db");
console.log(FileSystem.documentDirectory);

export default function NotesScreen({ navigation, route }) {
 const [notes, setNotes] = useState([]);

 function refreshNotes() {
     db.transaction((tx) => {
         tx.executeSql(
             "SELECT * FROM notes",
             null,
             (txObj, { rows: { _array } }) =>{ 
                 console.log(_array)
                return setNotes(_array)},

             (txObj, error) => console.log("Error", error)
         );
     });
 }
 
 useEffect(() => {
     db.transaction((tx) => {
         tx.executeSql(
             `CREATE TABLE IF NOT EXISTS notes
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                done INT);`
         );
     },
     null,
     refreshNotes
     );
 }, []);

 useEffect(() => {
   navigation.setOptions({
     headerRight: () => (
       <TouchableOpacity onPress={addNote}>
         <Entypo
           name="new-message"
           size={24}
           color="black"
           style={{ marginRight: 20 }}
         />
       </TouchableOpacity>
     ),
   });
 });

 useEffect(() => {
    if (route.params?.text) {
      db.transaction(
          (tx) => {
        tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
          route.params.text,
        ]);
      },
      null,
      refreshNotes);
 
    //   const newNote = {
    //     title: route.params.text,
    //     done: false,
    //     id: notes.length.toString(),
    //   };
    //   setNotes([...notes, newNote]);
    }
  }, [route.params?.text]);

 function addNote() {
   navigation.navigate("Add Note");
 }

 function deleteNote(id) {
     console.log("Deleting " + id);
     db.transaction(
         (tx) => {
             tx.executeSql(`DELETE FROM notes WHERE id=${id}`);
         },
         null,
         refreshNotes
     );
 }

 function renderItem({ item }) {
   return (
     <View
       style={{
         padding: 10,
         paddingTop: 20,
         paddingBottom: 20,
         borderBottomColor: "#ccc",
         borderBottomWidth: 1,
       }}
     >
       <Text style={{ textAlign: "left", fontSize: 16 }}>{item.title}</Text>
       <TouchableOpacity onPress={() => deleteNote(item.id)}>
            <EvilIcons name="trash" size={24} color="red" style={{textAlign: 'right'}}/>
       </TouchableOpacity>
     </View>
   );
 }

 return (
   <View style={styles.container}>
     <FlatList
       style={{ width: "100%" }}
       data={notes}
       renderItem={renderItem}
     />
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#ffc",
   alignItems: "center",
   justifyContent: "center",
 },
});

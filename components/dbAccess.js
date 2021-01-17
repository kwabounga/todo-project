
import React, { useState } from "react";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("todo.db");
export const addItem = (text) => { 
  return new Promise((resolve, reject) => {
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (done, value) values (0, ?)", [text]);
        tx.executeSql("select * from items", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      ()=>{reject()},
      ()=>{resolve()},
    );   
  });   
    
  };

  // update db item
  export const updateItem = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
        },
        ()=>{reject()},
        ()=>{resolve()},
        
      );      
    });
    
  };

  export const archivateItem = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
        },
        ()=>{reject()},
        ()=>{resolve()},
      );      
    });    
  };
  /*function maFonctionAsynchrone(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }*/
  export const reactivateItem = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(`update items set done = 0 where id = ?;`, [id]);
        },
        ()=>{reject()},
        ()=>{resolve()},
      );      
    });    
  };
  // delete db item
  export const deleteItem = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(
        (tx) => {
          tx.executeSql(`delete from items where id = ?;`, [id]);
        },
        ()=>{reject()},
        ()=>{resolve()},
      );      
    });
    
  };
  //TODO : PROMISE OR AWAIT ASYNC
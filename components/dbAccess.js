// TODO: cleaning
import * as SQLite from "expo-sqlite";
export const db = SQLite.openDatabase("todo.db");

// create table
export const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists items (id integer primary key not null, done int, value text);"
        );
      },
      () => {
        reject();
      },
      () => {
        resolve();
      }
    );
  });
};

// select all db items
export const selectAllItems = (doneHeading) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from items where done = ?;`,
        [doneHeading ? 1 : 0],
        (_, { rows: { _array } }) => {
          resolve(_array);
        },
        () => {
          reject();
        }
      );
    });
  });
};

// adding item in db
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
      () => {
        reject();
      },
      () => {
        resolve();
      }
    );
  });
};

// update db item [ useless? ]
export const updateItem = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
      },
      () => {
        reject();
      },
      () => {
        resolve();
      }
    );
  });
};

// archivate db item
export const archivateItem = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`update items set done = 1 where id = ?;`, [id]);
      },
      () => {
        reject();
      },
      () => {
        resolve();
      }
    );
  });
};

// reactivating db item
export const reactivateItem = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`update items set done = 0 where id = ?;`, [id]);
      },
      () => {
        reject();
      },
      () => {
        resolve();
      }
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
      () => {
        reject();
      },
      () => {
        resolve();
      }
    );
  });
};


import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("scanningApp");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT,company TEXT,user TEXT);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertUser = (company, user) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO Users (company,user) VALUES(?,?)",
        [company, user],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const updatetUser = (company, user,id) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE Users SET company=?,user=? WHERE ID=?",
          [company, user,id],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
  };
  export const getUser = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM USERS  LIMIT 1 ",
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
  };
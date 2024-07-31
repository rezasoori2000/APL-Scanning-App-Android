import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("scanningApp");

export const init = async() => {
  await db.execAsync(`CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT,company TEXT,user TEXT);`);
  return true;
};

export const insertUser = async(company, user) => {
  await db.execAsync(`INSERT INTO Users (company,user) VALUES('${company}','${user}')`);
  return true;
};

export const updatetUser = async(company, user,id) => {
  
try{
  await db.execAsync(`UPDATE Users SET company='${company}',user='${user}' WHERE ID=${id}`);
}catch(e){
  alert(e.message+ "  "+`UPDATE Users SET company=${company},user=${user} WHERE ID=${id}`);
}

  return true;
  };
  export const getUser = async() => {
    const firstRow = await db.getFirstAsync('SELECT * FROM USERS  LIMIT 1');
return {company:firstRow.company,user:firstRow.user,id:firstRow.id};
  };
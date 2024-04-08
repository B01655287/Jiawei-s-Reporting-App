import { useLiveQuery } from "dexie-react-hooks";
import Dexie from "dexie";

const db = new Dexie("db");
db.version(1).stores({
  list: "++id,title,desc,image,latitude,longitude,category,time,direction,tilt,address,username",
  user: "++id,name,password",
});

export function useRecords(category) {
  const table = db["list"];
  return useLiveQuery(
    () => table.where({ category }).toArray(),
    [category, table]
  );
}

export function addRecord(record) {
  return db.list.add(record);
}

export function deleteRecord(recordId) {
  return db.list.where({ id: Number(recordId) }).delete();
}

export function updateRecord(newData) {
  return db.list.where({ id: Number(newData.id) }).modify(newData);
}

export function getRecordById(recordId) {
  const table = db["list"];
  return table.where({ id: Number(recordId) }).first();
}

export async function register({ name, password }) {
  const existingUser = await db.user.where({ name }).first();
  if (existingUser) {
    return Promise.reject("The name has already been registered ( ´•︵•` )");
  }
  return db.user.add({ name: name, password: password });
}

export async function login({ name, password }) {
  const existingUser = await db.user.where({ name: name, password: password }).first();
  if (!existingUser) {
    return Promise.reject("Name or password incorrect o(〒﹏〒)o");
  } else {
    return existingUser
  }
}

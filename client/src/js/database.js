import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("updating database");

  const jDb = await openDB("jate", 1);
  const text = jDb.transaction("jate", "readwrite");
  const store = text.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("result", result);
};

//method that gets all the content from the database
export const getDb = async () => {
  console.log("get from database");

  const jDb = await openDB("jate", 1);
  const text = jDb.transaction("jate", "readonly");
  const store = text.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  console.log("result", result);
  return result?.value;
};

initdb();

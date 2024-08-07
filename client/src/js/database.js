import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (id, content) => {
  console.log('PUT to the database');
  // open db and the version
  const db = await openDB('jate', 1);
  // create transaction to read and write db
  const tx = db.transaction('jate', 'readwrite');
  // assign store called jate
  const store = tx.objectStore('jate');
  // update content on id
  const request = store.put({ id, content }); 
  const result = await request;
  console.log('Data saved to database', result); 
};


export const getDb = async () => {
  console.log('GET all from the database');
  // open db and the version
  const db = await openDB('jate', 1);
  // create transaction to read only 
  const tx = db.transaction('jate', 'readonly');
  // assign store called jate
  const store = tx.objectStore('jate');
  // retrieve all data
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();

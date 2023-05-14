// Using idb library for simpler IndexedDB usage
importScripts('https://unpkg.com/idb@5.0.4/build/iife/index-min.js');

self.addEventListener('activate', event => {
    event.waitUntil(insertTimestamps());
});

async function insertTimestamps() {
    const db = await idb.openDB('my-db', 1, {
        upgrade(db) {
            db.createObjectStore('timestamps');
        },
    });

    while (true) {
        let tx = db.transaction('timestamps', 'readwrite');
        let store = tx.objectStore('timestamps');
        let timestamp = new Date().toISOString();

        // Use timestamp as key and value for simplicity
        await store.put(timestamp, timestamp);

        // Sleep for 10 seconds before the next iteration
        await new Promise(resolve => setTimeout(resolve, 10000));
    }
}

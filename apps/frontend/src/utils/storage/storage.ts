class IDBStorage {
   private db: IDBDatabase | null = null;

   constructor(private dbName: string, private storeName: string) {
      this.openDatabase();
   }

   private openDatabase() {
      const idb = window.indexedDB;
      const openRequest = idb.open(this.dbName, 1);

      openRequest.onupgradeneeded = (event) => {
         const database = (event.target as IDBOpenDBRequest).result;
         if (!database.objectStoreNames.contains(this.storeName)) {
            database.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true });
         }
      };

      openRequest.onsuccess = () => {
         this.db = openRequest.result;
      };

      openRequest.onerror = () => {
         console.error("IndexedDB connection error");
      };
   }

   public add(item: any): void {
      if (!this.db) return;

      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      store.add(item);
   }

   public findById(id: number): Promise<any> {
      return new Promise((resolve, reject) => {
         if (!this.db) return reject("Database not initialized");

         const transaction = this.db.transaction(this.storeName, "readonly");
         const store = transaction.objectStore(this.storeName);
         const request = store.get(id);

         request.onsuccess = () => {
            resolve(request.result);
         };

         request.onerror = () => {
            reject("Failed to retrieve item");
         };
      });
   }

   public deleteByid(id: number): void {
      if (!this.db) return;

      const transaction = this.db.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);
      store.delete(id);
   }

   public find(filters: { [key: string]: any } = {}): Promise<any[]> {
      return new Promise((resolve, reject) => {
         if (!this.db) return reject("Database not initialized");

         const transaction = this.db.transaction(this.storeName, "readonly");
         const store = transaction.objectStore(this.storeName);
         const result: any[] = [];

         const request = store.openCursor();

         request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;

            if (cursor) {
               const item = cursor.value;
               let match = true;

               // Apply filters only if there are any provided
               if (filters && Object.keys(filters).length > 0) {
                  for (const [key, value] of Object.entries(filters)) {
                     if (item[key] !== value) {
                        match = false;
                        break;
                     }
                  }
               }

               if (match) {
                  result.push(item);
               }

               cursor.continue();
            } else {
               resolve(result); // Resolve with all matching items
            }
         };

         request.onerror = () => {
            reject("Failed to retrieve items");
         };
      });
   }
}

export const LocalDatabase = {
   messageCollection: new IDBStorage("app", "messages"),
   notificationCollection: new IDBStorage("app", "notifications"),
};

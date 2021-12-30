// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require("electron");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".
process.once("loaded", () => {
  contextBridge.exposeInMainWorld("versions", process.versions);
  contextBridge.exposeInMainWorld('electronAPI', {
    storeData: (value) => { 
      ipcRenderer.send('store-data',value);
     },
    getData: () => {
      return ipcRenderer.sendSync('get-data');
    },
    getFormKeyData: ({key}) => {
      return ipcRenderer.sendSync('get-form-key-data', {key});
    },
    deleteData: () => {
      ipcRenderer.send('delete-data');
      console.log('data deleted');
    }
  })
});
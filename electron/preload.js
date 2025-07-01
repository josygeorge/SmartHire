// preload.js
// Having a preload script allows you to expose specific APIs to the renderer process while keeping the main process secure.
// This won’t expose any Node.js features yet (which is safer), but it ensures Electron can still load this script during app startup without error.//
window.addEventListener('DOMContentLoaded', () => {
    console.log('Preload script loaded');
});

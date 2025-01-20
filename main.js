if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js') // 注册 Service Worker
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
}
(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function windowLoadHandler() {
      /*
        Import the url dynamically as we need liquid to get the full url for the service worker
       */
      const swUrl = $('#service-worker-helper').data('sw-url');

      navigator.serviceWorker.register(swUrl).then(function serviceWorkerRegistration(reg) {
        reg.onupdatefound = function () {
          const installingWorker = reg.installing;

          installingWorker.onstatechange = function serviceWorkerChangeState() {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  console.log('New or updated content is available.');
                } else {
                  console.log('Content is now available offline!');
                }
                break;

              case 'redundant':
                console.error('The installing service worker became redundant.');
                break;
            }
          };
        };
      }).catch(function serviceWorkerError(e) {
        console.error('Error during service worker registration:', e);
      });
    });
  }
})();

// Modernized Service Worker Registration for production

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(window.location.hostname)
);

const register = () => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);

    if (publicUrl.origin !== window.location.origin) return;

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // On localhost, check if the service worker exists
        checkValidServiceWorker(swUrl);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service worker. ' +
            'To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        // Not localhost – just register the service worker
        registerValidSW(swUrl);
      }
    });
  }
};

const registerValidSW = async (swUrl) => {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);

    registration.onupdatefound = () => {
      const installingWorker = registration.installing;

      installingWorker?.addEventListener('statechange', () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            console.log('New content is available; please refresh.');
          } else {
            console.log('Content is cached for offline use.');
          }
        }
      });
    };
  } catch (error) {
    console.error('Error during service worker registration:', error);
  }
};

const checkValidServiceWorker = async (swUrl) => {
  try {
    const response = await fetch(swUrl);

    const isNotFound = response.status === 404;
    const isNotJS = !response.headers.get('content-type')?.includes('javascript');

    if (isNotFound || isNotJS) {
      const registration = await navigator.serviceWorker.ready;
      await registration.unregister();
      window.location.reload();
    } else {
      registerValidSW(swUrl);
    }
  } catch (error) {
    console.log('No internet connection found. App is running in offline mode.');
  }
};

const unregister = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
  }
};

export default register;
export { unregister };

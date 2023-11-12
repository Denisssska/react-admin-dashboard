import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';

import store, { persistor } from './store/redux-store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <App />
    </PersistGate>
  </Provider>
);

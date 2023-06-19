import LoadingAuth from "components/Loading/LoadingAuth";
import React, { Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "reportWebVitals";
import storeProvider from "store/store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={storeProvider.store}>
      <PersistGate loading={null} persistor={storeProvider.persistor}>
      <Suspense fallback={<LoadingAuth />}>
          <CookiesProvider>
              <App />
            </CookiesProvider>
        </Suspense>
      </PersistGate>
    </Provider>
);
reportWebVitals();



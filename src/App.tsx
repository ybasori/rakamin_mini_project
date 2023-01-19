import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/lib/persistStore";
import { store } from "./store";
import ProductRoadmap from "./components/pages/ProductRoadmap/ProductRoadmap";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <ProductRoadmap />
      </PersistGate>
    </Provider>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Redux/store.js";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="91054784925-al8o74sjvo5lvj7qn8lp92n8f8a06t4k.apps.googleusercontent.com">
      
        <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
          </QueryClientProvider>
        </React.StrictMode>
        
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);

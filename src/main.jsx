import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { QueryPrvider } from "./react-query/QueryPrvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    
    <BrowserRouter>
    <QueryPrvider>
        <AuthProvider>
            <App/>
        </AuthProvider>
     </QueryPrvider>
    </BrowserRouter>
);
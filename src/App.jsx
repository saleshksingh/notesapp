import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import amplifyConfig from "../amplify_outputs.json"; // or aws-exports.js

Amplify.configure(amplifyConfig);

function App({ signOut, user }) {
  return (
    <div>
      <h1>Hello, {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      {/* Additional UI flows (notes, images) go here */}
    </div>
  );
}

export default function AppWithAuth() {
  return <Authenticator><App /></Authenticator>;
}

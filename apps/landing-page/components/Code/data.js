export const javascript = `
  const currentClients = 1000;
  const newClients = 50;
  
  function sum(a: number, b: number) {
    return a + b;
  }
  
  const numberOfClients = sum(currentClients, newClients);
  
  if (numberOfClients > 3000) {
    alert("Party Time");
  }
 `;

export const react = `
  import React, { useState } from "react";

  const currentClients = 1000;
  const newClients = 50;

  function sum(a, b) {
    return a + b;
  }

  const numberOfClients = sum(currentClients, newClients);

  function App() {
    const [alertMessage, setAlertMessage] = useState("");

    if (numberOfClients > 3000) {
      setAlertMessage("Party Time");
    }

    return alertMessage;
  }

  export default App;
  
`;

export const vue = `
  const currentClients = 1000;
  const newClients = 50;

  function sum(a, b) {
    return a + b;
  }

  const numberOfClients = sum(currentClients, newClients);

  export default {
    data() {
      return {
        alertMessage: ""
      };
    },
    created() {
      if (numberOfClients > 3000) {
        this.alertMessage = "Party Time";
      }
    }
  };
  
`;

export const jquery = `
  const currentClients = 1000;
  const newClients = 50;

  function sum(a, b) {
    return a + b;
  }

  const numberOfClients = sum(currentClients, newClients);

  $(document).ready(function() {
    if (numberOfClients > 3000) {
      $("#app p").text("Party Time");
    }
  });
  
`;

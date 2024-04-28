export const data = [
  {
    id: "html",
    i18nKey: "setup.card.library.html",
  },
  {
    id: "javascript",
    i18nKey: "setup.card.library.javascript",
  },
  {
    id: "react",
    i18nKey: "setup.card.library.react",
  },
  {
    id: "vue",
    i18nKey: "setup.card.library.vue",
  },
  {
    id: "rest",
    i18nKey: "setup.card.library.rest",
  },
];

export const getHtmlDemoCode = (url: string) => `
<!-- modify this form HTML as you wish -->
<form action="${url}" method="POST" enctype="multipart/form-data">
  <div>
    <label for="name">Name:</label>
    <!-- name each of your inputs as you wish -->
    <input type="text" id="name" name="name" required autocomplete="name" aria-label="Name"
      placeholder="Enter your name">
  </div>

  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required autocomplete="email" aria-label="Email"
      placeholder="Enter your email">
  </div>

  <div>
    <label for="message">Message:</label>
    <textarea id="message" name="message" required aria-label="Message" placeholder="Enter your message"></textarea>
  </div>

  <!-- your other form fields go here -->
  <button type="submit">Submit</button>
</form>
 `;

export const getJavascriptDemoCode = (url: string) => `
try {
  const res = await fetch("${url}?mode=rest", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "John Doe", message: "Hello World" }),
  });

  const data = await res.json();

  if (data.code === 200) {
    console.log("Form submitted successfully");
  }
} catch (error) {
  console.log("Error submitting form", error);
}
`;

export const getReactDemoCode = (url: string) => `
import React, { useState } from "react";

const FormComponent = () => {
  // You can also use rect-hook-form or formik for form handling
  // check out the docs for more info https://react-hook-form.com/
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onHandleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // You can also use axios or any other library to make the request
    // You can also use async await to make the request
    fetch("${url}?mode=rest", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          console.log("Form submitted successfully");
        }
      })
      .catch((error) => {
        console.log("Error submitting form", error);
      });
  };

  return (
    <form onSubmit={(e) => onHandleSubmit(e)}>
      <div>
        <label htmlFor="name">Name:</label>
        {/*  <!-- name each of your inputs as you wish --> */}
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          aria-label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          aria-label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          required
          aria-label="Message"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      {/*  <!-- your other form fields go here --> */}

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
 `;

export const getVueDemoCode = (url: string) => `
<template>
  <form @submit.prevent="onHandleSubmit">
    <div>
      <label for="name">Name</label>
      <input type="text" v-model="form.name" id="name" placeholder="Enter your name" name="name" required
        autocomplete="name" aria-label="Name" />
    </div>

    <div>
      <label for="email">Email</label>
      <input type="email" v-model="form.email" id="email" name="email" required autocomplete="email" aria-label="Email"
        placeholder="Enter your email" />
    </div>

    <div>
      <label for="message">Message</label>
      <textarea v-model="form.message" id="message" name="message" required aria-label="Message"
        placeholder="Enter your message"></textarea>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const form = reactive({
      name: '',
      email: '',
      message: ''
    });

    const onHandleSubmit = async () => {
      try {
        const res = await fetch("${url}?mode=rest", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (data.code === 200) {
          console.log("Form submitted successfully");
        }
      } catch (error) {
        console.log("Error submitting form", error);
      }
    };

    return {
      ...toRefs(form),
      onHandleSubmit,
    };
  }
}
</script>
 `;

export const getRestDemoCode = (url: string) => `
curl -X POST \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe", "message": "Hello World"}' \\
  "${url}?mode=rest"
 `;

export const parseDescription = (description: string) => {
  const parts = description.split(/\[(.*?)\]/).filter(Boolean);

  return parts.map((part: string, index: number) => ({
    text: part.trim(),
    highlight: index % 2 === 1,
  }));
};

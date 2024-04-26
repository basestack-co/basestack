export const data = [
  {
    id: "html",
    text: "HTML",
  },
  {
    id: "javascript",
    text: "Javascript",
  },
  {
    id: "react",
    text: "React",
  },
  {
    id: "vue",
    text: "Vue",
  },
  {
    id: "rest",
    text: "Rest API",
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

To run the vanilla TypeScript Vite project, follow these steps:

1. **Install Dependencies**: Navigate to the project directory and install the dependencies using npm or yarn.

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Run the Development Server**: Start the development server.

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Open in Browser**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the result.

4. **Build for Production**: To create a production build, run:

   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Preview the Production Build**: To preview the production build locally, run:
   ```bash
   npm run preview
   # or
   yarn preview
   ```

Make sure you have Vite installed and configured in your `package.json` scripts. If not, you may need to add the following scripts to your `package.json`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

These instructions should help you get started with running and building your vanilla TypeScript Vite project.

## Create a Vite React App (Client) :

> Setup react app with Tailwind css and Vite :

> 1.  Create a React Vite Project

            npm create vite@latest otpless_react_client -- --template react
            cd otpless_react_node
            npm install
            npm run dev

> 2.  Install Tailwind CSS

            npm install -D tailwindcss postcss autoprefixer
            npx tailwindcss init -p

> 3.  Configure your template paths -> In tailwind.config.js

          /** @type {import('tailwindcss').Config} */
          export default {
          content: [
              "./index.html",
              "./src/**/*.{js,ts,jsx,tsx}",
          ],
          theme: {
              extend: {},
          },
          plugins: [],
          }

> 4.  Start Your build process :

            npm run dev

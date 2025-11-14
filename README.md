# Bailey's Aurora Watch

An elegant app to track the viewing probability of the Northern Lights (Aurora Borealis) in your selected area, powered by Gemini.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/egpennington/Bailey-s-Aurora-Watch)

## Features

-   **Real-time Aurora Forecast**: Get up-to-date viewing probability, Kp-index, and cloud cover information.
-   **Powered by Gemini**: Leverages Google's Gemini API for sophisticated meteorological and space weather data analysis.
-   **Geolocation Support**: Automatically use your current location with a single click.
-   **Manual Coordinate Input**: Enter latitude and longitude for any location worldwide.
-   **Data Visualization**: An intuitive gauge chart provides an at-a-glance look at your viewing chances.
-   **Responsive Design**: A beautiful and functional interface that works on all devices.

## How It Works

This project uses a "no-build" setup, relying on modern browser features like **import maps** to load React and other dependencies directly without needing Node.js, npm, or a bundler like Webpack/Vite.

The `process.env.API_KEY` is made available to the application via a small `env.js` script, which is generated during deployment on Netlify or created manually for local development.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   A modern web browser that supports import maps (e.g., Chrome, Firefox, Edge, Safari).
-   A simple local web server. Python's built-in server is a good option.
-   A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/egpennington/Bailey-s-Aurora-Watch.git
    cd Bailey-s-Aurora-Watch
    ```

2.  **Set up your API Key:**
    The application needs your Gemini API key to function. Create a new file named `env.js` in the root of the project and add the following code, replacing `'YOUR_API_KEY_HERE'` with your actual Gemini API key:

    ```javascript
    // env.js
    window.process = {
      env: {
        API_KEY: 'YOUR_API_KEY_HERE'
      }
    };
    ```
    
    > **Note:** This file contains sensitive data and should not be committed to version control. A `.gitignore` file is included to prevent this.

3.  **Run the local server:**
    From the project's root directory, start a local web server. If you have Python 3 installed, you can use:

    ```bash
    python3 -m http.server
    ```

4.  **View the application:**
    Open your browser and navigate to `http://localhost:8000`.

## Deployment on Netlify

This project is configured for easy deployment on Netlify.

1.  Fork this repository to your GitHub account.
2.  Log in to Netlify and click "Add new site" -> "Import an existing project".
3.  Connect your GitHub account and select your forked repository.
4.  Configure the build settings:
    -   **Build command**: `echo "window.process = { env: { API_KEY: '$API_KEY' } };" > env.js`
    -   **Publish directory**: Leave it as the root directory of your project.
5.  Add your Gemini API key as an environment variable:
    -   Go to **Site settings > Build & deploy > Environment**.
    -   Click "Edit variables" and add a new variable:
        -   **Key**: `API_KEY`
        -   **Value**: Paste your Gemini API key here.
6.  Click "Deploy site". Netlify will run the build command (which creates the `env.js` file) and deploy your application.

## Technology Stack

-   **Frontend**: React, TypeScript
-   **Styling**: Tailwind CSS
-   **AI Model**: Google Gemini API (`@google/genai`)
-   **Charts**: Recharts
-   **Deployment**: Netlify

---

## License

This project is licensed under the MIT License.

MIT License

Copyright (c) 2024 egpennington

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

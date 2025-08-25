Async Race

Async Race is a drag-racing game to see which car is fastest.
It is built with TypeScript, React 18, Redux Toolkit, and Vite.js.
SCSS, React-Aria, React-hook-form, Jest, ESLint, and Prettier are also used.
The project is a Single Page Application (SPA) with no page reloads.

Clone and run the backend:

git clone https://github.com/timurgain/async-race-api.git
cd async-race-api
npm install
npm start


Clone and run the frontend:

git clone https://github.com/timurgain/async-race.git
cd async-race
npm install
npm run dev

The app has two views: Garage and Winners.
Garage lets you create, update, delete, and color cars.
You can also generate 100 random cars at once.
Cars have start/stop engine buttons with animation.
A race button runs all cars on the page.
Reset returns cars to the starting line.
Winners view shows cars, wins, and best times.
You can sort winners by wins or time.
Pagination is implemented for both views.
All HTML is generated dynamically with JavaScript.
Code follows modular design, ESLint, and Prettier rules.
The UI is deployed and link included in README.
Node 14+ is required.
Enjoy racing your cars!
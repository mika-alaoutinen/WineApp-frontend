# WineApp-frontend
This is the frontend for [WineApp](https://github.com/mika-alaoutinen/WineApp), implemented with Vue.js and Vuetify. The application is hosted on [Heroku](https://maistissa.herokuapp.com/).

## About WineApp

**WineApp** is a web application for keeping wine tasting notes. It started out as a Word file that grew to an unmanageable size, thus sparking the creation of this project. WineApp was the first "real" web application I ever developed, and as such it's been in the works for a long time. I think the application is currently in a usable, if
unpolished state.

## Running the application...
The project can be run by using Docker or npm. In either case, you also need to have the backend Java application WineApp running.

## ...Run with Docker

Running the project with Docker is simple:
1. Clone project.
2. Move to project folder.
3. Run Docker compose.
4. Open browser and go to localhost:8081

On command line:
```
git clone git@github.com:mika-alaoutinen/WineApp-frontend.git
cd WineApp-frontend
docker-compose up
```

## ...Run without Docker
Running the project without Docker is also straightforward with npm:
1. Clone project.
2. Move to project folder.
3. Install packages with npm.
4. Run the application.
5. Open browser and go to localhost:8081

On command line:
```
git clone git@github.com:mika-alaoutinen/WineApp-frontend.git
cd WineApp-frontend
npm install
npm run serve
```

## Other available npm scripts
```
npm run build
npm run lint
npm run test
```

## Further development ideas
- [ ] Consider using Vuex store for state management.
- [ ] Implement HATEOAS navigation.
- [ ] Implement user profile management.
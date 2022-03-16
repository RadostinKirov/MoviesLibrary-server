# MoviesLibrary-server
- Express application starting by default on localhost:3030 
- The data collected from the front-end app is organized and stored on external DB (MongoDB)

## End points
  - /create (POST) -> receives "Id , Rating , Comment" info and creates an record in the DB. For DB _id is used the movie ID received in the request
  - /rating (GET) -> get all saved ratings 
  - /rating (POST) -> Create or if it is an existing record update the rating for that movie
  - /reviewById/:id (GET) -> get information for all saved movies (for both Rating and Comment )
  - /comment (POST) -> Create or if it is an existing record update the comment for that movie

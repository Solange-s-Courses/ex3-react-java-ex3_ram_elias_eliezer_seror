[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/YDg-_nm7)
## Authors
* Name: Ram Elias      Email: ramel@edu.hac.ac.il
* Name: Eliezer Seror  Email: eliezerse@edu.hac.ac.il

## Explanations

The game is called "Bulls and Cows" and the objective is to guess a 4-digit number combination. The digits can be in any order and cannot repeat. For each guess, the player receives feedback in the form of "bulls" and "cows". A "bull" indicates that a digit in the guess is in the correct position, while a "cow" indicates that a digit in the guess is in the wrong position. The player uses the feedback to refine their guesses and eventually guess the correct combination.

In the implementation, we use React and useState to manage the game's state. We generate a random 4-digit solution using a helper function and use state to manage the player's guesses, the game history, and the game status (whether the game is over or not). We also use useEffect to generate a new solution whenever the game is reset. The player can input their guess and receive feedback by clicking the "Go!" button. If the player correctly guesses the solution, the game is won and a new game can be started.

The game's high scores are managed by a Java servlet that communicates with the game server. When a player finishes a game and submit thier name, their score is sent to the servlet, which checks if the score is high enough to be added to the leaderboard. If it is, the servlet updates the leaderboard. The servlet sends the scores back to the game server.

## How to use this template
This is the template for a project where front-end and back-end are separated.
The front-end is a React application, the back-end is a Java Web application
including a Servlet for REST API endpoints.

### Create a run configuration for the Server
* In IntelliJ, go to Run->Edit Configurations
* Click on the + sign and select Tomcat Server -> Local
* In the Tomcat Server Settings, select your local installation of tomcat (you can download it from https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.45/bin/apache-tomcat-9.0.45.tar.gz)
* In the Deployment tab, select the java-react:war file to deploy (the war file in the target folder of your project), IntelliJ should automatically detect it and display a "Fix" button. Click on it.
* uncheck the "After launch: Open in browser" checkbox (we don't want to open the browser when we run the server, it's a REST API server)
* Click on the OK button


### initializing IntelliJ
In case you get into trouble with IntelliJ, you should close the project,
delete the .idea folder, re-open the project and follow the instructions above to
recreate a run configuration.

###  dependencies
The template depends on:
* your local installation of tomcat, this template uses
  tomcat 9.0.45 that can be downloaded from https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.45/bin/apache-tomcat-9.0.45.tar.gz.
  In order to point to your own installation of tomcat, edit configuration in IntelliJ change the application server.
* your local installation of nodejs, this template is based on nodejs v18.15.0 (npm 9.5.0). You can download it from https://nodejs.org/en/download.
* your local installation of java (select one SDK at: File->Project Structure->Platform SDK). You can add SDK from IntelliJ by cliking on  File->Project Structure->Platform Settings-> +).
  This template is based on version 19, you can also download it from https://jdk.java.net/19/).

###  source files
The template includes:
* a Java Web template with an empty Servlet to implement your server side REST API under the src/main/java folder
* a React template under the reac-client folder, with an initialized npm project.

## In order to run your exercise you:
* run the server side; with IntelliJ configuration at the upper right (created above)
* run the client side: open the terminal: `cd react-client`, `npm install`,  run with the command `npm start`

Then browse:
* your react client at http://localhost:3000
* your server will be available at http://localhost:8080/api/highscores (you have of course to implement the REST API).
  Note that you should never specify the host and port in your React code! (use 'api/' instead of 'http://localhost:8080/api/')


'use strict';

process.env.DEBUG = 'action-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

// the action name from the make_name Dialogflow intent
const NAME_ACTION ='make_name';

// the parameters that are parsed from the make_name intent
const COLOUR_ARGUMENT = 'colour';
const NUMBER_ARGUMENT = 'number';

exports.sillyNameMaker = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  // the function that generates the silly name
  makeName = app => {
      let number = app.getArgument(NUMBER_ARGUMENT);
      let colour = app.getArgument(COLOUR_ARGUMENT);
      app.tell('Alright your silly name is ' + colour + ' ' + number +
        '!I hope you like it. See you next time.');
  }

  //build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);

  app.handleRequest(actionMap);
});

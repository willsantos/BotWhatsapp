import express from 'express';
import contacts from './ContactsRoute.js';
import groups from './GroupsRoute.js'

const routes = (app, client) => {

  app.route('/api/v1/').get((req, res) => {
    res.status(200).json('Hello World');
  })


  app.use(
    express.json(),
    contacts(client),
    groups(client),

  )
}

export default routes;
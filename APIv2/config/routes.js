/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {
    view: 'homepage'
  },
  'GET /email-available/:email': 'AuthController.checkEmailAvailability',
  'GET /username-available/:username': 'AuthController.checkUsernameAvailability',
  'POST /login': 'AuthController.login',
  'GET /profile/:id': 'UserController.getProfilePicture',
  'GET /gallery-image/:id': 'UserController.getGalleryImage',
  'GET /user/count': 'UserController.countUsers',
  'GET /like/subscribe/:id': 'LikeController.subscribeAfterLike',
  'GET /like/get/:id': 'LikeController.likesGet',
  'GET /like/transfer/:id': 'LikeController.transferNewMatch',

  //likes
  'POST /like': 'LikeController.like',
  'GET /match-list/:page': 'MatchController.getMatchList',
  'GET /new-matches': 'MatchController.getNewMatches',
  'POST /send-message': 'ChatController.sendMessage',
  'GET /conversations/subscribe/:id': 'ChatController.subscribeForConversations',
  'GET /get-conversation-list': 'ChatController.getConversationList',
  'GET /remove-covversation-messages/:id': 'ChatController.removeConversation',
  'GET /read-messages/:id': 'ChatController.readMessages',
  'GET /password-reset/:email': 'AuthController.passwordReset',
  'GET /password-reset-confirm/:hash': 'AuthController.passwordResetConfirm',
  'GET /account-confirm/:id/:hash': 'AuthController.confirmAccount'
  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

};



module.exports = function(app) {
    const word = require('./../api/controllers/word')
    var auth = require('./../middleware/auth')
    app.route('/checkWord').post(auth,word.checkWord);
    app.route('/create').post(auth,word.saveWord);
    app.route('/getWord').get(auth,word.getWord);
    app.route('/update').put(auth,word.updateWord);
}
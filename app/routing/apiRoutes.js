var friendlist = require("../data/friends.js")

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------



    app.get('/api/friendlist', function(req, res) {

        res.json(friendlist);
    });



    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post('/api/newsurvey', function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body-parser middleware
        var newfriend = req.body;

        var friendmatch = [];
        console.log(newfriend);

        for (var i = 0; i < friendlist.length; i++) {
            var scoredifference = 0
            for (var k = 0; k < friendlist[i].answers.length; k++) {
                var diffence = Math.abs(friendlist[i].answers[k] - newfriend.answers[k]);
                scoredifference += diffence;

            }
            friendmatch.push({
                name: friendlist[i].name,
                picture: friendlist[i].picture,
                totalDiff: scoredifference,
            });

        }
        var maxScore = 50;
        for (var i = 0; i < friendmatch.length; i++) {
            if (friendmatch[i].totalDiff < maxScore) {
                maxScore = friendmatch[i].totalDiff;
            }
        }
        var pickedFriend = {};
        for (var i = 0; i < friendmatch.length; i++) {
            pickedFriend = friendmatch[i];
        }
        console.log(pickedFriend)
        res.json(pickedFriend);
    });




};
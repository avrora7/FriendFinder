var friendsArray = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsArray);
    });
    app.post("/api/friends", function (req, res) {
        console.log(req)
        var newFriend = req.body;

        function calcDistance(a, b) {
            var s = 0;
            for (var i = 0; i < a.scores.length; i++) {
                s += Math.abs(a.scores[i] - b.scores[i])
            }
            return s;
        }
        var bestFriend = null;
        var totalDifference = 1000000;
        friendsArray.forEach(function (nextElement) {
            var result = calcDistance(nextElement, newFriend);
            if (result < totalDifference) {
                totalDifference = result;
                bestFriend = nextElement;
            }
        });
        var soulmate = { name: bestFriend.name, photo: bestFriend.photo };
        res.json(soulmate);
    });
    app.post("/api/clear", function (req, res) {
        friends = [];
        res.json({ ok: true });
    });
};
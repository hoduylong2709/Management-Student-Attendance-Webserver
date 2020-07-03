const db = require("../config/config-firebase");

module.exports.teachDay = function(req, res) {
    const databaseRef = db.ref;
    databaseRef.on('value', function(snapshot) {
        const value = snapshot.val();
        const dates = Object.keys(value);
        dates.pop();
        
        res.render("home/teachDay", {
            dates: dates
        });
    });
    return;
};

module.exports.home = function(req, res) {
    res.render('home/home');
};

module.exports.indexPost = async function(req, res, next) {
    console.log(req.body);
    const databaseRef = db.ref;
    
    //   // Get a key for a new Post.
    //   databaseRef.push();
    
    //   // Write the new post's data simultaneously in the posts list and the user's post list.
    //   var updates = {};
    //   updates['/' + req.body.date] = updates;
    
    //   return databaseRef.update(updates);
    const databaseChild = databaseRef.child(req.body.date);
    await databaseChild.remove();

    res.redirect('/home/teachDay');
    return;
};

module.exports.indexPost1 = async function(req, res, next) {
    console.log(req.body);
    const databaseRef = db.ref;
    
    // Get a key for a new Post.
    databaseRef.push();
    
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/' + req.body.date] = {maSV: "0", status: "Empty", time: "Empty"};
    
    const result = await databaseRef.update(updates);
    console.log(result);

    res.redirect('/home');

    return;
};
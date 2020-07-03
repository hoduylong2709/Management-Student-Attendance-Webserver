const db = require("../config/config-firebase");

module.exports.index = function (req, res) {
    const dataRef = db.child("data");
    const date = req.params.date;
    const dataDateRef = db.child(date);

    let datas = new Array;
    let dataDates = new Array;

    dataPromise = dataRef.once("value")
        .then(snapshot => {
            datas = Array.from(snapshot.val());
            datas = datas.filter((item) => {
                return item;
            });
        });

    dataDatePromise = dataDateRef.once("value")
        .then(snapshot => {
            dataDates = snapshot.val();
        });

    Promise.all([dataPromise, dataDatePromise])
        .then(() => {
            let absents = datas.filter((item) => {
                let checkFlag = true;
                for (let sv in dataDates) {
                    if (dataDates[sv].maSV === item.maSV) {
                        checkFlag = false;
                    }
                }
                return checkFlag;
            });

            res.render("./users/attendance", {
                datas: datas,
                dataDates: dataDates,
                absents: absents
            });
        });
};

module.exports.indexPost3 = function(req, res, next) {
    const dataRef = db.child("data");
    //const date = req.body.dateSlect.substring(9);
    const date = req.body.dateSlect1;
    const dataDateRef = db.child(date);

    //const dateTeacher = new Date(`${date}T${req.body.dateSlect.substring(0,8)}`);
    const dateTeacher = new Date(`${date}T${req.body.dateSlect}`);
    let datas = new Array;
    let dataDates = new Array;

    dataPromise = dataRef.once("value")
        .then(snapshot => {
            datas = Array.from(snapshot.val());
            datas = datas.filter((item) => {
                return item;
            });
        });

    dataDatePromise = dataDateRef.once("value")
        .then(snapshot => {
            dataDates = snapshot.val();
        });

    Promise.all([dataPromise, dataDatePromise])
        .then(() => {
            let absents = datas.filter((item) => {
                let checkFlag = true;
                for (let sv in dataDates) {
                    if (dataDates[sv].maSV === item.maSV) {
                        checkFlag = false;
                    }
                }
                return checkFlag;
            });
            console.log(typeof dataDates)
            Object.keys(dataDates).forEach(item => {
                if (Date.parse(dateTeacher) >= Date.parse(new Date(`${date}T${dataDates[item].time}`))) {
                    dataDates[item].status = 'ontime';
                }
                else {
                    dataDates[item].status = 'late';
                }
            })

            res.render("./users/attendance", {
                datas: datas,
                dataDates: dataDates,
                absents: absents
            });
        });
}

module.exports.list = async function (req, res, next) {
    const dataRef = db.child("data");

    let datas = await dataRef.once("value")
    datas = datas.val();
    datas.forEach(function(item) {
        item.attendanceTimes = 0;
    });

    let dataDates = await db.once("value");
    dataDates = dataDates.val();
    const dataKeys = Object.keys(dataDates);
    dataKeys.pop();

    const dateAttendance = new Array;
    dataKeys.forEach(item => {
        if (dataDates[item].status !== "Empty") {
            const dateAttendanceItem = dataDates[item];
            const keys = Object.keys(dataDates[item]);
            keys.forEach(key => {
                dateAttendance.push(dateAttendanceItem[key]);
            })
        }
    });

    dateAttendance.forEach(date => {
        const attendance = datas.find(sv => {
            return sv.maSV == date.maSV
        });

        if (attendance) {
            ++attendance.attendanceTimes;
        }
    });

    res.render("./users/listStudent", {
        datas: datas,
        dataKeys: dataKeys
    })
}

module.exports.indexPost = async function(req, res, nex) {
    console.log(req.body);
    const databaseRef = db.ref;
    
    // Get a key for a new Post.
    databaseRef.push();
    
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/data/' + req.body.masv.substring(6)] = {lop: req.body.lopsv, maSV: req.body.masv, name: req.body.tensv};
    
    const result = await databaseRef.update(updates);
    console.log(result);

    res.redirect('/users/listStudent');

    return;
}

module.exports.indexPost1 = async function(req, res, nex) {
    const databaseRef = db.ref;
    const databaseChild = databaseRef.child("data").child(req.body.masvdelete.substring(6));
    await databaseChild.remove();

    // const dataRef = db.child("data");

    // let datas = new Array;

    // dataPromise = dataRef.once("value")
    //     .then(snapshot => {
    //         datas = Array.from(snapshot.val());
    //         datas = datas.filter((item) => {
    //             return item;
    //         });
    //     });

    res.redirect('/users/listStudent');
    return;

    // res.render("./users/listStudent", {
    //     datas: datas,
    //     dataKeys: dataKeys
    // })
}

module.exports.indexPost2 = async function(req, res, next) {
    const databaseRef = db.ref;
    const databaseChild = databaseRef.child("data").child(req.body.masvedt.substring(6));
    await databaseChild.set({
        lop: req.body.lopsvedt,
        name: req.body.tensvedt,
        maSV: req.body.masvedt
    });

    res.redirect('/users/listStudent');
    return;
}

module.exports.logout = function (req, res, next) {
    res.clearCookie("userId");
    res.redirect("/");
}

module.exports.home = function(req, res, next) {
    res.redirect('/home');
}
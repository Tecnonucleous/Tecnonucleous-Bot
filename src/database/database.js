var app = require('../settings/app');

var databaseFn = {};

databaseFn.viewUser = ((userInfo) => {
    return new Promise((resolve, reject) => {
        app.Database.users.findOne({ "user_id": String(userInfo.id) }, (err, docs) => {
            if (err) throw reject(err);

            if (docs == null) {
                // Hemos condicionado que si el usuario tiene @alias lo guarde, en caso contrario que lo ignore
                if (userInfo.username != undefined) {
                    app.Database.users.insert({ "name": userInfo.first_name, "user_id": String(userInfo.id), "username": userInfo.username }, (err, docsNew) => {
                        if (err) throw reject(err);

                        resolve({
                            code: true,
                            content: docsNew
                        })
                    })
                } else {
                    app.Database.users.insert({"name": userInfo.first_name, "user_id": String(userInfo.id),}, (err, docsNewNotUsername) => {
                        if (err) throw reject(err);

                        resolve({
                            code: true,
                            content: docsNewNotUsername
                        })
                    })
                }
            } else {
                resolve({
                    code: true,
                    content: docs
                })
            }

        })
    })
});

databaseFn.setLanguage = ((user, lang) => {
    return new Promise((resolve, reject) => {
        app.Database.users.findOne({ "user_id": String(user.id) }, (err, docs) => {
            if (err) throw reject(err);
            if (docs != null) {
                if (docs.lang == undefined) {
                    
                    app.Database.users.update({ "user_id": String(user.id) }, { $set: { "lang": lang } }, (err, updateLang) => {
                        if (err) throw reject(err);
                        if (updateLang === 1) {
                            databaseFn.viewUser(user).then((userInfo) => {
                                if (userInfo.code == true) {
                                    resolve({
                                        code: true,
                                        content: userInfo.content
                                    })
                                }
                            })
                        }
                    })
                } else {
                    resolve({
                        code: true,
                        content: docs
                    })
                }

            }
        })
    })
});

databaseFn.changeLanguage = ((user, new_lang) => {
    return new Promise((resolve, reject) => {
        app.Database.users.update({
            "user_id": String(user.id)
        }, { $set: { "lang": new_lang } }, (err, updateLang) => {
            if (err) throw reject(err);
            if (updateLang === 1) {
                //console.log(updateLang)
                databaseFn.viewUser(user).then((userInfo) => {
                    if (userInfo.code == true) {
                        //console.log(userInfo)
                        resolve({
                            code: true,
                            content: userInfo.content
                        })
                    }
                }).catch((err) => {
                    console.log(err)
                })
            }
        })


    })
})


module.exports = databaseFn;
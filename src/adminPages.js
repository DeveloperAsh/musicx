module.exports = function (app, query) {

    function compareNavBySeq(a, b) { return a.sequence - b.sequence }
    function insertNav(array, indexrArray, element, comparator) {
        for (var i = 0; i < array.length && comparator(array[i], element) < 0; i++) { }
        array.splice(i, 0, element)
        if (indexrArray != null) {
            indexrArray.splice(i, 0, element.id)
        }

    }

    function checkSignIn(req, res, next) {

        query.query(`SELECT url_master.* FROM url_master  GROUP BY url_master.id ORDER BY url_master.is_parent DESC`, (result) => {
            if (result.isSuccess && result.response.length != 0) {
                var dashboard = {};
                dashboard['navList'] = [];
                var title = "";
                var subTitle = "";
                var index = [];

                for (var i = 0; i < result.response.length; i++) {
                    let element = result.response[i];
                    if (element.is_parent == 1) {

                        let p1 = {};
                        p1['id'] = element.id;
                        p1['name'] = element.name;
                        p1['active'] = "";
                        p1['menu_trigger'] = "menu-close";
                        p1['sequence'] = element.sequence;
                        p1['list'] = [];
                        insertNav(dashboard['navList'], index, p1, compareNavBySeq)

                        // dashboard['navList'].push(p1);
                        // index.push(element.id);
                    }
                    else {
                        let c1 = {};
                        c1['name'] = element.name;
                        c1['active'] = "";
                        c1['sequence'] = element.sequence;
                        c1['url'] = element.url;
                        // console.log(JSON.stringify(dashboard) + "\n\n" + JSON.stringify(index) + "\n\n" + JSON.stringify(element));
                        insertNav(dashboard['navList'][index.indexOf(element.parent_id)].list, null, c1, compareNavBySeq)
                        // dashboard['navList'][index.indexOf(element.parent_id)].list.push(c1);

                    }
                }



                for (var i = 0; i < dashboard.navList.length; i++) {
                    for (var j = 0; j < dashboard.navList[i].list.length; j++) {
                        if (dashboard.navList[i].list[j].url == req.path) {
                            dashboard.navList[i].list[j].active = "active";
                            dashboard.navList[i].active = "active";
                            dashboard.navList[i].menu_trigger = "menu-open";
                            title = dashboard.navList[i]['name'];
                            subTitle = dashboard.navList[i].list[j]['name'];
                            break;
                        }
                    }
                }
            
                res.dashboard = dashboard;
                res.title = title;
                res.subTitle = subTitle;


                next();

            } else {
                res.redirect('/admin');
            }
        })
    }

    
    app.get("/", checkSignIn, function (req, res) {
         
        res.redirect("/music-list");
        
    });


    app.get("/add-new", checkSignIn, function (req, res) {
        var responseData = {};
        responseData['dashboard'] = res.dashboard;
        responseData['title'] = res.title;
        responseData['subTitle'] = res.subTitle;
        responseData['response'] = [];

        res.render('new-music', { "responseData": responseData });    
        
    });


    app.get("/music-list", checkSignIn, function (req, res) {
        var responseData = {};
        responseData['dashboard'] = res.dashboard;
        responseData['title'] = res.title;
        responseData['subTitle'] = res.subTitle;
        responseData['response'] = [];

        res.render('music-list', { "responseData": responseData });    
        
    });
 

};
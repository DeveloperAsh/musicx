module.exports = function(mysql) {

    this.pool = mysql.createPool({
        connectionLimit: 1000, //important
        host: 'localhost',
        user: 'root',
        password: 'Ashish@123',
        database: 'musicx',
        debug: false,
        multipleStatements: true
    });

    this.dbHandler = function(query, callback) {
        var responseData = {};
        responseData['isSuccess'] = 0;
        responseData['message'] = "";
        responseData['response'] = null;
        this.pool.getConnection(function(err, connection) {
            if (err) {
                connection.release();
                responseData['isSuccess'] = 0;
                responseData['message'] = err.message;
                callback(responseData)
            } else {
                //console.log('connected as id ' + connection.threadId);
                console.log(query)
                connection.query(query, function(err, rows) {
                    connection.release();
                    if (err) {
                        responseData['isSuccess'] = 0;
                        responseData['message'] = err.message;
                        callback(responseData)
                    } else {
                        responseData['isSuccess'] = 1;
                        responseData['message'] = "Success";
                        responseData['response'] = rows;
                         callback(responseData)
                    }
                });
                connection.on('error', function(err) {
                    connection.release();
                    responseData['isSuccess'] = 0;
                    responseData['message'] = err.message;
                    callback(responseData)
                });
            }
        });
    };

    this.query = function(query, callback) {
        this.dbHandler(query, function(responseData) {
            callback(responseData);
        });
    };

    this.BulkInsert = function(query, values, callback) {
        var responseData = {};
        responseData['isSuccess'] = 0;
        responseData['message'] = "";
        responseData['response'] = null;
        this.pool.getConnection(function(err, connection) {
            if (err) {
                connection.release();
                responseData['isSuccess'] = 0;
                responseData['message'] = err.message;
                callback(responseData)
            } else {
                //console.log('connected as id ' + connection.threadId);
                connection.query(query, values, function(err, rows) {
                    connection.release();
                    if (err) {
                        responseData['isSuccess'] = 0;
                        responseData['message'] = err.message;
                        callback(responseData)
                    } else {
                        responseData['isSuccess'] = 1;
                        responseData['message'] = "Success";
                        responseData['response'] = rows;
                         callback(responseData)
                    }
                });
                connection.on('error', function(err) {
                    connection.release();
                    responseData['isSuccess'] = 0;
                    responseData['message'] = err.message;
                    callback(responseData)
                });
            }
        });
    };

    this.insert = function(table, insertData, callback) {
        var keys = Object.keys(insertData);
        var keyValue = "";
        var insertItem = "";
        for (var i = 0; i < keys.length; i++) {
            keyValue = keyValue + keys[i] + ",";
            if (typeof insertData[keys[i]] === 'string') {
                let insertItem2 = insertData[keys[i]];
                insertItem2 = insertItem2.replace(/'/g, "\\'");
                insertItem2 = insertItem2.replace(/"/g, '\\"');
                insertItem = insertItem + "'" + insertItem2 + "'" + ",";
            } else {
                insertItem = insertItem + insertData[keys[i]] + ",";
            }

        }
        if (keyValue.charAt(keyValue.length - 1) == ',') {
            keyValue = keyValue.substr(0, keyValue.length - 1);
        }
        if (insertItem.charAt(insertItem.length - 1) == ',') {
            insertItem = insertItem.substr(0, insertItem.length - 1);
        }
        this.dbHandler(`INSERT INTO ${table} (${keyValue}) VALUES (${insertItem})`, function(responseData) {
            callback(responseData);
        });
    };

    this.insertMultiple = function(table, insertData,objProtoType, callback) {
        if(Array.isArray(insertData)){
            let keyList = Object.keys(objProtoType);
            let keyValue = "";
            for (let i = 0; i < keyList.length; i++) {
                keyValue = keyValue +""+ keyList[i] + ",";
            }
            let insertMultiValue="";
            for(let j=0;j<insertData.length;j++){
                let insertValueItem="";
                for(let k=0;k<keyList.length;k++){

                    let insertItem = insertData[j][keyList[k]];
                    // if(insertItem ==='string')
                    // {
                    //     insertItem=insertItem.replace(/'/g, "\\'");
                    //     insertItem = insertItem.replace(/"/g, '\\"');
                    // }
                    
                    insertValueItem=insertValueItem+""+((insertData[j].hasOwnProperty(keyList[k]) && insertData[j][keyList[k]]!=undefined && insertData[j][keyList[k]]!="")? (typeof insertData[j][keyList[k]] ==='string')?"'"+insertItem+"'":insertItem:"''")+",";
                }
                if(insertValueItem.length>0){
                    if (insertValueItem.charAt(insertValueItem.length - 1) == ',') {
                        insertValueItem = insertValueItem.substr(0, insertValueItem.length - 1);
                    }
                    insertMultiValue=insertMultiValue+"("+insertValueItem+"),";
                }
            }
            if(insertMultiValue.length>0){
                if (insertMultiValue.charAt(insertMultiValue.length - 1) == ',') {
                    insertMultiValue=insertMultiValue.substring(0,insertMultiValue.length-1);
                }
            }
            if(keyValue.length>0){
                if(keyValue.charAt(keyValue.length-1)==','){
                    keyValue=keyValue.substring(0,keyValue.length-1);
                }
            }
            this.dbHandler(`INSERT INTO ${table} (${keyValue}) VALUES ${insertMultiValue}`, function(responseData) {
                callback(responseData);
            });
        }else{
            var responseData={};
            responseData['isSuccess']=0;
            responseData['message']="Invalid data type";
            responseData['response']={};
            callback(responseData);
        }
        
    };

    this.updateQuery = function(table, updateData, whereData, callback) {
        var keys = Object.keys(updateData);
        var updateString = "";
        for (var i = 0; i < keys.length; i++) {
            if (typeof updateData[keys[i]] === 'string') {
                let insertItem2 = updateData[keys[i]];
                insertItem2 = insertItem2.replace(/'/g, "\\'");
                insertItem2 = insertItem2.replace(/"/g, '\\"');
 
                updateString = updateString + keys[i] + "='" + insertItem2 + "',";
            } else {
                updateString = updateString + keys[i] + "=" + updateData[keys[i]] + ",";
            }
        }
        if (updateString.charAt(updateString.length - 1) == ',') {
            updateString = updateString.substr(0, updateString.length - 1);
        }

        var keys = Object.keys(whereData);
        var whereString = "";
        for (var i = 0; i < keys.length; i++) {
            if (typeof whereData[keys[i]] === 'string') {
                whereString = whereString + keys[i] + "='" + whereData[keys[i]] + "' AND ";
            } else {
                whereString = whereString + keys[i] + "=" + whereData[keys[i]] + " AND ";
            }
        }
        var checkValue = whereString.substr((whereString.length - 5), whereString.length);
        if (checkValue == ' AND ') {
            whereString = whereString.substr(0, whereString.length - 5);
        }
        this.dbHandler("UPDATE " + table + " SET " + updateString + " WHERE " + whereString, function(responseData) {
            callback(responseData);
        });
    };

};

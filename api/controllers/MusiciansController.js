/**
 * MusiciansController
 *
 * @description :: Server-side logic for managing musicians
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/musicians"

module.exports = {

  /**
   * `MusiciansController.create()`
   */
  create: function (req, res) {
        
        if(req.method != "POST"){
          return res.view('create');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         
        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                return res.view('create', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('create', {success:{message: "Record created successfully"}});

        })
 
  },


  /**
   * `MusiciansController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {musicians: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the records"}});
    });

  },


  /**
   * `MusiciansController.update()`
   */
  update: function (req, res) {

    if(req.method != "POST"){
          return res.view('update');
        }
console.log(req.body);
        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         
        client.put(endpoint + "/" + req.body.musicianID, args, function (data, response) {
            // return res.view('update', {success: { message: "Record updated successfully"}});
            if(response.statusCode != "200"){
                return res.view('update', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('update', {success:{message: "Record updated successfully"}});
    
    });
  },


  /**
   * `MusiciansController.delete()`
   */
  delete: function (req, res) {

    if(req.method != "POST"){
          return res.view('delete');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         
        client.delete(endpoint + "/" + req.body.musicianID, function (data, response) {
            // return res.view('delete', {success: { message: "Record deleted successfully"}});
            if(response.statusCode != "200"){
                return res.view('delete', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('delete', {success:{message: "Record deleted successfully"}});
    
        });

      }
    
};


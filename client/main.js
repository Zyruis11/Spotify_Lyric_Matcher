import { Template } from 'meteor/templating';
import './main.html';
import "../client/ui/components/forms/searchForm/searchForm.js";

Template.hello.events({
    'click .doot'(event, instance) {
        //Optional 
        // var options = {
        //     showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
        //     requestPermissions: ['user-read-email'] // Spotify access scopes.
        // };

        // Meteor.loginWithSpotify(options, function (err) {
        //     console.log(err || "No error");
        // });
    },
});

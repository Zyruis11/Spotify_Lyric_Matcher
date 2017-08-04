import "./searchForm.html";

Template.ui_components_forms_searchForm.helpers({
    'getAlbumURI':function(){
        return Session.get("albumID");        
    }
});

Template.ui_components_forms_searchForm.events({
    'submit .searchForm'(event) {
        event.preventDefault();
        var artistName = $("#artistName").val();
        if (artistName) {
            Meteor.call('searchArtists', artistName, 10, function (err, response) {
                Session.set("artistInfo", response.artists.items);
            });
            Meteor.call('getMusixArtist',artistName,function(err,response){
                console.log(response);
            });
        }

    },
    //TODO: Remove
    'click #memes'(event) {
        event.preventDefault();
        Session.set("artistInfo", null);
        Session.set("albumInfo",null);
        Session.set("albumID",null);
    }
})

Template.ui_components_forms_searchFormArtistResults.helpers({
    'getArtists': function () {
        return Session.get("artistInfo");
    },
    smallImg: function (size) {
        return size < 200; //Find the smallest image
    }
});

Template.ui_components_forms_searchFormArtistResults.events({
    'click .artistImg':function(){
        Meteor.call('fetchArtistAlbums',event.target.id,20,function(err,response){
            Session.set("albumInfo",response.items);
            console.log(response.items);
        });
    }
}); 

Template.ui_components_forms_searchFormAlbumResults.helpers({
    'getAlbums':function(){
        return Session.get("albumInfo");
    },
    smallImg: function (size) {
        return size < 200; //Find the smallest image
    }
});

Template.ui_components_forms_searchFormAlbumResults.events({
    'click .albumImg':function(){
        Session.set("albumID",event.target.id);
    }
});

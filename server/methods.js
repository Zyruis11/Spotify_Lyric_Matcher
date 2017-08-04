import { apiKeys } from "./config.js";
var musixMatchKey = apiKeys.musixMatchSecret;
Meteor.methods({
    //Example meteor method for searching for an album(s)
    searchAlbums: function (query, lim) {
        var spotifyApi = new SpotifyWebApi();
        //grab JSON list of albums based on text search
        var response = spotifyApi.searchAlbums(query, {
            limit: lim
        });
        // Need to refresh token
        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.searchAlbums(query, {
                limit: lim
            });
        }
        return response.data.body;
    },
    //Searchs for an artist by name(String)
    searchArtists: function (query, lim) {
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.searchArtists(query, {
            limit: lim
        });

        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.searchArtists(query, {
                limit: lim
            });
        }
        return response.data.body;
    },
    //Get specific artists albums by their ID
    fetchArtistAlbums: function (id, lim) {
        var spotifyApi = new SpotifyWebApi();
        var response = spotifyApi.getArtistAlbums(id, {
            limit: lim
        });

        if (checkTokenRefreshed(response, spotifyApi)) {
            response = spotifyApi.searchArtists(id, {
                limit: lim
            });
        }
        return response.data.body;

    },
    //Get the artist(s) profile from the musixmatch api and parse the data into a json format. 
    getMusixArtist: function (query) {
        this.unblock();
        try {
            const result = HTTP.call('GET', 'https://api.musixmatch.com/ws/1.1/artist.search', {
                params: {
                    "format": "json",
                    "callback":"callback",
                    "q_artist": query,
                    "apikey": musixMatchKey,
                }
            });
            return JSON.parse(result.content);
        } catch (e) {
            console.log(e);
            // Got a network error, timeout, or HTTP error in the 400 or 500 range.
            return false;
        }
    },
});

var checkTokenRefreshed = function (response, api) {
    if (response.error && response.error.statusCode === 401) {
        api.refreshAndUpdateAccessToken();
        return true;
    } else {
        return false;
    }
};
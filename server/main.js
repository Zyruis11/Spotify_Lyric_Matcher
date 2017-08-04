import { Meteor } from 'meteor/meteor';
import { apiKeys } from "./config.js";
Meteor.startup(() => {
    ServiceConfiguration.configurations.update(
        { "service": "spotify" },
        {
            $set: {
                "clientId": apiKeys.spotifyClient,
                "secret": apiKeys.spotifySecret
            }
        },
        { upsert: true }
    );
});

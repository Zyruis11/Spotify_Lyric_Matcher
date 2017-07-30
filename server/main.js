import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    ServiceConfiguration.configurations.update(
        { "service": "spotify" },
        {
            $set: {
                "clientId": "SPOTIFY CLIENT KEY HERE",
                "secret": "SPOTIFY SECRET HERE"
            }
        },
        { upsert: true }
    );
});

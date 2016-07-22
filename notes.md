# The Twitch TV API

The base url for fetching streams is

https://api.twitch.tv/kraken/streams/

The username of the streamer should directly follow this part of the url, for example, for the streamer freecodecamp the request url would be:

https://api.twitch.tv/kraken/streams/freecodecamp

to add a callback to this you must append ?callback like so:

https://api.twitch.tv/kraken/streams/freecodecamp?callback=

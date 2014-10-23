react-consumer
==============

An example Signal K consumer using
[React.js](http://facebook.github.io/react/).

Installation
------------

If you haven't already, clone signalk/consumer-server. And if you have,
checkout the serve-deps branch.

```shell
$ git clone https://github.com/SignalK/consumer-server.git
```

Then

```shell
$ cd consumer-server
$ bower install signalk/react-consumer
$ cd bower_components/react-consumer
$ bower install
$ cd ../../
$ npm start
```

Alternatively, if you don't want to run this using node and the
consumer-server wrapper, you can use python:

```shell
$ git clone https://github.com/SignalK/react-consumer.git
$ cd react-consumer
$ bower install
$ python -m SimpleHTTPServer 8080
```

You should now have a server running on `http://localhost:8080`. By default
the consumer assumes there is a Signal K server running on :3000 on the same
machine.

Roadmap
-------
This is a pretty simple example and not much is planned for it. However, the
following would be useful additions.
* Better documentation (always)
* A configuration file to specify URI of Signal K server

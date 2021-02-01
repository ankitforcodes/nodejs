var Redis = require('ioredis');
var redis = new Redis();

var scanned_stream = redis.scanStream({
  match: 'person*'
});

scanned_stream.on('data', function (keys) {
    var pipeline = redis.pipeline();
    
    for(i = 0; i < keys.length; i++){
      pipeline.del(keys[i]);
    }
    pipeline.exec();
});
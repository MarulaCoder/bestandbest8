var Twit = require('twit')
//var config = require('./config.js');

var T = new Twit(
    /*
    {
        consumer_key:         'VQBYniu5zT9zsm5thyruSWQ0o'
      , consumer_secret:      'I8TT4pUr6gJp55q0qSVIdVnSbzwZNPmVasyQE0qjoMqsovq5UO'
      , app_only_auth:        true
    }
    */
    {
    consumer_key:         'VQBYniu5zT9zsm5thyruSWQ0o',
    consumer_secret:      'I8TT4pUr6gJp55q0qSVIdVnSbzwZNPmVasyQE0qjoMqsovq5UO',
    access_token:         '1266302804974436352-K172JibvtbjsdkqaHFq7QAm2PCipoV',
    access_token_secret:  'JVpfs6WdGMf7toUoqC3wjzvYSDlci0XKLWcbWEIb2qqls',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    //strictSSL:            true,     // optional - requires SSL certificates to be valid.
    }
    
);

var onFollowed = (event) => {
    var name = event.source.name;
    var screenName = event.source.screen_name;
    var response = '@' + screenName + ' Thank you for following, ' + name + '!';

    // tweet response to user here

    console.log('I was followed by: ' + name + ' @' + screenName)
}

var onError = (error) => {
    throw error;
}

var onAuthenticated = (err, res) => {
    if (err) {
        throw err
    }

    console.log('Authentication successful. Running bot...\r\n')

    var stream = T.stream('user');

    stream.on('follow', onFollowed);

    stream.on('error', onError);
};

// Wrapping my code in a promise wrapper...
let post_promise = require('util').promisify( // Wrap post function w/ promisify to allow for sequential posting.
    (options, data, cb) => T.post(
      options,
      data,
      (err, ...results) => cb(err, results)
    )
  );
  
  // Async/await for the results of the previous post, get the id...
  const tweet_crafter = async (array, id, webUrl, hashTag) => { 
    for(let i = 0; i < array.length; i++){
      let content = await post_promise('statuses/update', { status: array[i] + '\n\n' + webUrl + '\n\n' + hashTag, in_reply_to_status_id: id });
      id = content[0].id_str;
    };
  };
  
 exports.sendTweet = (jsonData) => { 
     
    var first = jsonData['first'];
    var subsequent = jsonData['subsequent'];
    var webUrl = jsonData['weburl'];
    var hashTag = jsonData['hashtag'];

    /*
    T.get('account/verify_credentials', {
        include_entities: false,
        skip_status: true,
        include_email: false
    }, onAuthenticated);
    */

    post_promise('statuses/update', { status: `${first + '\n\n' + hashTag}` })
        .then((top_tweet) => {
            console.log(`${top_tweet[0].text} tweeted!`);
            let starting_id = top_tweet[0].id_str; // Get top-line tweet ID...
            tweet_crafter(subsequent, starting_id, webUrl, hashTag);
        })
        .catch(err => console.log(err));
};

/*
exports.sendTweet = (req, res, next) => {
    // Set up your search parameters
    var params = {
        q: '#BestAndBest8, #Best8Guide, #Best8Learn, BestAndBest8, Best8Guide, Best8Learn',
        count: 10,
        //result_type: 'recent',
        //lang: 'en'
    }

    var tweetData = {};

    
    T.get('search/tweets', params, function(err, data, response) {
        if(!err){
          // This is where the magic will happen
          console.log(data);
        } else {
          console.log(err);
        }
    });
    

    T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
        if(!err)
        {
            console.log(data)
            tweetData = data;
        }
        else
        {
            console.log(err);
        }
    });

   return tweetData;
};

*/
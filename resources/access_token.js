exports.handler = function (context, event, callback) {
  // make sure you enable ACCOUNT_SID and AUTH_TOKEN in Functions/Configuration
  const ACCOUNT_SID = context.ACCOUNT_SID;
  const API_KEY = context.TWILIO_API_KEY;
  const API_SECRET = context.TWILIO_API_SECRET;
  const TWIML_SID = context.TWIML_APP_SID;

  let response = new Twilio.Response();

  // Add CORS Headers
  let headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    "Content-Type": "application/json"
  };

  // Set headers in response
  response.setHeaders(headers);

  response.setStatusCode(200);

  response.setBody({
    'token': generate_access_token(ACCOUNT_SID, API_KEY, API_SECRET, TWIML_SID)
  });

  callback(null, response);
}

function generate_access_token(twilioAccountSid, twilioApiKey, twilioApiSecret, outgoingApplicationSid) {
  const AccessToken = require('twilio').jwt.AccessToken;
  const VoiceGrant = AccessToken.VoiceGrant;
  const identity = 'user';

  // Create a "grant" which enables a client to use Voice as a given user
  const voiceGrant = new VoiceGrant({
    outgoingApplicationSid: outgoingApplicationSid,
    incomingAllow: true, // Optional: add to allow incoming calls
  });

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    { identity: identity }
  );
  token.addGrant(voiceGrant);

  // Serialize the token to a JWT string
  return token.toJwt();
}
# Twilio guideline
- How to config serverless with Twilio using voice programing.
- So you can making a calling directly from your app which built just by HTML/Javascript (Of course stick in CSS more beauty - just for fun :trollface:)
- References:
  - [**Twilio Client JavaScript Quickstart**](https://www.twilio.com/docs/voice/client/javascript/quickstart)
  - [**Twilio.Device api**](https://www.twilio.com/docs/voice/client/javascript/device)

## Prerequisite
- Create a **Twilio account**. Flowing [this](https://www.twilio.com/try-twilio) step

## Step by step configuration
- After you created a account and got a number and verified

### Step 1: Create a TwiML XML file
- Access [TwiML Bin](https://www.twilio.com/console/twiml-bins)
- Click add button :heavy_plus_sign: to create new and fill the TWIML input with section sample below. (change **enter_your_caller_id**)
- **enter_your_caller_id** is the number you bought. [Check here](https://www.twilio.com/console/phone-numbers/incoming)
```
<Response>
  <Dial callerId="enter_your_caller_id">
    <Number>
    {{To}}
    </Number>
  </Dial>
</Response>
```
- And keep in eyes the **URL Properties**

### Step 2: Create a TwiML App
- Go to [**TwiML Apps**](https://www.twilio.com/console/voice/twiml/apps) in *Programmable Voice* category and create [new](https://www.twilio.com/console/voice/twiml/apps/create) *TwiML App*
- Fill the **FRIENDLY NAME** with your choice
- Fill the **Voice - REQUEST URL** with **URL Properties** in `Create a TwiML XML file` section above
- Access TwiML Apps created and *keep in eyes* the **SID value**

### Step 3: Create new function (that's will handle request in Twilio, meaning serverless deployment)
- Go to [**Functions (Classic)**](https://www.twilio.com/console/functions/manage) in *Functions* category
- Click add button :heavy_plus_sign: to create new and select **Twilio Client Quickstart**
- Enter the **TWIML_APP_SID** which SID value we got from `Create a TwiML App` above.
- Enter the **CALLER_ID** phone numbers you bought
- Access the *Function* created and using the **PATH** to get token by a request. Meaning you can use that **PATH** to replace the `tokenUrl` in the `env.js` repository's file

## How to see the demo
- Clone this repo.
- Edit `env.js` with your URL created `Create new function` section above [Functions](https://www.twilio.com/console/functions/manage)
- Open the index.html file via browser and enjoy :skull:

## Notice
- With trials account you just can dial to a verified number. ['Verified Caller IDs'](https://www.twilio.com/console/phone-numbers/verified)
- In the TwiML XML file you can include the values of HTTP parameters (Example: {{From}} - {{To}})

## Author
- [Vincent Nguyen](mailto:vannhd@ethan-tech.com)
- Don't hesitate to contact me if you get any trouble when installing on Twilio.

## License
- MIT
# Twilio guideline
- How to config serverless with Twilio using voice programing
- So you can making a calling directly from your app which built just by HTML/Javascript (Of course stick with CSS more beauty - just for fun :trollface:)
- References:
  - [**Twilio Client JavaScript Quickstart**](https://www.twilio.com/docs/voice/client/javascript/quickstart)
  - [**Twilio.Device api**](https://www.twilio.com/docs/voice/client/javascript/device)
  - [**Access Tokens**](https://www.twilio.com/docs/iam/access-tokens)

## Prerequisite
- Create a **Twilio account**. Flowing [this](https://www.twilio.com/try-twilio) step

## Step by step configuration
- After you created a account and got a number and verified

### Step 1: Create a TwiML XML file
- Access [TwiML Bin](https://www.twilio.com/console/twiml-bins)
- Click add button :heavy_plus_sign: to create new and fill the TWIML input with section sample below (change **enter_your_caller_id**)
- **enter_your_caller_id** which is the phone number you bought - [check here](https://www.twilio.com/console/phone-numbers/incoming)
```
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial callerId="enter_your_caller_id">
    <Number statusCallbackEvent="initiated ringing answered completed"
         statusCallback="https://dev.acall.jp/hook/twilio?Token={{Token}}"
         statusCallbackMethod="GET">
    {{To}}
    </Number>
  </Dial>
</Response>
```

```
  DEV ENV: https://dev.acall.jp/hook/twilio?Token={{Token}}
  Other envs please change: <baseURL>/hook/twilio?Token={{Token}}
```
- And keep in eyes the **URL Properties**

### Step 2: Create a TwiML App
- Go to [**TwiML Apps**](https://www.twilio.com/console/voice/twiml/apps) in *Programmable Voice* category and create [new](https://www.twilio.com/console/voice/twiml/apps/create) *TwiML App*
- Fill the **FRIENDLY NAME** with your choice
- Fill the **Voice - REQUEST URL** with **Webhook URL** in `Create a TwiML XML file` section above
```
  Webhook URL: 
      DEV: https://dev.acall.jp/hook/twilio
      Other: <base_url>/hook/twilio
```
- Access TwiML Apps created and *keep in eyes* the **SID value**

### Step 3: Create new API Keys
- Go to [**API Keys**](https://www.twilio.com/console/video/project/api-keys) in *Programmable Video* category
- Click add button :heavy_plus_sign: to create new and fill out **FRIENDLY NAME** textbox
- After created, we should `keeping SECRET values in your machine`.

### Step 4: Create new function (that's will handle request in Twilio, meaning serverless deployment)
- Go to [**Functions (Classic)**](https://www.twilio.com/console/functions/manage) in *Functions* category
- Click add button :heavy_plus_sign: to create new and select **Blank**
- Fill out the **FUNCTION NAME** and **PATH** as your wish
- Use entire the content in `resources/access_token.js` copy to **CODE** section and then **Save** it
- Then move to [Configure](https://www.twilio.com/console/functions/configure) tab and make sure the **Enable ACCOUNT_SID and AUTH_TOKEN** checked
- In the screen, click Add button below **Environment Variables** with the key value pairs
  - TWIML_APP_SID - **SID value from Step 2: Create a TwiML App**
  - TWILIO_API_KEY - **SID value from Step 3: Create new API Keys**
  - TWILIO_API_SECRET - **SECRET values you stored from Step 3: Create new API Keys**
- Access the *Function* created and using the **PATH url** to get token by making a request. Meaning you can use that **PATH** to replace the `tokenUrl` in the `env.js` repository's file

## How to see the demo
- Clone this repo
- Edit `env.js` with your URL created `Create new function` section above [Functions](https://www.twilio.com/console/functions/manage)
- Open the index.html file via browser and enjoy :skull:

## Notice
- With trials account you just can only dial to a verified number ['Verified Caller IDs'](https://www.twilio.com/console/phone-numbers/verified)
- In the TwiML XML file you can include the values of HTTP parameters (Example: {{From}} - {{To}})

## Contributor
- [HiepPB](mailto:hieppb@ethan-tech.com)

## Author
- [Vincent Nguyen](mailto:vannhd@ethan-tech.com)
- Don't hesitate to contact me if you get any trouble when installing on Twilio

## License
- MIT

// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
// get random from array function
        function getRandom(array) {
            return array[Math.floor(Math.random()*array.length)];
        }
        
function getSpeech(){
    const songs = [
            "https://s3-eu-west-1.amazonaws.com/video.thinkjam.com/video/alexa/songs/rrryb.mp3",
            "https://s3-eu-west-1.amazonaws.com/video.thinkjam.com/video/alexa/songs/hskt.mp3",
            "https://s3-eu-west-1.amazonaws.com/video.thinkjam.com/video/alexa/songs/bday.mp3",
            "https://s3-eu-west-1.amazonaws.com/video.thinkjam.com/video/alexa/songs/sheep_ready.mp3",
            "https://s3-eu-west-1.amazonaws.com/video.thinkjam.com/video/alexa/songs/wheels_ready.mp3",
            "https://s3-eu-west-1.amazonaws.com/video.thinkjam.com/video/alexa/songs/bingo_ready.mp3"
        ]
        
        const greetings = [
            "Hi, Are you ready to wash your hands? let's go.",
            "Ok, are you ready to start? Keep washing until the song finishes.",
            "Hello, let's get ready to wash",
            "Ok, let's wash our hands together",
            "Hi, let's wash our hands until the song is done."
            ]
        
        const goodbyes = [
            "Well done! now dry your hands. See you soon.",
            "Good work. See you next time.",
            "Nice work. see you soon",
            "Good Job! now dry your hands. Goodbye"
            ]
            
        
        let speechText = `${getRandom(greetings)} <break time="1s"/> <audio src='${getRandom(songs)}'/> <break time="1s"/> ${getRandom(goodbyes)}`;
        
        return speechText;
        
}


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        //song array
        
        
        let speechText = getSpeech();
        
        
        
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const washIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'washIntent';
    },
    handle(handlerInput) {
        let speechText = getSpeech();
        
        
        
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'say wash my hands to get started';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        washIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();

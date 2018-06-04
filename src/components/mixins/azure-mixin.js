import Vue from "vue";
import Component from "vue-class-component";
import * as SDK from "microsoft-speech-browser-sdk";

@Component
export default class Azure extends Vue {
  token = "";
  voice = "fr-CA, Caroline";
  thanks = "J'ai réussi a faire parler mon application Electron a partir de Azure, merci Microsoft.";
  subKey = "";

  constructor() {
    super();
    //console.log(SDK);
  }

  listen = (callback, hypothesis) => {
    let recognizerConfig = new SDK.RecognizerConfig(
      new SDK.SpeechConfig(
        new SDK.Context(
          new SDK.OS(navigator.userAgent, "Browser", null),
          new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000")
        )
      ),
      "Interactive",
      "fr-CA",
      "Simple"
    );

    let auth = new SDK.CognitiveSubscriptionKeyAuthentication(this.subKey);

    let listener = SDK.CreateRecognizer(recognizerConfig, auth);

    listener.Recognize(event => {
      console.debug(`Debug Event: ${event.Name}`);
      if (event && event.Result) {
        callback(event.Result.DisplayText || event.Result.Text);
      }
    });
  };

  say = text => {
    console.log(text);

    let data = `<speak version='1.0' xmlns="http://www.w3.org/2001/10/synthesis" xml:lang='en-US'><voice name='Microsoft Server Speech Text to Speech Voice (${
      this.voice
    })'>${text}</voice></speak>`;

    let request = new XMLHttpRequest();

    request.open(
      "POST",
      "https://westus.tts.speech.microsoft.com/cognitiveservices/v1",
      true
    );

    request.responseType = "blob";
    request.setRequestHeader("Authorization", `Bearer ${this.token}`);
    request.setRequestHeader("Content-Type", "application/ssml+xml");
    request.setRequestHeader(
      "X-Microsoft-OutputFormat",
      "audio-16khz-64kbitrate-mono-mp3"
    );

    console.log(data);
    request.send(data);

    request.onload = oevent => {
      let blob = request.response;
      console.log(request.response);

      if (blob) {
        let audio = document.createElement("audio");
        audio.src = window.URL.createObjectURL(blob);
        audio.play();
      } else {
        console.error("NO BLOB");
      }
    };
  };
}

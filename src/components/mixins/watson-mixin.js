import Vue from "vue";
import Component from "vue-class-component";
let w = require("watson-speech/text-to-speech");
let w2 = require("watson-speech/speech-to-text");

@Component
export default class Watson extends Vue {
  token = "";
  token2 = "";

  say = text => {
    w.synthesize({
      token: this.token,
      voice: "fr-FR_ReneeVoice",
      text: text,
      autoPlay: true
    });
  };

  listen = callback => {
    let result = w2.recognizeMicrophone({
      token: this.token2,
      model: "fr-FR_BroadbandModel"
    });

    result.recognizeStream.on("message", (frame, cb) => {
      if (cb && cb.results) {
        console.log(`SUCCESS : ${cb}`);
      } else {
        console.log(`FAILURE : ${cb}`);
      }

      if (
        cb.results &&
        cb.results[0] &&
        cb.results[0].alternatives &&
        cb.results[0].final == true
      ) {
        console.log(
          `${cb.results[0].alternatives[0].transcript} : ${
            cb.results[0].alternatives[0].confidence
          }`
        );

        callback(cb.results[0].alternatives[0].transcript);
      }
    });
  };
}

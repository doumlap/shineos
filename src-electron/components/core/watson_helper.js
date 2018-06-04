import { ipcMain } from "electron";
import AbstractComponent from "../abstract_component";
let watson = require("watson-developer-cloud");

export default class AzureHelper extends AbstractComponent {
  constructor(window, app, bugsnag) {
    super(window, app, bugsnag);

    var authTts = new watson.AuthorizationV1({
      username: "",
      password: "",
      url: "https://stream.watsonplatform.net/authorization/api" // Speech tokens
    });

    var authStt = new watson.AuthorizationV1({
      username: "",
      password: "",
      url: "https://stream.watsonplatform.net/authorization/api" // Speech tokens
    });

    this.getTtsToken(authTts).then(token => {
      console.log(`TTS TOKEN : ${token}`);
    });

    this.getSttToken(authStt).then(token => {
      console.log(`STT TOKEN : ${token}`);
    });
  }

  getTtsToken = async authTts => {
    return new Promise(resolve => {
      authTts.getToken(
        {
          url: "https://stream.watsonplatform.net/text-to-speech/api"
        },
        function(err, token) {
          if (!token) {
            console.error("error:", err);
          } else {
            resolve(token);
          }
        }
      );
    });
  };

  getSttToken = async authStt => {
    return new Promise(resolve => {
      authStt.getToken(
        {
          url: "https://stream.watsonplatform.net/speech-to-text/api"
        },
        function(err, token) {
          if (!token) {
            console.error("error:", err);
          } else {
            resolve(token);
          }
        }
      );
    });
  };
}

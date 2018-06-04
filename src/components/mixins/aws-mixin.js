import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Aws extends Vue {
  polly = null;
  region = "ca-central-1";
  audioElement = null;
  isSpeaking = false;

  constructor() {
    super();

    console.log("tetee");

    this.audioElement = document.createElement("audio");

    this.polly = new AWS.Polly({
      region: this.region,
      accessKeyId: "",
      secretAccessKey: ""
    });
  }

  say = text => {
    var params = {
      OutputFormat: "mp3",
      Text: text,
      VoiceId: "Chantal",
      TextType: "ssml"
    };

    this.isSpeaking = true;

    this.polly.synthesizeSpeech(params, (error, data) => {
      if (error) {
        console.error(error);
      } else {
        this.playAudio(data);
      }
    });

    console.log(text);
  };

  playAudio = audioStream => {
    console.log(audioStream);
    // var uInt8Array = new Uint8Array(audioStream);
    var arrayBuffer = audioStream.AudioStream.buffer;
    var blob = new Blob([arrayBuffer]);

    var url = URL.createObjectURL(blob);
    this.audioElement.src = url;

    this.audioElement.addEventListener("ended", function() {
      this.isSpeaking = false;
    });

    this.audioElement.play();

    // let audio = new Audio(audioStream.AudioStream);
    // audio.
    // audio.play();
  };
}

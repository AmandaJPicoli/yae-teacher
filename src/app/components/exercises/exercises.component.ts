import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition/voice-recognition.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {


  utterance = new SpeechSynthesisUtterance;
  textos = [
    {
      id: 1,
      text: "hi"
    },
    {
      id: 2,
      text: "The book is on the table"
    }];
  resultado: string | undefined;


  constructor(
    public service : VoiceRecognitionService
  ) { 
    this.service.init()
   }

  ngOnInit(): void {
  }
  
  // Recognition 
  startService(){
    this.service.start()
  }

  stopService(){
    this.service.stop()
  }

  // Speech
  setTextMessage(text: string) {
    this.utterance.text = text;
  }

  speakText() {
    this.setVoice();
    speechSynthesis.speak(this.utterance);
  }

  setVoice() {
    this.utterance.lang = 'en-US';
    window.speechSynthesis.getVoices().find.name.search('Google US English');
  }

  buttonReadText() {
    this.setTextMessage(this.textos[1].text);
    this.speakText();
  }
}


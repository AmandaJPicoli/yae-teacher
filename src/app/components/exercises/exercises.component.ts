import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExpressaoModel } from 'src/app/models/ExpressaoModel';
import { ExpressoesService } from 'src/app/services/expressoes/expressoes.service';
import { VoiceRecognitionService } from 'src/app/services/voice-recognition/voice-recognition.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {


  utterance = new SpeechSynthesisUtterance;
  qtdExpressoes: number = 0;
  resultado: string | undefined;
  conjunto: ExpressaoModel[] = [];
  grupoId_rota: string | undefined | null;
  grupoId = 0;
  texto!: ExpressaoModel[];
  expressao!: ExpressaoModel;
  page: number = 1 ;
  gravando = false;
  loading = false;
  playingAudio = false;

  //Tentativa Paginação
  paginaAtual : number = 1 ;
  contador : number = 1;

  constructor(
    public service: VoiceRecognitionService,
    private toastr: ToastrService,
    private conjuntoService: ExpressoesService,
    private route: ActivatedRoute
  ) {
    this.service.init()
  }

  ngOnInit(): void {
    this.grupoId_rota = this.route.snapshot.paramMap.get('grupoId');
    if (this.grupoId_rota) {
      this.grupoId = parseInt(this.grupoId_rota);
      this.buscarTotalExpressoes(this.grupoId);
    }
    this.utterance.addEventListener("end", () => {
      this.playingAudio = false;
    }) 
  }

  //Buscar dados API
  buscarTotalExpressoes(grupoId: number) {
    this.loading = true;
    this.conjuntoService.getConjuntoPorGrupo(grupoId)
      .subscribe(
        response => this.onSuccess(response),
        error => this.onError(error)
      )
  }

  onSuccess(response: any) {
    this.conjunto = response;
    this.qtdExpressoes = this.conjunto.length;
    this.loading = false;
  }

  onError(error: any) {
    this.loading = false;
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }

  // Recognition 
 startService() {
    this.toastr.info('Play!', "Repita a expressão! Quando terminar de falar aperte o stop");
    this.service.start();
    this.verificaGravacao();
  }

  stopService() {
    this.toastr.success('Stop!', "Confira se você foi bem!");
    this.service.stop();
    this.verificaGravacao();
  }

  verificaGravacao() {
    this.gravando = !this.gravando
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

  buttonReadText(texto: any) {
    this.playingAudio = true;
    this.setTextMessage(texto);
    this.speakText();
  }

  stopAudio(){
    this.playingAudio = false;
    speechSynthesis.cancel();
  }
}


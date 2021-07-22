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
  }

  //Buscar dados API
  buscarTotalExpressoes(grupoId: number) {
    this.conjuntoService.getConjuntoPorGrupo(grupoId)
      .subscribe(
        response => this.onSuccess(response),
        error => this.onError(error)
      )
  }

  onSuccess(response: any) {
    this.conjunto = response;
    this.qtdExpressoes = this.conjunto.length;
    this.conjunto.forEach(element => {
      this.buscarExpressao(this.page);
    });
  }

  buscarExpressao(pageAtual: number) {
    this.conjuntoService.getConjuntoPorGrupoPaginado(this.grupoId, pageAtual)
      .subscribe(
        response => this.onSuccessExpressao(response),
        error => this.onError(error)
      )
  }

  onSuccessExpressao(response: ExpressaoModel[]) {
    this.texto = response;
    this.page = this.page +1;

    this.expressao = this.texto[0];
    console.log(this.expressao);
    console.log(this.page);
  }

  onError(error: any) {
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }

  //Logica da pagina
  carregaPagina() {
    let maxPage = this.qtdExpressoes ;
    if (maxPage > 0) {
      this.conjunto.forEach(element => {
        console.log(element);
      });
    }
  }

  // Recognition 
  startService() {
    this.service.start()
  }

  stopService() {
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

  buttonReadText(texto: any) {
    this.setTextMessage(texto);
    this.speakText();
  }
}


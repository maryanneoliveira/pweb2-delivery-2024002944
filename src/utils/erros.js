export class ErroAplicacao extends Error {
  constructor(mensagem, codigoStatus = 400) {
    super(mensagem);
    this.codigoStatus = codigoStatus;
  }
}
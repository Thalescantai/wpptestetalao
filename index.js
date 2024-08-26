const wppconnect = require('@wppconnect-team/wppconnect');
const { Message } = require('./database'); // Importa o modelo Message

wppconnect
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {
    // Lista de mensagens que devem receber a resposta automática
    const mensagensAutomaticas = [
      'oi',
      'iae',
      'salve',
      'fala primo',
      'iae filhao',
      'amor',
      'oi amor',
      'fala mano'
    ];

    // Verifica se a mensagem recebida está na lista (ignora maiúsculas e minúsculas)
    if (mensagensAutomaticas.includes(message.body.toLowerCase())) {
      client
        .sendText(message.from, 'Olá, essa é uma mensagem automática')
        .then((result) => {
          console.log('Resultado: ', result);
        })
        .catch((erro) => {
          console.error('Erro ao enviar: ', erro);
        });
    }

    // Salva a mensagem no banco de dados
    await Message.create({
      sender: message.from,
      content: message.body
    });
  });
}

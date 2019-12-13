const uuid = require('uuid');
const fs = require('fs');
const { Language, NlpManager } = require('node-nlp')

const manager = new NlpManager({ languages: ['en'] });
manager.container.register('fs', fs);

const nlpService = () => {
  const detectIntent = async (message) => {
      let result;

      if (fs.existsSync('./model.nlp')) {
        await manager.load('./model.nlp');
      }else{
        await train()
      }

      result = await manager.process('en', message);
      console.log(message, result);

      return {response: result.answer}
  };

  const train = async () => {

      // Adds the utterances and intents for the NLP
      manager.addDocument('en', 'goodbye for now', 'greetings.bye');
      manager.addDocument('en', 'bye bye take care', 'greetings.bye');
      manager.addDocument('en', 'okay see you later', 'greetings.bye');
      manager.addDocument('en', 'bye for now', 'greetings.bye');
      manager.addDocument('en', 'i must go', 'greetings.bye');
      manager.addDocument('en', 'hello', 'greetings.hello');
      manager.addDocument('en', 'hi', 'greetings.hello');
      manager.addDocument('en', 'howdy', 'greetings.hello');
      
 

      // Train also the NLG
      manager.addAnswer('en', 'greetings.bye', 'Till next time');
      manager.addAnswer('en', 'greetings.bye', 'see you soon!');
      manager.addAnswer('en', 'greetings.hello', 'Hey there!');
      manager.addAnswer('en', 'greetings.hello', 'Greetings!');

    await manager.train();
    await manager.save();
    return
  }

  return {
    detectIntent
  };
};

module.exports = nlpService;

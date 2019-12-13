const uuid = require('uuid');
const fs = require('fs');
const { NlpManager, ConversationContext } = require('node-nlp')

const classifier = new NlpManager({ languages: ['en'] });
const context = new ConversationContext()


const nlpService = () => {
  const detectIntent = async (message) => {
      let result;

      if (fs.existsSync('./model.nlp')) {
        await classifier.load('./model.nlp');
      }else{
        await train()
      }

      result = await classifier.process('en', message, context);
      console.log(message, result);

      return {response: result.answer}
  };

  const train = async () => {

      // Adds the utterances and intents for the NLP
      classifier.addDocument('en', 'goodbye for now', 'greetings.bye');
      classifier.addDocument('en', 'bye bye take care', 'greetings.bye');
      classifier.addDocument('en', 'okay see you later', 'greetings.bye');
      classifier.addDocument('en', 'bye for now', 'greetings.bye');
      classifier.addDocument('en', 'i must go', 'greetings.bye');
      classifier.addDocument('en', 'hello', 'greetings.hello');
      classifier.addDocument('en', 'hi', 'greetings.hello');
      classifier.addDocument('en', 'howdy', 'greetings.hello');
      classifier.addDocument('en', '%email%', 'input.email');
      
 
      // Train also the NLG
      classifier.addAnswer('en', 'input.email', 'Greetings {{email}}');
      classifier.addAnswer('en', 'greetings.bye', 'Till next time');
      classifier.addAnswer('en', 'greetings.bye', 'see you soon!');
      classifier.addAnswer('en', 'greetings.hello', 'Hey there!');
      classifier.addAnswer('en', 'greetings.hello', 'Greetings!');



    await classifier.train();
    await classifier.save();
    return
  }

  return {
    detectIntent
  };
};

module.exports = nlpService;

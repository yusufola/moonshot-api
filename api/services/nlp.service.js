const uuid = require("uuid");
const fs = require("fs");
const { NlpManager, ConversationContext } = require("node-nlp");
const actionService = require("./action.service");

const nlpService = (req, res, next) => {
  const classifier = new NlpManager({
    languages: ["en"],
    action: actionService(req, res, next)
  });

  const context = new ConversationContext();

  const detectIntent = async message => {
    let result;

    if (fs.existsSync("./model.nlp")) {
      await classifier.load("./model.nlp");
    } else {
      await train();
    }

    result = await classifier.process("en", message, context);
    return { response: result.answer };
  };

  const train = async () => {
    // Adds the utterances and intents for the NLP
    classifier.addDocument("en", "goodbye for now", "greetings.bye");
    classifier.addDocument("en", "bye bye take care", "greetings.bye");
    classifier.addDocument("en", "okay see you later", "greetings.bye");
    classifier.addDocument("en", "bye for now", "greetings.bye");
    classifier.addDocument("en", "i must go", "greetings.bye");
    classifier.addDocument("en", "hello", "greetings.hello");
    classifier.addDocument("en", "hi", "greetings.hello");
    classifier.addDocument("en", "howdy", "greetings.hello");
    classifier.addDocument("en", "%email%", "input.email");
    classifier.addDocument("en", "i want to %string%", "task.add");
    classifier.addDocument("en", "i will %string%", "task.add");
    classifier.addDocument("en", "clear all my tasks", "task.deleteAll");
    classifier.addDocument("en", "delete all my tasks", "task.deleteAll");

    // Train also the NLG
    classifier.addAnswer("en", "input.email", "Greetings {{email}}");
    classifier.addAnswer("en", "greetings.bye", "Till next time");
    classifier.addAnswer("en", "greetings.bye", "see you soon!");
    classifier.addAnswer("en", "greetings.hello", "Hey there!");
    classifier.addAnswer("en", "greetings.hello", "Greetings!");
    classifier.addAnswer("en", "task.add", "{{taskToAdd}}");
    //actions
    classifier.addAction("greetings.hello", "greet", [""]);
    classifier.addAction("task.add", "createTaskAction", [""]);
    classifier.addAction("task.deleteAll", "deleteAllTasksAction", [""]);

    const string = classifier.addRegexEntity("string", "en", /\w/gi);

    await classifier.train();
    await classifier.save();
    return;
  };

  return {
    detectIntent
  };
};

module.exports = nlpService;

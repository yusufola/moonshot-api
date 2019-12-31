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
    //bye
    classifier.addDocument("en", "goodbye for now", "greetings.bye");
    classifier.addDocument("en", "bye bye take care", "greetings.bye");
    classifier.addDocument("en", "okay see you later", "greetings.bye");
    classifier.addDocument("en", "bye for now", "greetings.bye");
    classifier.addDocument("en", "i must go", "greetings.bye");
    //hello
    classifier.addDocument("en", "hello", "greetings.hello");
    classifier.addDocument("en", "hi", "greetings.hello");
    classifier.addDocument("en", "how are you doing", "greetings.hello");
    classifier.addDocument("en", "how far", "greetings.hello");
    classifier.addDocument("en", "hey there", "greetings.hello");
    classifier.addDocument("en", "howdy", "greetings.hello");
    classifier.addDocument("en", "Whats up", "greetings.hello");
    classifier.addDocument("en", "wats up", "greetings.hello");
    classifier.addDocument("en", "wad up", "greetings.hello");

    //input email
    classifier.addDocument("en", "%email%", "input.email");

    //add task
    classifier.addDocument("en", "i want to %string%", "task.add");
    classifier.addDocument("en", "i will %string%", "task.add");

    //clear all tasks
    classifier.addDocument("en", "clear all my tasks", "task.deleteAll");

    //delete task
    classifier.addDocument("en", "delete %number%", "task.delete");

    //mark task as completed
    classifier.addDocument("en", "done with %number%", "task.complete");
    classifier.addDocument("en", "completed task %number%", "task.complete");
    classifier.addDocument("en", "remove %number%", "task.delete");
    classifier.addDocument(
      "en",
      "delete %number% from list of tasks",
      "task.delete"
    );

    // Train also the NLG
    classifier.addAnswer("en", "input.email", "Greetings {{email}}");
    classifier.addAnswer("en", "greetings.bye", "Till next time");
    classifier.addAnswer("en", "greetings.bye", "see you soon!");
    //hello
    classifier.addAnswer("en", "greetings.hello", "Hey there!");
    classifier.addAnswer("en", "greetings.hello", "Greetings!");
    classifier.addAnswer("en", "greetings.hello", "Hi!");
    //add tasks
    classifier.addAnswer("en", "task.add", "{{taskToAdd}}");
    //actions
    classifier.addAction("greetings.hello", "greet", [""]);
    classifier.addAction("task.add", "createTaskAction", [context]);
    classifier.addAction("task.deleteAll", "deleteAllTasksAction", [""]);
    classifier.addAction("task.delete", "deleteTaskAction", [context]);
    classifier.addAction("task.complete", "completeTaskAction", [context]);

    const string = await classifier.addRegexEntity("string", "en", /\w/gi);
    const number = await classifier.addRegexEntity("number", "en", /\d+/g);

    await classifier.train();
    await classifier.save();
    return;
  };

  return {
    detectIntent
  };
};

module.exports = nlpService;

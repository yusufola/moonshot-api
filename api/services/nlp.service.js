const dialogflow = require('dialogflow');
const uuid = require('uuid');

const projectId = process.env.DIALOG_FLOW_PROJECT_ID

const nlpService = () => {
  const detectIntent = async (message) => {
      let result;
      switch (message) {
        case 'Hi':
          response = `Hi, you are not tracking any priorites currently
          `
          break;
          case 'Send 500cedis from Ghana to Nigeria':
          response = `Nice

Exchange rate:  1cedis = 65naira
Receipient gets: 32,522 naira
Transfer fee:  1000

*You send: 33,522 naira*
          `
          break;
      
        default:
          response = "Didn't get that. Please rephrase"
          break;
      }
      return {response}
  };

  return {
    detectIntent
  };
};

module.exports = nlpService;

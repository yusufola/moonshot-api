const dialogflow = require('dialogflow');
const uuid = require('uuid');

const projectId = process.env.DIALOG_FLOW_PROJECT_ID

const nlpService = () => {
  const detectIntent = async (message) => {
      let result;
      switch (message) {
        case 'Hi':
          response = `Hi welcome to Moonshot. 

Which country do you want to send money to and how much?
          
e.g Send 1000 cedis from Ghana to Nigeria
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

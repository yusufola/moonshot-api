const twilio = require("twilio");
const nlpService = require("../services/nlp.service");
const { TWILIO_SID: accountSid, TWILIO_KEY: TwilloAuthToken } = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;

const WhatsappController = () => {
  const incoming = async (req, res, next) => {
    const { body } = req;
    const message = body.Body;
    const twiml = new MessagingResponse();

    try {
      const nlpResult = await nlpService(req, res, next).detectIntent(message);
      const response = nlpResult.response;

      twiml.message(response);
      twiml.message("e.g Launch first startup");

      res.set("Content-Type", "text/xml");

      return res.status(200).send(twiml.toString());
    } catch (error) {
      console.log(error);
      twiml.message("Unable to process your message");

      res.set("Content-Type", "text/xml");

      return res.status(200).send(twiml.toString());
    }
  };

  return {
    incoming
  };
};

module.exports = WhatsappController;

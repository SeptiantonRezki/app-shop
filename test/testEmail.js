const dotenv = require("dotenv");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
dotenv.config({ path: "./config.env" });

const mailjet = require("node-mailjet").connect(
  process.env.EMAIL_USERNAME,
  process.env.EMAIL_PASSWORD
);

const emailKirim = async () => {
  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "septianrezki16@gmail.com",
            Name: "Anton",
          },
          To: [
            {
              Email: "saeanton398@gmail.com",
              Name: "saeanton",
            },
          ],
          Subject: "Your email flight plan!",
          TextPart:
            "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
          HTMLPart:
            '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
        },
      ],
    });
    return request;
  } catch (error) {
    throw error;
  }
};
Promise.all([emailKirim])
  .then((value) => console.log(value.body))
  .catch((err) => console.log(err.message));
// request
//   .then((result) => {
//     console.log(result.body);
//   })
//   .catch((err) => {});

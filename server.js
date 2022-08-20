import express, { response } from "express";
import { Connection } from "./database/db.js";
import dotenv from "dotenv";
import defaultData from "./database/default.js";
import cors from "cors";
import { user } from "./database/userSchema.js";
import { Product } from "./database/Schema.js";
import { v4 as uuid } from "uuid";
import PaytmChecksum from "./paytm/PaytmChecksum.js";
import formidable from "formidable";
import https from "https";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, resp) => {
  const exist = await user.findOne({ userName: req.body.userName });
  if (exist) {
    return resp.status(401).json({ message: "Username already exist" });
  }
  const users = req.body;
  const newUser = new user(users);
  let user1 = await newUser.save();
  resp.send(user1);
});

app.post("/login", async (req, resp) => {
  const userName = req.body.userName;
  const password = req.body.password;

  let users = await user.findOne({ userName: userName, password: password });
  if (users) {
    resp.send(users);
  } else {
    return resp.status(401).json("invalid login");
  }
});

app.get("/products", async (req, resp) => {
  try {
    const product = await Product.find({});
    resp.send(product);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

app.get("/product/:id", async (req, resp) => {
  try {
    let response = await Product.findOne({ id: req.params.id });
    resp.send(response);
  } catch (err) {
    resp.send(err.message);
  }
});

app.post("/payment", async (req, resp) => {
  try {
    let paytmCheckSum = await PaytmChecksum.generateSignature(
      paytmParams,
      paytmMerchantKey
    );

    let params = {
      ...paytmParams,
      'CHECKSUMHASH': paytmCheckSum,
    };

    resp.status(200).json(params);
  } catch (error) {
    resp.send(error);
  }
});

app.post("/callback", (request, response) => {
  const form = new formidable.IncomingForm();
  let paytmCheckSum = request.body.CHECKSUMHASH;
  delete request.body.CHECKSUMHASH;

  var isVerifySignature = PaytmChecksum.verifySignature(
    request.body,
    "bKMfNxPPf_QdZppa",
    paytmCheckSum
  );
  console.log(isVerifySignature);
  if (isVerifySignature) {
    var paytmParams = {};
    (paytmParams["MID"] = request.body.MID),
      (paytmParams["ORDERID"] = request.body.ORDERID),
      PaytmChecksum.generateSignature(paytmParams, "bKMfNxPPf_QdZppa").then(
        function (checksum) {
          paytmParams["CHECKSUMHASH"] = checksum;

          var post_data = JSON.stringify(paytmParams);

          var options = {
            hostname: "securegw-stage.paytm.in",
            port: 443,
            path: "/order/status",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": post_data.length,
            },
          };

          var res = "";
          var post_req = https.request(options, function (post_res) {
            post_res.on("data", function (chunk) {
              res += chunk;
            });

            post_res.on("end", function () {
              let result = JSON.parse(res);
              response.redirect('');
            });
          });
          post_req.write(post_data);
          post_req.end();
        }
      );
  } else {
    console.log("Checksum Mismatched");
  }
});

dotenv.config();



const UserName = process.env.db_user;
const Password = process.env.db_password;

const URL = process.env.MONGODB_URI ||`mongodb+srv://${UserName}:${Password}@ECOMMERCE-WEBSITE.y9tghay.mongodb.net/?retryWrites=true&w=majority`;

let paytmMerchantKey = process.env.Paytm_Merchant_Key;

let paytmParams = {};
(paytmParams["MID"] = process.env.Paytm_Mid),
  (paytmParams["WEBSITE"] = process.env.Paytm_Website),
  (paytmParams["CHANNEL_ID"] = process.env.Paytm_Channel_id),
  (paytmParams["INDUSTRY_TYPE_ID"] = process.env.Paytm_Industry_Type_Id),
  (paytmParams["ORDER_ID"] = uuid()),
  (paytmParams["CUST_ID"] = process.env.Paytm_Cust_Id),
  (paytmParams["TXN_AMOUNT"] = "100"),
  (paytmParams["CALLBACK_URL"] = "callback"),
  (paytmParams["EMAIL"] = "ayushdahala4@gmail.com"),
  (paytmParams["MOBILE_NO"] = "1234567890");

const PORT = process.env.PORT || 8000;
Connection(URL);

if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'))
}

defaultData();
app.listen(PORT, () => {
  console.log("server is running well");
});

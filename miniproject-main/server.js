const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const cors = require("cors");
const Order = require("./Order");
const multer = require("multer");
const Payment = require("./Payment")
const jwt = require("jsonwebtoken")
const Product = require("./Product")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/images', express.static('images'));

var md5 = require("md5");
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "mini-project"
});

app.listen(port, () => {

});

app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    pool.query("SELECT * FROM users WHERE user_name = ? AND user_pwd = MD5(?)", [username, password], function (error, results, fields) {
        if (error) {
            res.json({
                result: false,
                message: error.message
            });
        }

        if (results.length) {
            res.json({
                result: true
            });
        } else {
            res.json({
                result: false,
                message: "ไม่พบ Username หรือ Password ไม่ถูกต้อง",
            });
        }
    });
});


app.post("/api/authen_request", (req, res) => {
    console.log(req.body);
    const sql = "SELECT * FROM users WHERE MD5( user_name ) = MD5(?)";
    pool.query(sql, [req.body.username], (error, results) => {
        var response;
        if (error) {
            response = {
                result: false,
                message: error.message
            };
        } else {
            if (results.length) {
                var payload = { username: req.body.username };
                var secretKey = "MySecretKey";
                const authToKen = jwt.sign(payload, secretKey);
                response = {
                    result: true,
                    data: {
                        auth_token: authToKen
                    }
                };
            } else {
                response = {
                    result: false,
                    message: "Username ไม่ถูกต้อง"
                };
            }
        }

        res.json(response);
    });
});

app.post("/api/access_request", (req, res) => {
    const authenSignature = req.body.auth_signature;
    const authToken = req.body.auth_token;

    var decoded = jwt.verify(authToken, "MySecretKey");

    if (decoded) {
        const query = "SELECT * FROM users WHERE MD5(CONCAT(user_name, '&',user_pwd)) = ?";
        pool.query(query, [authenSignature], (error, results) => {
            var response;
            if (error) {
                response = {
                    result: false,
                    message: error.message
                };
            } else {
                if (results.length) {
                    var payload = {
                        user_id: results[0].user_id, user_name: results[0].username, first_name: results[0].first_name, last_name: results[0].last_name, email: results[0].email, 
                        role_id: results[0].role_id
                    };
                    const accessToken = jwt.sign(payload, "MySecretKey");
                    response = { result: true, data: { access_token: accessToken, account_info: payload } };
                } else {
                    response = { result: false, message: "Username หรือ Password ไม่ถูกต้อง" };
                }
            }
            res.json(response);
        });
    }
});

app.get("/api/product", (req, res) => {
    pool.query("SELECT * FROM products", function (error, results, fields) {
        if (error) {
            res.json({
                result: false,
                message: error.message
            });
        }

        if (results.length) {
            res.json({
                data: results
            });
        }
    });
});

app.post("/api/order/add", async (req, res) => {
    const input = req.body;

    try {
        var result = await Order.createOrder(pool, input.user_id, input.image_url, input.product_name, input.topping, input.amount
            , input.total_price, input.address, input.number, input.ware);
        res.json({
            result: true,
        });
    } catch (ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post("/api/order", (req, res) => {
    var user_id = req.body.user_id;
    pool.query("SELECT * FROM oder WHERE user_id = ?", [user_id], function (error, results, fields) {
        if (error) {
            res.json({
                result: false,
                message: error.message
            });
        }
        res.json({
            data: results
        });
    });
});

app.post("/api/order/delete", async (req, res) => {
    const input = req.body;

    try {
        var result = await Order.deleteOrder(pool, input.order_id);
        res.json({
            result: true,
        });
    } catch (ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
});

app.post("/api/payment/create", (req, res) => {
    var fileName;

    var storage = multer.diskStorage({
        destination: (req, file, cp) => {
            cp(null, "bill");
        },
        filename: (req, file, cp) => {
            fileName = file.originalname;
            cp(null, fileName);
        }
    })

    var upload = multer({ storage: storage }).single('image');

    upload(req, res, async (err) => {
        if (err) {
            res.json({
                result: false,
                message: err.message
            });
        } else {
            var result = Payment.createPayment(pool, req.body.order_id, req.body.date, req.body.total_price, req.body.image_name);

            res.json({
                result: true,
                data: fileName
            });
        }
    });

});

app.post("/api/product/create", (req, res) => {
    var fileName;

    var storage = multer.diskStorage({
        destination: (req, file, cp) => {
            cp(null, "images");
        },
        filename: (req, file, cp) => {
            fileName = file.originalname;
            cp(null, fileName);
        }
    })

    var upload = multer({ storage: storage }).single('image');

    upload(req, res, async (err) => {
        if (err) {
            res.json({
                result: false,
                message: err.message
            });
        } else {
            var result = Product.createProduct(pool, req.body.product_name, req.body.price, req.body.stock, req.body.image_url);

            res.json({
                result: true,
                data: fileName
            });
        }
    });

});

app.post("/api/product/update", (req, res) => {
    var fileName;

    var storage = multer.diskStorage({
        destination: (req, file, cp) => {
            cp(null, "images");
        },
        filename: (req, file, cp) => {
            fileName = file.originalname;
            cp(null, fileName);
        }
    })

    var upload = multer({ storage: storage }).single('image');

    upload(req, res, async (err) => {
        console.log(req.body)
        if (err) {
            res.json({
                result: false,
                message: err.message
            });
        } else {
            var result = Product.updateProduct(pool, req.body.product_id, req.body.product_name, req.body.price, req.body.image_url, req.body.stock);

            res.json({
                result: true,
                data: fileName
            });
        }
    });

});

app.post("/api/product/delete", async (req, res) => {
    const input = req.body;

    try {
        var result = await Product.deleteProduct(pool, input.product_id);
        res.json({
            result: true,
        });
    } catch (ex) {
        res.json({
            result: false,
            message: ex.message
        });
    }
});
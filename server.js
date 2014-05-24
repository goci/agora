var express = require('express');
var app = express();

app.use(express.static(__dirname + "/parse/public/"));
app.listen(process.env.PORT || 8000);
console.log("Server started at port 8000");

//console.log("hello");

const http = require("http");

const routes = require("./routes");
const app = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/createUser") {
    const arr = [];
    req.on("data", (x) => {
      arr.push(x);
    });

    req.on("end", () => {
      const parsedArr = Buffer.concat(arr).toString();
      console.log(parsedArr);
    });

    res.end();
  }
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Task</title></head>");
    res.write("<body> <h1>Page 1</h1></body>");
    res.write(" </html>");

    res.end();
  }
});



app.listen(3000);

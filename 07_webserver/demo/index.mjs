import http from "http";
import fs from "fs";
import sharp from "sharp";

const server = http.createServer((req, res) => {

    // console.log(req);
   
    if (req.url === "/") {
        req.on("data", (data) => {
            fs.writeFileSync("./example_2.png", data);

            sharp("./example_2.png")
                .resize(100, 100)
                .toFile("./example_3.png")
                .then((data) => {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({
                        message: "Image resized"
                    }));
                });

            // res.writeHead(200, { "Content-Type": "image/png" });
            // res.end(fs.readFileSync("./example.png"));
        });


    }
    else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Hello World</h1>");
    }
});


server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
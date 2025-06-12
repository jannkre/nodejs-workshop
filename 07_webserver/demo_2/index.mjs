import "dotenv/config";
import http from "http";
import { writeFileSync,readFile } from "fs";
import { stat } from "fs/promises";


let server = http.createServer(async (req, res) => {

    let url = new URL(req.url, `http://localhost:${process.env.PORT}`);
    console.log(url);

    if (url.pathname === "/") {

    }
    else if (url.pathname === "/president") 
    {
        let q = url.searchParams.get("q");
        console.log(q);

        let resp = await fetch("https://api.sampleapis.com/presidents/presidents");
        let presidents = await resp.json();

        presidents = presidents.filter(president => president.name.toLowerCase().includes(q.toLowerCase()));

        for (let president of presidents) {
            try {
                let stats = await stat(`./files/${president.id}.jpg`);
                if (stats.isFile()) {
                    president.image = `http://localhost:${process.env.PORT}/president/image?id=${president.id}`;
                }
            } catch (error) {}
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(presidents));
    }
    else if (url.pathname === "/president/image") 
    {
        if (req.method === "PUT") 
        {
            req.on("data", async (data) => {
                writeFileSync(`./files/${url.searchParams.get("id")}.jpg`, data);
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "Image uploaded"
                }));
            });
        }
        else if (req.method === "GET") {
            readFile(`./files/${url.searchParams.get("id")}.jpg`, (err, data) => {
                if (err) {
                    res.writeHead(404, { "Content-Type": "text/html" });
                    res.end("<h1>404 Not Found</h1>");
                } else {
                    res.writeHead(200, { "Content-Type": "image/jpeg" });
                    res.end(data);
                }
            });
        }
    }
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>");
    }
    
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
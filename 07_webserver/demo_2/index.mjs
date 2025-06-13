import "dotenv/config";
import http from "http";
import { writeFileSync, readFile, readFileSync } from "fs";
import { stat } from "fs/promises";
import { S3 } from "@aws-sdk/client-s3";


let server = http.createServer(async (req, res) => {

    let url = new URL(req.url, `http://localhost:${process.env.PORT}`);
    console.log(url);

    if (url.pathname === "/") {

    }
    else if (url.pathname === "/president/read-image") 
    {
        let id = url.searchParams.get("id");

        readFile(`./files/${id}.jpg`, (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>404 Not Found</h1>");
            } else {
                res.writeHead(200, { "Content-Type": "image/jpeg" });
                res.end(data);
            }
        });
    }
    else if (url.pathname === "/president") 
    {
        let q = url.searchParams.get("q");
        console.log(q);

        let resp = await fetch("https://api.sampleapis.com/presidents/presidents");
        let presidents = await resp.json();

        presidents = presidents.filter(president => president.name.toLowerCase().includes(q.toLowerCase()));

        // for (let president of presidents) {
        //     try {
        //         let stats = await stat(`./files/${president.id}.jpg`);
        //         if (stats.isFile()) {
        //             president.image = `http://localhost:${process.env.PORT}/president/image?id=${president.id}`;
        //         }
        //     } catch (error) {}
        // }
        for (let president of presidents) {
            president.image = `http://localhost:${process.env.PORT}/president/image?id=${president.id}`;
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(presidents));
    }

    else if (url.pathname === "/president/image") 
    {
        if (req.method === "PUT") 
        {
            req.on("data", async (data) => {

                let s3 = new S3({
                    region: "eu-central-1",
                    credentials: {
                        accessKeyId: null,
                        secretAccessKey: null
                    }
                });
                await s3.putObject({
                    Bucket: "nodejs-workshop",
                    Key: `presidents/${url.searchParams.get("id")}.jpg`,
                    Body: data
                });

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    message: "Image uploaded"
                }));
            });
        }
        else if (req.method === "GET") {
            readFile(`./files/${url.searchParams.get("id")}.jpg`, async(err, data) => {
                if (err) {
                    await fetch("https://api.sampleapis.com/presidents/presidents");
                    let data = await resp.json();
                    data = data.find(president => president.id === url.searchParams.get("id"));
                    res.writeHead(302, { "Location": data.photo });
                    res.end();
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
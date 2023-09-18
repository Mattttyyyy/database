const HTTP = require(`http`);
const PORT = 3005;

//mock database
let directory = [
    {
        "name": "Brandon01_test",
        "email": "brandon@mail.com"
    },
    {
        "name": "Jobert_02_test",
        "email": "jobert@mail.com"
    },
    {
        "name": "Matilda",
        "email": "matilda@mail.com"
    }
]

HTTP.createServer((req, res)=>{
    console.log(`test`);

    if(req.url == `/users` && req.method == `GET`){
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(`This is from GET request`);

    } else if (req.url == `/products` && req.method == "POST"){
        // const reqBody = JSON.parse(req.body)
        // console.log(req.body)
        let reqBody = "";

        req.on("data", (data) => {
            console.log(data);
            console.log(typeof data); //object

            reqBody += data;
        })

        req.on("end", () => {
            console.log(reqBody); //{"user":"Carine", "product":"Barbie"}
            console.log(typeof reqBody);//string;

            reqBody = JSON.parse(reqBody)
            console.log(reqBody);

            let sentence = `Hi I'm ${reqBody.user} and my favorite toy is ${reqBody.product}.`
            
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(JSON.stringify(sentence));
            res.end();

        })

       // res.write(JSON.parse(reqBody));
    
    } else if (req.url === "/directory" && req.method == "POST"){

        //Mini Activity:
        //create a new route "/directory" and http method to POST
        //add the new object to be recieved from request body in the the mock database
        //return the whole mock database (including the newly added object) as a response to the client.
        let reqBody ="";

        req.on("data", (data) => {
            reqBody += data
        })

        req.on("end", () => {
            reqBody = JSON.parse(reqBody);
            console.log(reqBody);
            directory.push(reqBody);

            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write(`Added new element`);
            res.write(JSON.stringify(directory));
            res.end();
        })

    } 
}).listen(PORT, ()=> console.log(`Server connected to port ${PORT}`));

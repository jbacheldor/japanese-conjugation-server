import express from "express";
import Controller from "./controllers/controller";

// sets up to parse json work loads

class App {
    public app: express.Application;
    // const app = express();
    public port: string | number;

    constructor(controllers: Controller[]){
        this.app = express();
        this.port =  8000;
        var bodyParser = require('body-parser')
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        
        this.initializerControllers(controllers);
    }

    private initializerControllers(controllers: any[]){
        controllers.forEach((controller)=> {
            this.app.use("/", controller.router);
        })
    }

    public listen() {
        const server = this.app.listen(this.port, () => {
            console.log("listening on server", this.port);
        })
        return server;
    }

}

export default App
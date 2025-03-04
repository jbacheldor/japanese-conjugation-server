import App from ".";
import ConjugationController from "./controllers/conjugationsController";

const app = new App(
    [new ConjugationController()]
)

const server = app.listen();

process.on('SIGTERM', () => {
    server.close(() => {
        console.log("stopping server due to reasons");
        process.exit();
    })
})
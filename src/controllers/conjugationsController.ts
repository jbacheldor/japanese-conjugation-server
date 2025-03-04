import autobind from "autobind-decorator";
import express from "express";
import Controller from "./controller";

export default class ConjugationController implements Controller {
    private _router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    get router() {
        return this._router;
    }

    initializeRoutes() {
        this._router.get("/titles", this.getTitle);
        this._router.get("/getconjugations", this.getConjugations);
        this._router.post("/results", this.getResults);
    }

    @autobind
    async getTitle(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) {
        let lowerTitle = req.query.language.toLowerCase()

        const times = {
            "japanese": {
                title: 'なんじですか'
            },
            "korean": {
                title: '몇 시예요?'
            },
            "urdu": {
                title: 'وقت کیا ہوا ہے؟'
            }
        }
    
        if (lowerTitle in times) {
            res.send(times[lowerTitle])
        } else {
            res.send({
                title: 'error !'
            })
        }
        next();
    }


    @autobind
    async getConjugations(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) {
        try {
            if (req.query.language == "japanese") {
                // res.send(JapaneseRules)
            }
            next();
        } catch (err: any) {
            console.log(err);
            return next(err);
        }
    }

    //  this should calculate the amount of correct results and return it!!
    @autobind
    async getResults(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) {
        try {
            const results = "insert function of sorts here"
            res.send(results)
            next();
        } catch (err: any) {
            console.log(err);
            return next(err);
        }
    }
}


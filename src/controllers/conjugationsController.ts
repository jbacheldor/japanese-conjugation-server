import autobind from "autobind-decorator";
import express from "express";
import Controller from "./controller";
import jsondata from "../data/local-data.json"
import formdata from "../data/local-data-forms.json"

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
        this._router.get("/genkiChapters", this.getGenkiChapters);
    }

    @autobind
    async getGenkiChapters(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) {
        try {
            // basically for all the forms introduced in the chapters included
            // we want to join at the list the chapters inclusive and only show those forms
            // kind of like select (word, hiragana, & forms) from forms where chapters == 'req.query.chapters' right join on words where chapters == chapters
            let goldenList = []
            var potentialvalues = jsondata.filter((row) => req.query.chapters.includes(row["chapter"]))
            var forms = formdata.filter((form)=> req.query.chapters.includes(form["chapter"]))

            // constructs the object we can send back!
            let goldenObject = {
                word: '',
                dictionary_form_hiragana: ''
            }
            forms.forEach((form)=> {
                goldenObject = {
                    ...goldenObject,
                    [form.form_type]: ''
                }
            })

            const keys = Object.keys(goldenObject)

            potentialvalues.forEach((word)=> {
                let goldengoose = {}
                keys.forEach((value)=> {

                    goldengoose = {
                        ...goldengoose,
                        [value]: word[value]
                    }
                })
                goldenList.push(goldengoose)
            })

            res.send(goldenList)
            next();
        } catch (err: any) {
            console.log(err);
            return next(err);
        }
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


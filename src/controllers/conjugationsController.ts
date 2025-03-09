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
        this._router.get("/genkiChapters", this.getGenkiChapters);
        this._router.post("/getGenkiResults", this.getGenkiResults);
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

    //  this should calculate the amount of correct results and return it!!
    @autobind
    async getGenkiResults(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) {
        try {
            console.log('request body', req.body)
            let correct = 0;
            req.body.guesses.forEach((guess)=> {
                let found = jsondata.find((record)=> record["word"] == guess.word)
                // need to check the form value and the 
                if(found){
                    if(guess.answer ==  found[guess.form]){
                        correct += 1
                    }
                }
            })
            let returnValue = {
                "overallScore": correct / req.body.guesses.length
            }
            res.send(returnValue)
            next();
        } catch (err: any) {
            console.log(err);
            return next(err);
        }
    }
}


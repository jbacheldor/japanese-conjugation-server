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
                dictionary_form_hiragana: '',
                type: ''
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
            let forms = {}
            let genkiChapters = {}
            let type = {}

            let correct = 0;
            req.body.guesses.forEach((guess)=> {
                let found = jsondata.find((record)=> record["word"] == guess.word)
                
                // need to check the form value and the 
                if(found){
                    // add to overall correct form
                    if(guess.answer ==  found[guess.form]){
                        correct += 1
                    
                        // if the form already exists in the dictionary just add to the overall count
                        if(Object.keys(forms).includes(guess.form)){
                            forms[guess.form] = {
                                correct: forms[guess.form].correct += 1,
                                total: forms[guess.form].total += 1
                            }
                        }
                        else {
                            forms[guess.form] = {
                                correct: 1,
                                total: 1
                            }
                        }
                        if(Object.keys(type).includes(guess.type)){
                            type[guess.type] = {
                                correct: type[guess.type].correct += 1,
                                total: type[guess.type].total += 1
                            }
                        }
                        else {
                            type[guess.type] = {
                                correct: 1,
                                total: 1
                            }
                        }

                    }
                    else {
                        // if the form already exists in the dictionary just add to the overall count
                        if(Object.keys(forms).includes(guess.form)){
                            forms[guess.form] = {
                                ...forms[guess.form],
                                total: forms[guess.form].total += 1
                            }
                        }
                        else {
                            forms[guess.form] = {
                                correct: 0,
                                total: 1
                            }
                        }

                        if(Object.keys(type).includes(guess.type)){
                            type[guess.type] = {
                                ...type[guess.type],
                                total: type[guess.type].total += 1
                            }
                        }
                        else {
                            type[guess.type] = {
                                correct: 0,
                                total: 1
                            }
                        }
                    }
            }
            })

            // goes through and updates percentage
            Object.keys(forms).forEach((key)=> {
                forms[key]= forms[key].correct / forms[key].total
            })
            Object.keys(type).forEach((key)=> {
                type[key]= type[key].correct / type[key].total
            })

            let returnValue = {
                "overallScore": correct / req.body.guesses.length,
                "forms": forms,
                "chapters": genkiChapters,
                "type": type
            }
            res.send(returnValue)
            next();
        } catch (err: any) {
            console.log(err);
            return next(err);
        }
    }
}


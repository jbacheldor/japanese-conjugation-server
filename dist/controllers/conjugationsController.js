"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const autobind_decorator_1 = __importDefault(require("autobind-decorator"));
const express_1 = __importDefault(require("express"));
const local_data_json_1 = __importDefault(require("../data/local-data.json"));
const local_data_forms_json_1 = __importDefault(require("../data/local-data-forms.json"));
class ConjugationController {
    constructor() {
        this._router = express_1.default.Router();
        this.initializeRoutes();
    }
    get router() {
        return this._router;
    }
    initializeRoutes() {
        this._router.get("/genkiChapters", this.getGenkiChapters);
        this._router.post("/getGenkiResults", this.getGenkiResults);
    }
    async getGenkiChapters(req, res, next) {
        try {
            // basically for all the forms introduced in the chapters included
            // we want to join at the list the chapters inclusive and only show those forms
            // kind of like select (word, hiragana, & forms) from forms where chapters == 'req.query.chapters' right join on words where chapters == chapters
            let goldenList = [];
            var potentialvalues = local_data_json_1.default.filter((row) => req.query.chapters.includes(row["chapter"]));
            var forms = local_data_forms_json_1.default.filter((form) => req.query.chapters.includes(form["chapter"]));
            // constructs the object we can send back!
            let goldenObject = {
                word: '',
                dictionary_form_hiragana: ''
            };
            forms.forEach((form) => {
                goldenObject = {
                    ...goldenObject,
                    [form.form_type]: ''
                };
            });
            const keys = Object.keys(goldenObject);
            potentialvalues.forEach((word) => {
                let goldengoose = {};
                keys.forEach((value) => {
                    goldengoose = {
                        ...goldengoose,
                        [value]: word[value]
                    };
                });
                goldenList.push(goldengoose);
            });
            res.send(goldenList);
            next();
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    }
    //  this should calculate the amount of correct results and return it!!
    async getGenkiResults(req, res, next) {
        try {
            console.log('request body', req.body);
            let correct = 0;
            req.body.guesses.forEach((guess) => {
                let found = local_data_json_1.default.find((record) => record["word"] == guess.word);
                // need to check the form value and the 
                if (found) {
                    console.log('guess.answer', guess.answer);
                    console.log('guess form', guess.form);
                    console.log('found[guess.form]', found[guess.form]);
                    if (guess.answer == found[guess.form]) {
                        console.log('are we in here??');
                        correct += 1;
                    }
                }
            });
            let returnValue = {
                "overallScore": correct / req.body.guesses.length
            };
            res.send(returnValue);
            next();
        }
        catch (err) {
            console.log(err);
            return next(err);
        }
    }
}
exports.default = ConjugationController;
__decorate([
    autobind_decorator_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.default !== "undefined" && express_1.default.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.default !== "undefined" && express_1.default.Response) === "function" ? _b : Object, typeof (_c = typeof express_1.default !== "undefined" && express_1.default.NextFunction) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ConjugationController.prototype, "getGenkiChapters", null);
__decorate([
    autobind_decorator_1.default,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.default !== "undefined" && express_1.default.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.default !== "undefined" && express_1.default.Response) === "function" ? _e : Object, typeof (_f = typeof express_1.default !== "undefined" && express_1.default.NextFunction) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], ConjugationController.prototype, "getGenkiResults", null);

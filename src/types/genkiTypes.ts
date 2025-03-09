type getChapters = {
    words: genkiWord[]
}

type genkiWord = {
    englishWord: string,
    dictionary_form_hiragana: string,
    forms: forms
}

type forms = {
    present_affirmative_polite?: string,
    present_negative_polite?: string,
    past_affirmative_polite?: string,
    past_negative_poloite?: string
}


type resultsGuess = {
    word: string,
    form: string, 
    answer: string
}

type resultsBody = {
    guesses: resultsGuess[]
}

type resultsReturnValues = {
    overallScore: number,
    adjectivesScore?: number,
    verbsScore?: number,
    formResults: formResults, 
    genkiChapterResults?: GenkiChapterResults,
}
type formResults = {
    present_affirmative_polite_score?: number,
    present_negative_polite_score?: number,
    past_affirmative_polite_score?: number,
    past_negative_polite_score?: number
}

type GenkiChapterResults = {
    one: {
        one?: number,
        two?: number,
        three?: number,
        four?: number,
        five?: number,
        six?: number,
        seven?: number,
        eight?: number,
        nine?: number,
        ten?: number,
        eleven?: number,
        twelve?: number
    }
    two: {
        one?: number,
        two?: number,
        three?: number,
        four?: number,
        five?: number,
        six?: number,
        seven?: number,
        eight?: number,
        nine?: number,
        ten?: number,
        eleven?: number,
        twelve?: number
    }
}
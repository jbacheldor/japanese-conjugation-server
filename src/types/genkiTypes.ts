type getChapters = {
    words: genkiWord[]
}

type genkiWord = {
    englishWord: string,
    dictionary_form_hiragana: string,
    present_affirmative?: string,
    present_negative?: string,
    past_affirmative?: string,
    past_negative?: string
}
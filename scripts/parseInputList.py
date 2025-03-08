import csv
import json


csvfile = open('scripts/japanese_genki_vocab.csv', 'r')
jsonfile = open('src/data/local-data.json', 'w')

fieldnames = ("word","pos","type","dictionary_form_kanji", "dictionary_form_hiragana", "chapter", "present_affirmative_polite", "present_negative_polite", "past_affirmative_polite", "past_negative_polite")

reader = csv.DictReader(csvfile, fieldnames)
jsonfile.write('[')
for row in reader:
    json.dump(row, jsonfile, ensure_ascii=False)
    jsonfile.write(',\n')
jsonfile.write(']')
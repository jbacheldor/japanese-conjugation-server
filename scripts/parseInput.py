import csv
import json


csvfile = open('scripts/japanese_genki_vocab.csv', 'r')
jsonfile = open('src/data/local-data.json', 'w')

fieldnames = ("word","pos","type","dictionary_form_kanji", "dictionary_form_hiragana", "chapter", "present_affirmative", "present_negative", "past_affirmative", "past_negative")

reader = csv.DictReader(csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile, ensure_ascii=False)
    jsonfile.write('\n')
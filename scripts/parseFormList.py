import csv
import json

csvfile = open('scripts/japanese_genki_forms.csv', 'r')
jsonfile = open('src/data/local-data-forms.json', 'w')

fieldnames = ("form_type", "chapter", "type")

reader = csv.DictReader(csvfile, fieldnames)
jsonfile.write('[')
for row in reader:
    json.dump(row, jsonfile, ensure_ascii=False)
    jsonfile.write(',\n')
jsonfile.write(']')
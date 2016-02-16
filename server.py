#!/usr/bin/env python3

from flask import Flask, jsonify, request
from utilities import hash_image
import os

app = Flask(__name__)
# app.debug = True

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/<path:path>')
def static_files(path):
  return app.send_static_file(path)


@app.route('/zoom-levels')
def zoom_levels():
    zoom_dictionary = {
     '0': {'rows': 1,  'cols': 1},
     '1': {'rows': 2,  'cols': 2},
     '2': {'rows': 4,  'cols': 4},
     '3': {'rows': 8,  'cols': 8},
     '4': {'rows': 16, 'cols': 16}
    }
    return jsonify(**zoom_dictionary)


@app.route('/tile')
def get_tile():
    filename = 'hs-2015-02-a-full_jpg.jpg'
    zoom = request.args.get('zoom')
    row = request.args.get('row')
    col = request.args.get('col')
    image_file = hash_image.hash(filename, zoom, row, col)
    image_path = os.path.join('assets', 'images', image_file)
    return jsonify(image=str(image_path))


if __name__ == '__main__':
    app.run()

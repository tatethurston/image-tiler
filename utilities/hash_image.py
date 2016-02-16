import os

def hash(filename, zoom, row, col):
    base, extension = os.path.splitext(filename)
    return '_'.join([base, 'Z' + str(zoom), 'R' + str(row), 'C' + str(col)]) + extension

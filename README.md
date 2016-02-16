# Image_Tiler
A simplified Google Maps. This project consists of a server that allows a user to query for a specific region of a photo at a specified ZoomLevel coupled with a browser UI that lets the user interact with the image data.

It is quite common to generate extremely large images. Downloading these images becomes impractical as the number of downloads increases. A better approach is to allow the user to pan and zoom around a mega-image so that only part of the image needs to be downloaded.

The create_tiles executable preprocesses the image and creates a TileSet for each ZoomLevel.

Example image: [hubble](http://imgsrc.hubblesite.org/hu/db/images/hs-2015-02-a-full_jpg.jpg)

### Getting Started

1. Install Dependencies
```
pip install -r requirements.txt
cd static && npm install
```

3. Launch the Flask server
```
python3 server.py
```

### Example Usage
```
./create_tiles super_large.png
```


### Tech Stack
Backend: Python3, Flask

Frontend: ES6, React

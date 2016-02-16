'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

// fetch polyfill
import 'whatwg-fetch';

const App = () => {
  return <ImageTile />
};


class ImageTile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      row: 0,
      col: 0,
      zoom: 0,
      maxRow: 1,
      maxCol: 1,
      maxZoom: 4
    };
  }

  componentDidMount(){
    this.renderTile();
    this.getLevels();
  }

  getImageTile(row, col, zoom){
    const url = `/tile?row=${row}&col=${col}&zoom=${zoom}`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({image: res.image});
      });
  }

  getLevels(){
    const url = '/zoom-levels';
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({levels: res});
      });
  }

  setZoom(zoom){
    if (zoom >= 0 && zoom <= this.state.maxZoom){
      const maxRow = this.state.levels[zoom].rows;
      const maxCol = this.state.levels[zoom].cols;
      this.setState({
        zoom: zoom,
        maxRow: maxRow,
        maxCol: maxCol
      }, this.renderTile.bind(this));
    }
  }

  setPosition(row, col){
    if (row >= 0 && row < this.state.maxRow &&
        col >= 0 && col < this.state.maxCol){
        this.setState({
          row: row,
          col: col
        }, this.renderTile.bind(this));
    } 
  }

  renderTile(){
    this.getImageTile(this.state.row, this.state.col, this.state.zoom);
  }

  zoomIn(){
    this.setZoom(this.state.zoom + 1);
  }

  zoomOut(){
    this.setZoom(this.state.zoom - 1);
    //if zooming out need to calc new row and col
    this.setPosition(Math.floor( this.state.row / 2),
                     Math.floor( this.state.col / 2));
  }

  moveUp(){
    this.setPosition(this.state.row - 1, this.state.col);
  }

  moveDown(){
    this.setPosition(this.state.row + 1, this.state.col);
  }

  moveRight(){
    this.setPosition(this.state.row, this.state.col + 1);
  }

  moveLeft(){
    this.setPosition(this.state.row, this.state.col - 1);
  }

  render() {
    return (
      <div className="image-viewer">
        <h1>Image Viewer</h1>
        <div className="image-view">
          <img src={this.state.image} />
          <div className="zoom-buttons">
            <button type="button" disabled={this.state.zoom >= this.state.maxZoom} onClick={this.zoomIn.bind(this)}>+</button>
            <button type="button" disabled={this.state.zoom <= 0} onClick={this.zoomOut.bind(this)}>-</button>
          </div>
        </div>
        <div className="navigation-buttons">
          <button type="button" disabled={this.state.row <= 0} onClick={this.moveUp.bind(this)}>Up</button>
          <button type="button" disabled={this.state.row >= this.state.maxRow - 1} onClick={this.moveDown.bind(this)}>Down</button>
          <button type="button" disabled={this.state.col <= 0} onClick={this.moveLeft.bind(this)}>Left</button>
          <button type="button" disabled={this.state.col >= this.state.maxCol - 1} onClick={this.moveRight.bind(this)}>Right</button>
        </div>
      </div>
      )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

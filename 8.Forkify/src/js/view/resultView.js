'use state';
///////////
// 3.) View
// Which Include 1.Presentation Logic(UI Layer)
//////////

import View from './view.js';
import PreviewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //(Importing Image)

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No Recipes found for your query! Please try again :)`;
  _message = '';

  _generateMarkup() {
    //console.log(this._data);
    return this._data.map(result => PreviewView.render(result, false)).join('');
  }
}

export default new ResultsView();

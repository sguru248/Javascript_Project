'use state';
///////////
// 3.) View
// Which Include 1.Presentation Logic(UI Layer)
//////////

import View from './view.js';
import PreviewView from './previewView.js';

import icons from 'url:../../img/icons.svg'; //(Importing Image)

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No Bookmarks Yet. Find a nice recipe and bookmark it :)`;
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    //console.log(this._data);
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();

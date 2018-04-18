# React Toastify Redux
Wraps [react-toastify](https://github.com/fkhadra/react-toastify) into a component and exposes actions and reducer.

## Installation
```
$ npm install --save react-toasify-redux
$ yarn add react-toastify-redux
```

## Usage
1. Import the reducer and pass it to your combineReducers:
```javascript
import {combineReducers} from 'redux';
import {toastsReducer as toasts} from 'react-toasify-redux';

export default combineReducers({
    // ...other reducers
    toasts
});
```

2. Include the toast contoller in main view.
```javascript
import {ToastController} from 'react-toasify-redux';

export default () => {
    return (
        <div>
            ...
            <ToastController />
        </div>
    );
};
```

### Properties
It accepts all properties as react-toastify does, actually it pipes them in the react-toastify.

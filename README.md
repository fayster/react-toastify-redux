# React Toastify Redux [![Build Status](https://travis-ci.org/fayster/react-toastify-redux.svg?branch=develop)](https://travis-ci.org/fayster/react-toastify-redux) [![npm version](https://badge.fury.io/js/react-toastify-redux.svg)](https://badge.fury.io/js/react-toastify-redux) [![npm](https://img.shields.io/npm/dm/react-toastify-redux.svg)](https://github.com/fayster/react-toastify-redux) [![Coverage Status](https://coveralls.io/repos/github/fayster/react-toastify-redux/badge.svg?branch=develop)](https://coveralls.io/github/fayster/react-toastify-redux?branch=master)



Wraps [react-toastify](https://github.com/fkhadra/react-toastify) into a component and exposes actions and reducer.

## Installation
```
$ npm install --save react-toasify-redux
$ yarn add react-toastify-redux
```

## Usage
Import the reducer and pass it to your combineReducers:
```javascript
import {combineReducers} from 'redux';
import {toastsReducer as toasts} from 'react-toasify-redux';

export default combineReducers({
    // ...other reducers
    toasts
});
```

Include the toast controller in main view:
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

### Actions
Use actions for create, update and remove toasts:

```javascript
import {dismiss, update, error, message, warning, success, info} from 'react-toastify-redux';

dispatch(dismiss(id));
dispatch(dismiss()); // dismiss all toasts
dispatch(update(id, options));
dispatch(message('Default message'));
dispatch(success('Success message'));
dispatch(error('Error message'));
dispatch(warning('Warning message'));
dispatch(info('Info message'));
```

### Customization toast
Create toast component
```javascript
export default ({ header, message }) => (
    <div className='toast'>
        <div className='header'>{header}</div>
        <div className='message'>{message}</div>
    </div>
);
```

Include this component in ToastConroller
```javascript
import {ToastController} from 'react-toasify-redux';
import CustomToastComponent from 'awesome-folder/custom-toast-component';

export default () => {
    return (
        <div>
            ...
            <ToastController toastComponent={CustomToastComponent} />
        </div>
    );
};
```

## API

### ToastContainer
ToastContainer extends properties from ToastContainer in react-toastify. Also have new properties:

| Props          | Type                    | Default | Description                                      |
|----------------|-------------------------|---------|--------------------------------------------------|
| toastComponent | ComponentClass or false |   -     |  Element that will be displayed after emit toast |

### Dismiss
| Parameter | Type   | Required | Description                                                              |
|-----------|--------|----------|--------------------------------------------------------------------------|
| toast id  | string | ✘        | Id toast for dismiss. If call action without id, then dismiss all toasts |

### Update
| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| toast id  | string | ✓        | Id toast for update  |
| options   | object | ✘        | Options listed below |
* Available options :
	* [See: Toast Base Options](#toast-base-option)
	* message: toast message for update

### Toast Actions (Message, Success, Info, Warning, Error)
| Parameter | Type   | Required | Description          |
|-----------|--------|----------|----------------------|
| message   | string | ✓        | Message for toast    |
| options   | object | ✘        | Options listed below |
* Available options :
	* [See: Toast Base Options](#toast-base-option)
	* id: custom id for a toast. By default in generated automatically.


### <a name="toast-base-option">Toast Base Options</a>
| Parameter              | Type    | Default | Description          |
|------------------------|---------|---------|----------------------|
| renderDefaultComponent | boolean | false   | Render default toast component? Use this propery if using custom toast component. |
| title | string | '' | Title for custom toast component
| type | One of: 'info', 'success', 'warning', 'error', 'default' | 'default' | Toast type
| autoClose | number or false | 5000 | Set the delay in ms to close the toast automatically
| hideProgressBar | boolean | false | Hide or show the progress bar
| position | One of: 'top-right', 'top-center', 'top-left', 'bottom-right', 'bottom-center', 'bottom-left' | 'top-right' | Set the default position to use
| pauseOnHover | boolean | true | Pause the timer when the mouse hover the toast
| className | string or object | - | An optional css class to set
| bodyClassName | string or object | - | An optional css class to set for the toast content.
| progressClassName | string or object | - | An optional css class to set for the progress bar.
| draggable | boolean | true | Allow toast to be draggable
| draggablePercent | number | 80 | The percentage of the toast's width it takes for a drag to dismiss a toast

## License
Licensed under MIT
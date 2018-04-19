# React Toastify Redux
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
export default ({ type, message }) => (
    <div className='toast'>
        <div className='header'>{type}</div>
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
| type <td colspan=3>same as ToastContainer
| autoClose <td colspan=3>same as ToastContainer
| hideProgressBar <td colspan=3>same as ToastContainer
| position <td colspan=3>same as ToastContainer
| pauseOnHover <td colspan=3>same as ToastContainer
| className <td colspan=3>same as ToastContainer
| bodyClassName <td colspan=3>same as ToastContainer
| progressClassName <td colspan=3>same as ToastContainer
| draggable <td colspan=3>same as ToastContainer
| draggablePercent <td colspan=3>same as ToastContainer

## License
Licensed under MIT
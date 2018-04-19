import React from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {connect} from "react-redux";
import compare from './utils/compare';
import {dismiss} from "./actions";
import {Toast, StateProps, DispatchProps, ToastIds, OwnProps} from './interfaces';

type ToasterContainerProps = OwnProps & StateProps & DispatchProps;

class ToasterContainer extends React.Component<ToasterContainerProps> {
  private _toastIds: ToastIds = {};

  onCloseHandler = (storageToastId: string) => {
    const {[storageToastId]: _toastId, ...toastIds} = this._toastIds;
    this._toastIds = toastIds;

    toast.dismiss(_toastId);
    this.props.dismiss(storageToastId);
  };

  componentWillReceiveProps(nextProps: ToasterContainerProps) {
    nextProps.toastList.forEach((toastItem: Toast) => {
      // new toast
      if (!(toastItem.id in this._toastIds)) {
        this._toastIds[toastItem.id] = (nextProps.toastComponent && !toastItem.renderDefaultComponent)
          ? toast(React.createElement(nextProps.toastComponent, toastItem), {
              type: toastItem.type,
              onClose: () => this.onCloseHandler(toastItem.id)
            })
          : toast(toastItem.message, {
              type: toastItem.type,
              onClose: () => this.onCloseHandler(toastItem.id)
            });
      }

      // update toast
      const fountToast = this.props.toastList.find(toast => toast.id === toastItem.id);
      if (fountToast && !compare(toastItem, fountToast)) {
        toast.update(this._toastIds[toastItem.id], {
          type: toastItem.type,
          render: (nextProps.toastComponent && !toastItem.renderDefaultComponent)
            ? React.createElement(nextProps.toastComponent, toastItem)
            : undefined
        });
      }
    });

    // delete toast
    this.props.toastList
      .filter((toastItem: Toast) => {
        const foundItem = nextProps.toastList.find(nextToastItem => nextToastItem.id === toastItem.id);
        return !foundItem && toastItem.id in this._toastIds;
      })
      .forEach((doomedToast) => this.onCloseHandler(doomedToast.id));
  }

  shouldComponentUpdate(nextProps: ToasterContainerProps) {
    return this.props !== nextProps;
  }

  render() {
    const {dismiss, toastList, toastComponent, ...rest} = this.props;

    return (
      <ToastContainer {...rest} />
    );
  }
}

const mapStateToProps = (state): StateProps => ({
  toastList: state.toasts
});

const mapDispatchToProps = (dispatch): DispatchProps => ({
  dismiss: (id) => dispatch(dismiss(id))
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ToasterContainer);

import React, {ComponentClass, SFC} from 'react';
import {toast, ToastContainer as ReactToastContainer, ToastContainerProps, ToastOptions} from 'react-toastify';
import {connect} from "react-redux";
import compare from './utils/compare';
import {dismiss} from "./actions";
import {Toast, ToastComponentAdditionalProps} from './definitions';

interface ToastIds {
  [storageToastId: string]: number;
}

type ToasterContainerProps = OwnProps & StateProps & DispatchProps;

export class ToastContainer extends React.Component<ToasterContainerProps> {
  private _toastIds: ToastIds = {};

  private getCustomComponentProps = (toastItem: Toast): ToastComponentAdditionalProps => {
    const {id, message, title=''} = toastItem;

    return {
      id,
      message,
      title
    };
  };

  private getToastOptions = (toastItem: Toast): ToastOptions => {
    const {
      id,
      message,
      title,
      renderDefaultComponent,
      ...options
    } = toastItem;

    return {
      onClose: () => this.onCloseHandler(id),
      ...options
    };
  };

  private renderToasts = (nextProps: ToasterContainerProps) => {
    nextProps.toastList.forEach((toastItem: Toast) => {
      const {renderDefaultComponent = false} = toastItem;

      // new toast
      if (!(toastItem.id in this._toastIds)) {
        this._toastIds[toastItem.id] = (nextProps.toastComponent && !renderDefaultComponent)
          ? toast(
              React.createElement(
                nextProps.toastComponent,
                this.getCustomComponentProps(toastItem)
              ),
              this.getToastOptions(toastItem)
            )
          : toast(toastItem.message, this.getToastOptions(toastItem));
      }

      // update toast
      const foundToast = this.props.toastList.find(toast => toast.id === toastItem.id);
      if (foundToast && (!compare(toastItem, foundToast) || nextProps.toastComponent !== this.props.toastComponent)) {
        toast.update(this._toastIds[toastItem.id], {
          ...this.getToastOptions(toastItem),
          render: (nextProps.toastComponent && !renderDefaultComponent)
            ? React.createElement(nextProps.toastComponent, this.getCustomComponentProps(toastItem))
            : toastItem.message
        });
      }
    });

    // delete toast
    this.props.toastList
      .filter((toastItem: Toast) => {
        const foundItem = nextProps.toastList.find(nextToastItem => nextToastItem.id === toastItem.id);
        return !foundItem && toastItem.id in this._toastIds;
      })
      .forEach((doomedToast) => this.closeToast(doomedToast.id));
  };

  private closeToast = (storageToastId: string) => {
    /* istanbul ignore next */
    const {[storageToastId]: _toastId, ...toastIds} = this._toastIds;
    this._toastIds = toastIds;

    toast.dismiss(_toastId);
  };

  private onCloseHandler = (storageToastId: string) => {
    this.closeToast(storageToastId);
    this.props.dismiss(storageToastId);
  };

  public componentDidMount() {
    this.renderToasts(this.props);
  }

  public componentWillUnmount() {
    this.props.dismiss();
    this._toastIds = {};
  }

  public componentWillReceiveProps(nextProps: ToasterContainerProps) {
    this.renderToasts(nextProps);
  }

  public shouldComponentUpdate(nextProps: ToasterContainerProps) {
    return this.props !== nextProps;
  }

  public render() {
    const {dismiss, toastList, toastComponent, ...rest} = this.props;

    return (
      <ReactToastContainer {...rest} />
    );
  }
}

export interface OwnProps extends ToastContainerProps {
  toastComponent?: SFC<Toast> | ComponentClass<Toast> | string;
}

export interface StateProps {
  toastList: Toast[];
}

const mapStateToProps = (state): StateProps => ({
  toastList: state.toasts
});

export interface DispatchProps {
  dismiss(id?: string): void;
}

const mapDispatchToProps = (dispatch): DispatchProps => ({
  dismiss: (id) => dispatch(dismiss(id))
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ToastContainer);

require('../scss/index.scss');

import React from 'react'
import { BaseApp, Storage, Tools } from '../../../base/';
import AccountStore from '../stores/AccountStore';
import AccountActions from '../actions/AccountActions';
import MeiForm from '../components/MeiForm';
import BaseConfig from '../../../config/BaseConfig'

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getAppState() {
    return {
        data: {
            imageUrl: AccountStore.getImageUrl(),
            sequence: AccountStore.getSequence()
        },
        isLoginSuccess: AccountStore.getLoginSuccess()
    };
}

class AccountApp extends BaseApp {
    constructor(props) {
        super(props);

        this.state = getAppState();
    }

    componentDidMount() {
        AccountStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        AccountStore.removeChangeListener(this._onChange);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isLoginSuccess) {
            let backLink = Storage.get('BackLink');
            let from = Tools._GET().from;
            if (backLink) {
                this.props.history.push(BaseConfig.PATH + backLink);
                Storage.remove('BackLink');
            } else if (from) {
                location.href = decodeURIComponent(from);
            } else {
                this.props.history.push(BaseConfig.PATH + '/');
            }
        }
    }

    /**
     * @return {object}
     */
    render() {
        return (
            <div>
                <div className="mei-login-bg"></div>
                <MeiForm 
                    options={this.state.data}
                    onSubmit={AccountActions.login.bind(AccountActions)} 
                    onCodeClick={AccountActions.createCaptcha.bind(AccountActions)}/>
            </div>
        );
    }

    /**
     * Event handler for 'change' events coming from the AccountStore
     */
    _onChange() {
        this.setState(getAppState());
    }

}

export default AccountApp;

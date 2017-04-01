require('../scss/index.scss');

import React from 'react'
import AccountStore from '../stores/AccountStore';
import AccountActions from '../actions/AccountActions';
import MeiForm from '../components/MeiForm';

/**
 * Retrieve the current TODO data from the TodoStore
 */
function getAppState() {
    return {
        data: {
            imageUrl: AccountStore.getImageUrl(),
            sequence: AccountStore.getSequence()
        }
    };
}

var AccountApp = React.createClass({

    getInitialState: function () {
        return getAppState();
    },

    componentDidMount: function () {
        AccountStore.addChangeListener(this._onChange);
        AccountActions.createCaptcha();
    },

    componentWillUnmount: function () {
        AccountStore.removeChangeListener(this._onChange);
    },

    /**
     * @return {object}
     */
    render: function () {
        return (
            <div>
                <div className="mei-login-bg"></div>
                <MeiForm 
                    options={this.state.data}
                    onSubmit={AccountActions.login.bind(AccountActions)} 
                    onCodeClick={AccountActions.createCaptcha.bind(AccountActions)}/>
            </div>
        );
    },

    /**
     * Event handler for 'change' events coming from the AccountStore
     */
    _onChange: function () {
        this.setState(getAppState());
    }

});

export default AccountApp;
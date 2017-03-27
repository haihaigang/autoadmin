import AccountLoginReq from "../robot/AccountLoginReq";

class AccountReq {
    login() {
        new AccountLoginReq({
            type: 'GET'
        }, {
            a: 1,
            b: 2,
            c: 3
        }, function(response) {
            console.log('success result is processing.');
        }, function(textStatus, data) {
            console.log('error, something wrong');
        }).send();

        var req = new AccountLoginReq();
        req.setOptions({
            contentType: 'formData'
        });
        req.setSimpleParams('haigang@meigo.com', '123456', 9090);
        // req.setComplexParams({
        //     username: 'haigang@meigo.com',
        //     password: '123456',
        //     vcode: 9891
        // });
        req.setSuccessFn(function(response) {
            console.log('success result is processing.');
        });
        req.setErrorFn(function(textStatus, data) {
            console.log('error, something wrong');
        });

        req.send();
    }

    logout() {
        AccountLoginReq.send();
    }
}

export default new AccountReq();

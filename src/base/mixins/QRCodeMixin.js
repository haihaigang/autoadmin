import QRCode from '../libs/qrcode'

const QRCodeMixin = {
    getQrcode(text) {
    	if(!text){
    		return;
    	}
        var qr = QRCode(10, 'M');
        qr.addData(text);
        qr.make();

        return qr.createImgTag(3)
    }
}
export default QRCodeMixin;

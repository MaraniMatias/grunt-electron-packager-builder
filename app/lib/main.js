"use strict";
var serialPort = require('serialport');
var Arduino = (function () {
    function Arduino() {
        var _this = this;
        serialPort.list(function (err, ports) {
            ports.forEach(function (port) {
                if (port.manufacturer !== undefined) {
                    console.log("ComName: " + port.comName + "\nPnpId: " + port.pnpId + "\nManufacturer: " + port.manufacturer);
                    _this.comName = port.comName;
                    _this.manufacturer = port.manufacturer;
                }
            });
        });
    }
    Arduino.prototype.crear = function () {
        if (!this.comName) {
            this.port = new serialPort.SerialPort(this.comName, {
                parser: serialPort.parsers.readline('\r\n'), dataBits: 8,
                baudrate: 9600, parity: 'none', stopBits: 1, flowControl: false
            }, false);
        }
        else {
            console.warn('No Arduino.');
        }
    };
    Arduino.prototype.testOpen = function () {
        var _this = this;
        return this.port.open(function (err) {
            if (err) {
                console.log("ComName: " + _this.port.comName + "\nPnpId: " + _this.port.pnpId + "\nManufacturer: " + _this.port.manufacturer);
                console.log('is err', err);
                return false;
            }
            else {
                _this.port.close();
                console.info('Puerto Selecionado %s', _this.port.manufacturer);
                return true;
            }
        });
    };
    return Arduino;
}());
exports.Arduino = Arduino;
//# sourceMappingURL=main.js.map
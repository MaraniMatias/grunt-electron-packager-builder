/// <reference path="../../../typings/node/node.d.ts" />
const serialPort = require('serialport');
/**
 * Arduino
 */
export class Arduino {
  comName : string;
  manufacturer : string;
  port : any;
  constructor( ) {
    serialPort.list( (err : Error, ports :any) => {
        ports.forEach( (port : any) => {
          if(port.manufacturer !== undefined){
            console.log(`ComName: ${port.comName}\nPnpId: ${port.pnpId}\nManufacturer: ${port.manufacturer}`);
            this.comName = port.comName;
            this.manufacturer = port.manufacturer;
          }
        });// for
    })
  }
  
  /** 
   * crear New port
   * @returns any
   */
  public crear() : any {
    if( !this.comName ){
        this.port = new serialPort.SerialPort(this.comName,{
          parser: serialPort.parsers.readline('\r\n'), dataBits: 8,
          baudrate:9600, parity: 'none', stopBits: 1, flowControl: false
        },false);// This does not initiate the connection.
    }else{
      // { type : 'error', msg  : 'No encontramos ardiono.'}
      console.warn('No Arduino.');
    }
  }
  
  /**
   * testOpen
   * @returns boolean True if open or False if not open.
   */
  public  testOpen () : boolean {
    return this.port.open( (err:Error) => {
      if(err){
        console.log(`ComName: ${this.port.comName}\nPnpId: ${this.port.pnpId}\nManufacturer: ${this.port.manufacturer}`);
        console.log('is err',err);
        // { type : 'warning', msg  : 'Arduino detectado: '+this.port.manufacturer+'.\nNo puedo abrir la conexión.\nPrueba con permisos de administrador (root en linux).' }
        return false;
      }else{
        this.port.close();
        console.info('Puerto Selecionado %s',this.port.manufacturer);
        // { type : 'success',  msg  : 'Arduino detectado: ' + this.port.manufacturer }
        return true;
      }
    })
  }
  
} //export class
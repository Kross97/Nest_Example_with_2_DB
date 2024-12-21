import { Readable } from 'stream';


/**
 *  _construct(callback) - используется для инициализации внутреннего состояния,
 *                         но можно вернуть callback с ошибкой если инициализировать не получилось
 *
 *  _read(size) -  вызывается при чтении (в нем нужно пополнять внутренний буфер через readable.push)
 *
 *  _destroy(err, callback) - Метод _destroy() вызывается writable.destroy().
 *
 *
 *  readable.push(chunk[, encoding]) - Возвращает: <boolean> true, если можно продолжать
 *  проталкивать дополнительные куски данных; false в противном случае.
 * */

export class MyReadableStream extends Readable {
  constructor(options) {
    super(options);
  }

  _construct(callback: (error?: (Error | null)) => void) {
    console.log("ИНИЦИАЛИЗАЯ_READ_Потока!")
    callback();
  }

  _read(size: number) {
    console.log('Чтение размер', size, "Возможна ли запись в поток", this.readable);
    setTimeout(() =>  {
      const flag = this.push(`рандомные_данные_${Math.random()}_${Math.random()}`, 'utf8');
      if(!flag) {
        console.log('Запись во внутренний буффер читаемого потока больше невозможна (буффер полон)');
      }
      }, 2000)
  }

  _destroy(error: Error | null, callback: (error?: (Error | null)) => void) {
    callback(error)
  }

}
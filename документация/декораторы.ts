/*
* Таким образом, при оценке нескольких декораторов в одном объявлении в TypeScript выполняются следующие шаги:
  1. Выражения для каждого декоратора вычисляются сверху вниз.
  2. Результаты затем вызываются как функции снизу вверх.
* */

/**
 * Декоратор метода
 * */
function decorMethodReWrite() {
  console.log('decorMethodReWrite evaluated. Вызывается сверху вниз');
  return function (
    target: any, // - Либо функция-конструктор класса для статического члена, либо прототип класса для члена экземпляра.
    propertyKey: string, // - Имя участника.
    descriptor: PropertyDescriptor // - Дескриптор свойства члена.
  ) {
    descriptor.value = function () {
      console.log('decorMethodReWrite. Вызывается снизу в верх');
    };
  };
}

/**
 * Декоратор метода
 * */
function decorMethodProxy(proxyString: string) {
  console.log('decorMethodProxy evaluated. Вызывается сверху вниз');
  return function (
    target: any, // - Либо функция-конструктор класса для статического члена, либо прототип класса для члена экземпляра.
    propertyKey: string, // - Имя участника.
    descriptor: PropertyDescriptor // - Дескриптор свойства члена.
  ) {
    const oldFunc = descriptor.value;
    descriptor.value = function () {
      oldFunc();
      console.log(
        proxyString + ' Вызывается снизу в верх',
        'arguments: ',
        Array.from(arguments)
      );
    };
  };
}

/**
 * Декоратор класса
 * */
const decoratorClass = (constructorClass: Function) => {
  constructorClass.prototype.decoratorClassInjectMethod = () => {
    console.log(
      'decoratorClassInjectMethod!!!! Метод инжектирован в прототип класса декоратором'
    );
  };
};

/**
 * Декоратор класса
 * */
const decoratorClassReWrite = <T extends { new (...args: any[]): {} }>(
  constructorClass: T
) => {
  return class extends constructorClass {
    classReWriteProp =
      'classReWriteProp!!! Свойство инжектирвоано переписыванием конструктора класса декоратором';

    methodReWrite() {
      console.log(this.classReWriteProp + '/ и метод methodReWrite!');
    }
  };
};

/**
 * Декоратор свойства
 * */
const decoratorProps = (...args) => {
  console.log('ARGS', args);
};

/**
 * Декоратор параметра
 * */
const decoratorParam = (
  target: Object, // - Либо функция-конструктор класса для статического члена, либо прототип класса для члена экземпляра.
  propertyKey: string | symbol, // - Имя участника.
  parameterIndex: number // - Порядковый номер параметра в списке параметров функции.
) => {
  console.log('PARAM', target, propertyKey, parameterIndex);
};

@decoratorClass
@decoratorClassReWrite
class ExampleClass {
  @decoratorProps
  property1 = 'property1';
  @decoratorProps
  property2 = { property2: 'property2' };
  @decoratorProps
  property3: any = null;

  constructor() {
    // @decoratorProps - НЕ РАБОТАЕТ!!!
    // this.property3 = { property3: 'property3' };
  }

  @decorMethodProxy('proxyString')
  @decorMethodReWrite()
  method(@decoratorParam param: any) {
    console.log('ЫФВФЫВ!!!'); // - не будет вызван (переписан)
  }
}

const ss = new ExampleClass();
ss.method('string');
//@ts-ignore
ss.decoratorClassInjectMethod();
//@ts-ignore
ss.methodReWrite();

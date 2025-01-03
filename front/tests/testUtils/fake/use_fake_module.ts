import { fakeModule } from './fake_module';

export class TestFakeApi {
  static all() {
    return fakeModule.myGetFakeMethod();
  }
}
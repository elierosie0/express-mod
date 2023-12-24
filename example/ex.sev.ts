import { Injectable } from '../index'

@Injectable()
export class ExampleService {
    public helloWorld(): string {
        return 'Hello: '
    }
}

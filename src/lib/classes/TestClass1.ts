import * as vals from '../utils/vals'

/**
 * TestClass1 description.
 */
export class TestClass1
{   

    /**
     * PublicMethod1 description.
     * @returns SomeValue1
     */
    public PublicMethod1() : string {
        return this.PrivateMethod2();
    }
    
    /**
     * PrivateMethod1 description.
     * @returns SomeValue1
     */
    private PrivateMethod1() : string {
        return vals.GetSomeValue1();
    }

    /**
     * PrivateMethod2 description.
     * @returns SomeValue2
     */
     private PrivateMethod2() : string {
        return vals.default();
    }

}
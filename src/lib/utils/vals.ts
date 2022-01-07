export default function GetSomeValue(): string {
    return GetSomeValue1();
}

export function GetSomeValue1(): string {
    return GetSomeValue2();
}

function GetSomeValue2(): string {
    return "SomeValue2";
}

function GetSomeValue3(): string {
    return "SomeValue3";
}
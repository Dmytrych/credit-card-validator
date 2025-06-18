export const checkLuhn = (numbers: number[], multiple: number = 10): boolean => {
    let sum: number = 0;
    let shouldDouble: boolean = false;

    for (let i: number = numbers.length - 1; i >= 0; i--)
    {
        let currentDigit = numbers[i];

        if (shouldDouble)
        {
            currentDigit = currentDigit * 2; 
        }
        if (currentDigit > 9)
        {
            currentDigit = currentDigit - 9;
        }
        shouldDouble = !shouldDouble;
        sum += currentDigit;
    }

    return (sum % multiple) === 0;
}
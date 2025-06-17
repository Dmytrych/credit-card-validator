export class ParsingError extends Error {}

export const parseNumberString = (numbersString: string) => {
    const parsedNumbers = []
    for (const char of numbersString) {
        const parsedDigit = parseInt(char)

        if (Number.isNaN(parsedDigit)) {
            throw new ParsingError('String should only contain numbers')
        }
        parsedNumbers.push(parsedDigit)
    }
    return parsedNumbers
}
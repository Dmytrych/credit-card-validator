export interface IBinDataSource {
    isValid(binValue: string): Promise<boolean>
}
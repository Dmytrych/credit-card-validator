import { IBinDataSource } from "../../../common/types/bin.data-source"

interface IBinVlidatorDependencies {
    binDataSource: IBinDataSource
}

const BIN_LENGTHS = [6, 8]

export interface IBinValidator {
    validate(cardNumber: string): Promise<boolean>
}

export class BinValidator implements IBinValidator {
	private readonly binDataSource: IBinDataSource

	constructor(deps: IBinVlidatorDependencies) {
		this.binDataSource = deps.binDataSource
	}

	public async validate(cardNumber: string): Promise<boolean> {
		for (const binLength of BIN_LENGTHS) {
			const isValid = await this.binDataSource.isValid(cardNumber.substring(0, binLength))

			if (isValid) {
				return true
			}
		}

		return false
	}
}
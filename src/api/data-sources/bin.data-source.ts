import { AxiosInstance } from "axios";
import { z } from "zod"
import { IBinDataSource } from "../../common/types/bin.data-source";

interface IBinDataSourceDependencies {
    binApiAxiosInstance: AxiosInstance
}

const responseValidationSchema = z.object({
    Status: z.enum(["SUCCESS", "NOT FOUND"]),
    Scheme: z.string().nullish(),
    Type: z.string().nullish(),
    Issuer: z.string().nullish(),
    CardTier: z.string().nullish(),
    Country: z.object({
        A2: z.string().nullish(),
        A3: z.string().nullish(),
        N2: z.string().nullish(),
        ISD: z.string().nullish(),
        Name: z.string().nullish(),
        Cont: z.string().nullish(),
    }),
    Luhn: z.boolean().nullish()
})

type BinResponseData = z.infer<typeof responseValidationSchema>

export class BinDataSource implements IBinDataSource {
    private readonly axiosInstance: AxiosInstance

    constructor(deps: IBinDataSourceDependencies) {
        this.axiosInstance = deps.binApiAxiosInstance
    }

    public async isValid(binValue: string): Promise<boolean> {
        const response = await this.axiosInstance.get<BinResponseData>(`/bin/${binValue}`)

        const validatedData = responseValidationSchema.parse(response.data)

        return validatedData.Status === "SUCCESS"
    }
}
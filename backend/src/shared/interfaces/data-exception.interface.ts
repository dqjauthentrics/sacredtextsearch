export interface DataExceptionInterface {
	message: string;
	code: number;
	error?: string;
	errno?: number;
	sqlMessage?: string;
	sqlState?: string;
	sql?: string;
}

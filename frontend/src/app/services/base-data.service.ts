import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {DataResult} from '@shared/interfaces/data-result';
import {DataExceptionInterface} from '@shared/interfaces/data-exception.interface';
import * as HttpStatus from 'http-status-codes';
import {Observable, Subject} from 'rxjs';
import {GrowlService} from './growl.service';

export type DataMethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE';
export const DATA_SAVED_SUCCESS_MSG = 'Changes were saved.';
export const DATA_DELETED_SUCCESS_MSG = 'Record(s) removed.';
export const DATA_ADDED_SUCCESS_MSG = 'Record added.';
export const DATA_REMOVED_SUCCESS_MSG = 'Removal was successful.';
export const DATA_RESTORED_SUCCESS_MSG = 'Restoration was successful.';
export const DATA_UPDATED_SUCCESS_MSG = 'Updated was successful.';
export const DATA_GENERAL_EXCEPTION_MSG = 'Sorry. This action did not complete.';

export interface DataRecordInfo {
	recordType: string;
	recordId: number;
}

export interface DataCall {
	urlSegment: string;
	params?: Array<string | number>;
	quiet?: boolean;
	hasNonStandardReturn?: boolean;
	successMessage?: string;
	data?: any; // posts only
	timeoutMs?: number;
	onlyIfLoggedIn?: boolean;
}

@Injectable()
export class DataService<T> {
	public baseUrl = '/assets/backend';
	public debug = false;
	public serverExceptionEvent = new Subject<DataExceptionInterface>();

	constructor(
		@Inject('') public controllerName: string,
		@Inject('') public serverBaseUrl: string,
		public http: HttpClient,
		public growlService: GrowlService,
	) {
		this.setBaseUrl(serverBaseUrl);
	}

	public static paramsToString(params: Array<number | string | undefined | null>): string {
		if (params) {
			const fixedParams: string[] = [];
			for (const param of params) {
				fixedParams.push(param ? param.toString() : '0');
			}
			return '/' + fixedParams.join('/');
		}
		return '';
	}

	public setBaseUrl(baseUrl: string): string {
		this.showDebug('setBaseUrl', baseUrl);
		this.baseUrl = baseUrl;
		return this.baseUrl;
	}

	public setDebug(dbg: boolean): void {
		this.debug = dbg;
	}

	public setController(controllerName: string): string {
		this.controllerName = controllerName;
		return this.controllerName;
	}

	public retrieve(url: string, params: Array<string | number> = []): Promise<any> {
		const callInfo: DataCall = {urlSegment: url, params: params, quiet: true}; // @todo Temporary, to quiet errors in growl? - -dqj 3/23/23
		return this.getData(callInfo);
	}

	public getData(callInfo: DataCall): Promise<T | DataExceptionInterface> {
		return this.request('GET', callInfo).then((result: any) => {
			return (callInfo.hasNonStandardReturn ? result : result.data);
		});
	}

	public postData(callInfo: DataCall): Promise<T | DataExceptionInterface> {
		return this.request('POST', callInfo)
				   .then((result: any) => {
					   return (callInfo.hasNonStandardReturn ? result : result.data);
				   });
	}

	public request(method: DataMethodTypes, callInfo: DataCall): Promise<T | DataExceptionInterface> {
		const url = this.url(callInfo.urlSegment, callInfo.params);
		this.showDebug('request', url);
		let requested: Observable<object>;
		const options: any = callInfo.timeoutMs ?
			{headers: [{'timeout': callInfo.timeoutMs}], withCredentials: true} :
			{withCredentials: true};
		switch (method) {
			case 'POST':
				requested = this.http.post(url, callInfo.data || {}, options);
				break;
			case 'GET':
			default:
				requested = this.http.get(url, options);
				break;
		}
		return new Promise<any>((resolve, reject) => {
			requested.subscribe(
				(result: DataResult<T> | DataExceptionInterface | object) => {
					this.showDebug('request result', result);
					if (this.checkValidResult(result, callInfo, url)) {
						if (callInfo.successMessage) {
							this.growlService.success(callInfo.successMessage);
						}
						resolve(result || null);
					} else {
						reject(result || null);
					}
				},
				(error: HttpErrorResponse) => {
					console.error('REQUEST EXCEPTION: ' + url, error);
					if (!callInfo.quiet) {
						this.growlService.error(DATA_GENERAL_EXCEPTION_MSG);
					}
					reject(error || null);
				});
		});
	}

	public getSingle(modelId: number | string): Promise<any> {
		return this.retrieve('single', [modelId]);
	}

	public update(data: any): Promise<any> {
		return this.postData({urlSegment: 'update', data: data, successMessage: DATA_UPDATED_SUCCESS_MSG});
	}

	public remove(data: any): Promise<any> {
		return this.postData({urlSegment: 'remove', data: data, successMessage: DATA_REMOVED_SUCCESS_MSG});
	}

	public restore(data: any): Promise<any> {
		return this.postData({urlSegment: 'restore', data: data, successMessage: DATA_RESTORED_SUCCESS_MSG});
	}

	/**
	 * Builds and returns a http request url from the provided controller action and params.
	 */
	public url(action: string, params: any[] = []): string {
		const url = this.fullBaseUrl() + '/' + action + DataService.paramsToString(params);
		this.showDebug('baseUrl=', this.baseUrl + ', controller=' + this.controllerName + ', url=' + url);
		return url;
	}

	public checkValidResult(result: any, callInfo: DataCall, url: string): boolean {
		let okay = result !== undefined && result !== null;
		if (okay) {
			if (!callInfo.hasNonStandardReturn) {
				okay = result && result.data !== undefined && result.data !== null && result.code === HttpStatus.StatusCodes.OK;
			}
		}
		if (!okay) {
			const exceptionInfo: DataExceptionInterface | null = result && result.data ? result.data : null;
			console.error('INVALID SERVER RESPONSE:', result);
			console.log('--- INF', callInfo);
			console.log('--- URL:', url);
			if (exceptionInfo) {
				console.log('--- EXC:', exceptionInfo);
			}
			if (!callInfo.quiet) {
				if (exceptionInfo && exceptionInfo.code !== HttpStatus.StatusCodes.OK) {
					this.serverExceptionEvent.next(exceptionInfo);
				} else if (!exceptionInfo) {
					this.serverExceptionEvent.next({
							code: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
							message: 'Unknown error',
						}
					);
				}
				this.growlService.error(result?.error || exceptionInfo?.message || 'Sorry, there was an error on the server.');
			}
		}
		return okay;
	}

	public save(record: any, params: Array<number | string> = []): Promise<T | DataExceptionInterface> {
		const callInfo: DataCall = {
			urlSegment: 'save',
			params: params,
			data: record,
		};
		return this.postData(callInfo).then((data: T | DataExceptionInterface) => {
			return data;
		});
	}

	public delete(record: any, params: Array<number | string> = []): Promise<T | DataExceptionInterface> {
		const callInfo: DataCall = {
			urlSegment: 'delete',
			params: params,
			data: record,
			successMessage: DATA_DELETED_SUCCESS_MSG
		};
		return this.postData(callInfo).then((data: T | DataExceptionInterface) => {
			return data;
		});
	}

	public add(record: any, params: Array<number | string> = []): Promise<T | DataExceptionInterface> {
		const callInfo: DataCall = {
			urlSegment: 'add',
			params: params,
			data: record,
			successMessage: DATA_ADDED_SUCCESS_MSG
		};
		return this.postData(callInfo).then((data: T | DataExceptionInterface) => {
			return data;
		});
	}

	protected showDebug(str: string, data: any): void {
		if (this.debug) {
			let name = '-data-service';
			let tmp: any = this.constructor.toString();
			if (tmp && tmp[1]) {
				tmp = tmp.match(/\w+/g);
				if (tmp && tmp.length > 0) {
					name = tmp[1];
				}
			}
			if (typeof data === 'string') {
				console.log(name + '::' + str + ' ' + data);
			} else {
				console.log(name + '::' + str, data);
			}
		}
	}

	private fullBaseUrl(): string {
		const url = this.baseUrl + '/' + this.controllerName;
		this.showDebug('fullBaseUrl:', url);
		return url;
	}
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_STATUS_ERROR} from '@shared/app.constants';
import {DataConfig} from '@services/data.config';
import {GrowlService} from '@services/growl.service';
import * as HttpStatus from 'http-status-codes';

export interface GridDataServiceResult {
    status: number;     // STATUS_OKAY (1), or STATUS_ERROR (0)
    code: number;       // HTTP code, 200, 404,403 or 500
    duration: number;   // duration of call, in seconds
    message: string;    // User-friendly message relating to results.
    count: number;      // The number of records returned in the data.
    data: any;          // The object, array, or other value that is sought.
}

@Injectable()
export class GridDataService {
    constructor(
        private http: HttpClient,
        private growlService: GrowlService
    ) {
    }

    public postRetrieveData(url: string, data: any): Promise<GridDataServiceResult> {
        const urlBase = DataConfig.serverUrl;
        let response: GridDataServiceResult;
        return new Promise(resolve => {
            this.http.post(urlBase + url, data).subscribe(
                (result: any) => {
                    const res = result as GridDataServiceResult;
                    if (this.checkValidResult(res)) {
                        resolve(result);
                    } else {
                        this.growlService.post({type:'error', title:'Data Retrieval Error', body:'Error: ' + result.message});
                        response = {
                            status: APP_STATUS_ERROR, code: HttpStatus.INTERNAL_SERVER_ERROR, duration: 0, count: 0,
                            message: 'Data grid retrieval error.', data: null
                        };
                        resolve(response);
                    }
                },
                (error: any) => {
                    this.growlService.post({type:'error', title:'Data Retrieval Error', body:'Error: unable to retrieve data.'});
                    response = {
                        status: APP_STATUS_ERROR, code: HttpStatus.INTERNAL_SERVER_ERROR, duration: 0, count: 0,
                        message: 'Data grid retrieval error.', data: error
                    };
                    resolve(response);
                }
            );
        });
    }

    public checkValidResult(result: GridDataServiceResult): boolean {
        return !!result && result.code === HttpStatus.OK;
    }
}

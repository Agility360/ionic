/*====================================================================
* McDaniel Aug-2017
*
* For Job History array from agility REST api
* ====================================================================*/
import { Injectable } from '@angular/core';
import { WPPost, WPMedia } from '../shared/wppost';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { cmsURL, DEBUG_MODE } from '../shared/constants';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class WordpressProvider {

  config: string;

  constructor(public http: Http,
    private ProcessHttpmsgService: ProcessHttpmsgProvider) {

    if (DEBUG_MODE) console.log('instantiated JobHistoryProvider');

    this.config = "{ 'contentType': 'application/json; charset=utf-8', 'dataType': 'json'}";

  }

  urlPosts() {
    return cmsURL + 'posts/';
  }

  urlMedia() {
    return cmsURL + 'media/';
  }

  paramsJobs() {
    let params: URLSearchParams = new URLSearchParams();
     params.set('categories', '5');

     return params;
  }

  paramsNews() {
    let params: URLSearchParams = new URLSearchParams();
     params.set('categories', '3');

     return params;
  }

  paramsResume() {
    let params: URLSearchParams = new URLSearchParams();
     params.set('categories', '4');

     return params;
  }


  getPosts(params: any): Observable<WPPost[]> {
    return this.http.get(this.urlPosts(), {
                                         search: params
                                       })
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  getMedia(id: number): Observable<WPMedia> {
    return this.http.get(this.urlMedia() + id.toString())
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  newMedia() {

    return  {
      id: null,
      date: '',
      date_gmt: '',
      guid: {},
      modified: '',
      modified_gmt: '',
      slug: '',
      status: '',
      type: '',
      link: '',
      title: '',
      author: '',
      comment_status: '',
      ping_status: '',
      template: '',
      meta: [],
      description: {},
      caption: {},
      alt_text: '',
      media_type: '',
      mime_type: '',
      media_details: {},
      post: null,
      source_url: '',
      _links: {}
    };
  }

  /* ------------- To deprecate ----------------
  urlJobs() {
    return cmsURL + 'posts/?categories=5';
  }

  getJobs(): Observable<WPPost[]> {
    return this.http.get(this.urlPosts(), this.paramsJobs())
      .map(res => {return this.ProcessHttpmsgService.extractData(res)})
      .catch(error => {return this.ProcessHttpmsgService.handleError(error)});
  }

  ----------------------------------------------*/

}
/*------------------------------------------------------
 * written by: mcdaniel
 * date: august 2017
 *
 * usage: template controller fed by custom Wordpress provider
 *        this code is templated for use in the following
 *        page controllers:
 *        - jobs
 *        - news
 *        - resume
 *------------------------------------------------------*/
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DEBUG_MODE } from '../../shared/constants';
import { WPPost } from '../../shared/wppost';
import { WordpressProvider } from '../../providers/wordpress';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})

export class JobsPage {

  posts: WPPost[];
  errMess: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private wpservice: WordpressProvider
              ) {
        if (DEBUG_MODE) console.log('constructor JobsPage');
        this.getPosts();
  }

  refreshData(refresher) {
      setTimeout(() => {
        if (DEBUG_MODE) console.log('JobsPage.refreshData()');
        this.getPosts();
        refresher.complete();
      }, 500);
  }

  getPosts() {
    if (DEBUG_MODE) console.log('JobsPage.getPosts()');

    /* Note: set this to appropriate parameter factory fuction:
        paramsJobs()
        paramsNews()
        paramsResume()
    */
    let params = this.wpservice.paramsJobs();

    this.wpservice.getPosts(params)
      .subscribe(
        results => {
          if (DEBUG_MODE) console.log('JobsPage.getJobs() - success', results);
          this.posts = results
          var self = this;
          this.posts.forEach(function(post, id){
              if (DEBUG_MODE) console.log(post);
              self.getMedia(post);
          });
        },
        err => {
          if (DEBUG_MODE) console.log('JobsPage.getJobs() - error', err);
          this.errMess = <any>err
        });
  }

  getMedia(post: WPPost) {

    if (DEBUG_MODE) console.log('JobsPage.getMedia()', post);
    if (post.featured_media == 0) {
      post.featured_media_obj = this.wpservice.newMedia();
      return;
    };

    this.wpservice.getMedia(post.featured_media)
      .subscribe(
        results => {
          if (DEBUG_MODE) console.log('JobsPage.getMedia() - success', results);
          post.featured_media_obj = results;
          post.featured_media_url = results.source_url;
        },
        err => {
          if (DEBUG_MODE) console.log('JobsPage.getMedia() - error', err);
          this.errMess = <any>err;
        });

  }

}

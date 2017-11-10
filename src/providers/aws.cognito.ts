/*====================================================================
* McDaniel Aug-2017
* Auto-generated by Ionic CLI starter app for AWS.
* Stay out of this code!
* ====================================================================*/
import { Injectable } from '@angular/core';
import { Config } from 'ionic-angular';
import { DEBUG_MODE } from '../shared/constants';

declare var AWS: any;
declare var AWSCognito: any;

declare const aws_cognito_region;
declare const aws_cognito_identity_pool_id;
declare const aws_user_pools_id;
declare const aws_user_pools_web_client_id;

@Injectable()
export class Cognito {

  constructor(public config: Config) {
    if (DEBUG_MODE) console.log('Cognito.constructor()');
    AWSCognito.config.region = aws_cognito_region;
    AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: aws_cognito_identity_pool_id
    });
    AWSCognito.config.update({ customUserAgent: AWS.config.customUserAgent });
  }

  changePassword(currentPassword, newPassword) {

    let cognitoUser = this.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
          if (err) {
            if (DEBUG_MODE) console.log('Cognito.constructor() - cognitoUser.getSession() - error: ', err);
              return;
          }
          if (DEBUG_MODE) console.log('Cognito.constructor() - cognitoUser.getSession() - Session: ', session);
      });
    }

    return new Promise((resolve, reject) => {
      cognitoUser.changePassword(currentPassword, newPassword, function(err, result) {
        if (err) {
          if (DEBUG_MODE) console.log('PasswordChangePage.changePassword() - error: ', err);
          reject(err);
        }
        else {
          if (DEBUG_MODE) console.log('PasswordChangePage.changePassword() - result: ', result);
          resolve(result);
        }
      });

     });
  }

  getUserPool() {
    if (DEBUG_MODE) console.log('Cognito.getUserPool()');
    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
      "UserPoolId": aws_user_pools_id,
      "ClientId": aws_user_pools_web_client_id
    });
  }

  getCurrentUser() {
    if (DEBUG_MODE) console.log('Cognito.getCurrentUser()');
    return this.getUserPool().getCurrentUser();
  }

  makeAuthDetails(username, password) {
    if (DEBUG_MODE) console.log('Cognito.makeAuthDetails(): ', username);
    return new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({
      'Username': username,
      'Password': password
    });
  }

  makeAttribute(name, value) {
    if (DEBUG_MODE) console.log('Cognito.makeAttribute()');
    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute({
      'Name': name,
      'Value': value
    });
  }

  makeUser(username) {
    if (DEBUG_MODE) console.log('Cognito.makeUser(): ', username);
    return new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
      'Username': username,
      'Pool': this.getUserPool()
    });
  }


}

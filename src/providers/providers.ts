import { Cognito } from './aws.cognito';
import { DynamoDB } from './aws.dynamodb';
import { User } from './user';
import { ProcessHttpmsgProvider } from './process-httpmsg';
import { JobHistoryProvider } from './jobhistory';
import { EducationHistoryProvider } from './educationhistory';
import { CertificationHistoryProvider } from './certificationhistory';
import { CandidateProvider } from './candidate';
import { WordpressProvider } from './wordpress';

export {
  Cognito,
  DynamoDB,
  User,
  ProcessHttpmsgProvider,
  JobHistoryProvider,
  EducationHistoryProvider,
  CertificationHistoryProvider,
  CandidateProvider,
  WordpressProvider
};

#!/bin/bash


echo "Building web app."
npm run build
aws s3 cp --recursive ./www s3://clientengagementapp-hosting-mobilehub-1363944817
echo "Web app compiled."
echo "To execute from S3: http://clientengagementapp-hosting-mobilehub-1363944817.s3-website-us-east-1.amazonaws.com/"
echo "To execute from Cloudfront: https://d1s3rwkbgrvc9r.cloudfront.net/"

echo "Building Ionic View app."
ionic upload
echo "Build complete. App id: 73ac5e25"

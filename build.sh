#!/bin/bash

# env vars
TEST_REPO=$WORKSPACE/sample_questions_tests
QUESTIONS=$WORKSPACE/sample_questions

# clone clean copy of tests repo
git clone https://github.com/BoxShopCICD/sample_questions_tests.git

# update local copy of tests repo and npm install
cd $TEST_REPO
npm install

# clone clean copy of questions
cd $WORKSPACE
git clone https://github.com/BoxShopCICD/sample_questions.git

# get list of files to run tests on
URL=$(echo $payload | jq -r '.pull_request.head.repo.html_url').git
echo $payload | jq -r '.pull_request.number' > $WORKSPACE/pull_request

cd $QUESTIONS
git remote add user $URL
git fetch user
FILES=$(git diff --diff-filter=M --name-only user/master..master)

# run tests on files and save output
for path in ${FILES[@]}
do
  # echo "${path}"
  cp $path $TEST_REPO/$path
  cd $(dirname $TEST_REPO/$path)
  set +e
  npm test >> $WORKSPACE/results
  set -e
  cd $QUESTIONS
done

python $QUESTIONS/escape_json.py

# add comment to forked PR
GITHUB_TOKEN=7340cc1cf8ab5717ee04500fb52ab2821beb9d81
TEST_OUTPUT_FILE=$WORKSPACE/results.json
TEST_OUTPUT=$(cat $TEST_OUTPUT_FILE)
REPO_SLUG=BoxShopCICD/sample_questions
PULL_REQUEST=$(cat $WORKSPACE/pull_request)


curl -H "Authorization: token $GITHUB_TOKEN" -X POST \
-H "Content-Type: application/json" \
--data "@$TEST_OUTPUT_FILE" \
"https://api.github.com/repos/$REPO_SLUG/issues/$PULL_REQUEST/comments"

# close forked PR
REPO_SLUG=BoxShopCICD/sample_questions
PULL_REQUEST=$(cat $WORKSPACE/pull_request)

curl -H "Authorization: token $GITHUB_TOKEN" --request PATCH \
--data "{\"state\": \"closed\"}" \
"https://api.github.com/repos/$REPO_SLUG/pulls/$PULL_REQUEST"


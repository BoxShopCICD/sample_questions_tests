#!/bin/bash
set -x

# env vars
TEST_REPO=$WORKSPACE/coding_questions_tests
QUESTIONS=$WORKSPACE/interview-questions

#######################################
# prepare question repo and build env #
#######################################

# clone clean copy of tests repo and questions repo
#git clone https://github.com/BoxShopCICD/sample_questions_tests.git
# - commenting out above clone because if this script is being executed,
#the tests repo must already have been cloned

cd $WORKSPACE
git clone https://climbhigh:$GITHUB_TOKEN@github.com/ratracegrad/interview-questions

# get user repo url and pull request number
URL=$(echo $payload | jq -r '.pull_request.head.repo.html_url').git
echo $payload | jq -r '.pull_request.number' > $WORKSPACE/pull_request

# get list of files to run tests on
cd $QUESTIONS
git remote add user $URL
git fetch user
FILES=$(git diff --diff-filter=M --name-only user/master..master)

# npm install tests repo
cd $TEST_REPO
npm install

#################
# execute tests #
#################

# run tests on files and save output
for path in ${FILES[@]}
do
  # echo "${path}"
  cp $path $TEST_REPO/$path
  cd $(dirname $TEST_REPO/$path)
  set +e
  #npm test >> $WORKSPACE/results ---- this prints extra output to the screen by npm
  node ../node_modules/mocha/bin/mocha ./*.test.js >> $WORKSPACE/results
  set -e
  cd $QUESTIONS
done

#########################################
# prepare results and create PR comment #
#########################################

# format results as json (saves to results.json)
python $TEST_REPO/escape_json.py

# add comment to forked PR
TEST_OUTPUT_FILE=$WORKSPACE/results.json
#TEST_OUTPUT=$(cat $TEST_OUTPUT_FILE)
# -- remove this as its now unused code
REPO_SLUG=ratracegrad/interview-questions
PULL_REQUEST=$(cat $WORKSPACE/pull_request)

curl -H "Authorization: token $GITHUB_TOKEN" -X POST \
-H "Content-Type: application/json" \
--data "@$TEST_OUTPUT_FILE" \
"https://api.github.com/repos/$REPO_SLUG/issues/$PULL_REQUEST/comments"

###################
# close forked PR #
###################

# close forked PR
REPO_SLUG=ratracegrad/interview-questions
PULL_REQUEST=$(cat $WORKSPACE/pull_request)

curl -H "Authorization: token $GITHUB_TOKEN" --request PATCH \
--data "{\"state\": \"closed\"}" \
"https://api.github.com/repos/$REPO_SLUG/pulls/$PULL_REQUEST"

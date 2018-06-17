#!/bin/bash
set -x

# env vars
TEST_REPO=$WORKSPACE/sample_questions_tests
QUESTIONS=$WORKSPACE/sample_questions
GITHUB_MACHINE_USER=boxshopbot
REPO_SLUG=BoxShopCICD/sample_questions

#######################################
# prepare question repo and build env #
#######################################

cd $WORKSPACE
git clone https://$GITHUB_MACHINE_USER:$GITHUB_TOKEN@github.com/BoxShopCICD/sample_questions.git

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
PULL_REQUEST=$(cat $WORKSPACE/pull_request)

curl -H "Authorization: token $GITHUB_TOKEN" -X POST \
-H "Content-Type: application/json" \
--data "@$TEST_OUTPUT_FILE" \
"https://api.github.com/repos/$REPO_SLUG/issues/$PULL_REQUEST/comments"

###################
# close forked PR #
###################

# close forked PR
PULL_REQUEST=$(cat $WORKSPACE/pull_request)

curl -H "Authorization: token $GITHUB_TOKEN" --request PATCH \
--data "{\"state\": \"closed\"}" \
"https://api.github.com/repos/$REPO_SLUG/pulls/$PULL_REQUEST"


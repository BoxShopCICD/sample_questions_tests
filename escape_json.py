#!/usr/bin/env python

import json

results_file = '/var/lib/jenkins/workspace/build-and-test-node-project/results'
def main():
  data = ''
  output = {}
  with open(results_file) as fh:
    data = fh.read()
    output['body'] = data
  with open('/var/lib/jenkins/workspace/build-and-test-node-project/results.json', 'w') as fp:
    json.dump(output, fp)
    #fp.write(repr(data))

if __name__ == '__main__':
  main()

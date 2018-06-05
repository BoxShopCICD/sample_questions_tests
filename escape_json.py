#!/usr/bin/env python

import json
import os

results_file = os.path.join(os.environ['WORKSPACE'], 'results')
def main():
  data = ''
  output = {}
  with open(results_file) as fh:
    data = fh.read()
    output['body'] = data
  with open(results_file + '.json', 'w') as fp:
    json.dump(output, fp)

if __name__ == '__main__':
  main()

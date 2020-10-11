#!/usr/bin/env node
// Copyright 2017-2020 @canvas-ui/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0

var ghpages = require('gh-pages');

const options = {
  dest: '.',
  repo: `https://${process.env.GH_PAT}@github.com/${process.env.GITHUB_REPOSITORY}.git`
};

ghpages.publish('build', options, (error) => {
  if (error) {
    process.stderr.write(`${error.message}\n`, () => process.exit(1));
  } else {
    process.stdout.write('Published\n');
  }
});

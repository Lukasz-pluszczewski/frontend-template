import path from 'path';
import _ from 'lodash';
import inquirer from 'inquirer';
import replace from 'replace-in-file';

const SEMVER_PATTERN = /(?<=^v?|\sv?)(?:(?:0|[1-9]\d{0,9}?)\.){2}(?:0|[1-9]\d{0,9})(?:-(?:--+)?(?:0|[1-9]\d*|\d*[a-z]+\d*)){0,100}(?=$| |\+|\.)(?:(?<=-\S+)(?:\.(?:--?|[\da-z-]*[a-z-]\d*|0|[1-9]\d*)){1,100}?)?(?!\.)(?:\+(?:[\da-z]\.?-?){1,100}?(?!\w))?(?!\+)/gi;

const currentPath = process.cwd().split(path.sep);
const currentDirectoryName = currentPath[currentPath.length - 1];

const questions = [
  {
    type: 'input',
    name: 'packageName',
    message: 'Package name (package.json)',
    default: () => currentDirectoryName,
    validate: value => {
      if (!value) {
        return 'Enter a package name';
      }
      if (!value.match(/^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/)) {
        return 'Incorrect package name';
      }
      if (value.length > 214) {
        return 'Package name is too long';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'pageTitleHtml',
    message: "App title (HTML title tag)",
    default: ({ packageName }) => _.startCase(packageName),
  },
  {
    type: 'input',
    name: 'pageTitleLayout',
    message: "App title (app layout)",
    default: ({ pageTitleHtml }) => pageTitleHtml,
  },
  {
    type: 'input',
    name: 'version',
    message: "Version (package.json)",
    validate: value => {
      if (value.match(SEMVER_PATTERN)) {
        return true;
      }

      return 'Enter a valid version number (e.g. 1.0.0, 1.0.0-alpha.1)';
    },
    default: () => '1.0.0',
  },
];

(async () => {
  const answers = await inquirer.prompt(questions);

  const results = replace.sync({
    files: [
      'package.json',
      'index.html',
      'src/Layout.tsx',
    ],
    processor: (input) => _.template(input)(answers),
  });

  const filesUpdated = results.filter(result => result.hasChanged);
  console.log(`${filesUpdated.length || 0} files updated:`);
  console.log(results.filter(result => result.hasChanged).map(result => `    \x1b[32m ${result.file} \x1b[0m`).join('\n'));
})();



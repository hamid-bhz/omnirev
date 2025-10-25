const lint = 'eslint --fix';
const format = 'prettier --write';

module.exports = {
  '*.md': format,
  '*.css': format,
  '*.scss': format,
  '*.json': format,
  '*.html': format,
  '*.js': [format, lint],
  '*.ts': [format, lint],
  '*.jsx': [format, lint],
  '*.tsx': [format, lint],
};

const ghPages = require('gh-pages')

ghPages.publish(
  '.crd-dist',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/MuYunyun/create-react-doc.git',
  },
  (error) => {
    if (error) {
      console.error(error)
    } else {
      console.log('docs sync success')
    }
  }
)

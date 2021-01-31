# HOW TO CONTRIBUTE

1. Welcome your pr! Before pr, talk about situations in the [issue](https://github.com/MuYunyun/create-react-doc/issues/new) firstly. If the situation is reasonable, go to the next step;
2. Switch to the new branch based main, submit the pr to branch `qa/latest` after finishing development.

## DEV

Run these bash command firstly.

```bash
$ git clone https://github.com/MuYunyun/create-react-doc
$ cd create-react-doc
$ yarn && yarn bootstrap && yarn start
```

And now you can see the document is running at http://localhost:3000.

## Test

After merging pr to qa/latest and publish beta package. You should verify the feature/bugfix with following bash:

```js
yarn add create-react-doc@beta
```
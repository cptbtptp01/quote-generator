# A Simple Quote Generator!

user -request-> appSync -GraphQL-> AWS lambda -> generate base64 string -> image(result)

## framework set up
`next.js`,`typescript`,`npm`,`nvm`
- node modules, /src (pages, styles)
- `.babelrc` functional styles using`styled components`

## homepage set up

### starter
- [global style](/src/styles/global.css): fonts, general styles 
- [customized component](/components)

### index.tsx in pages/
1. [landing page(parent)](/src/pages/index.tsx)
	- project title, intro, credits
	- button (invoke modal)
		- **project modal** (call lambda function)
	- footer
		- dev info
		- dynamic data fetch from aws
			- async function to fetch from dynamoDB + type guard

2. [modal](/components/quoteGenerator/index.tsx) (display random qoute)
	- assign fields and pass to child 
		- handle open
			+ query from amplify api
			+ retrieve the result from lambda function
			+ pass to child component (ImageBlob)
		- close
		- set & processing data
		- set & receiving data
	- lambda related fields: quote received, url(**/base64 string**)
	- configure states
		- processing + quote is empty: loading page + timeout()
		- quote states fulfilled: return result to user 
	- client will get the decoded image

## aws amplify CLI

### IAM
1. initialize locally for the project `amplify init`
2. adding auth using aws profile
3. deploy to the cloud, installed essential packages
	- [/amplify](/amplify): config, backend, hooks
	- [_app.tsx](/src/pages/_app.tsx): configure amplify locally, add `Amplify`,`awsExports`

### api
1. `amplify add api`, create `GraphQL` api
	- default auth: IAM
	- additional auth: api key
	- configure schema.graphql: single obj with fields
2. [schema.graphql](/amplify/backend/api/)
	- query: speak to lambda
		- **@auth**: allow public, provider iam
		- **@function**: call lambda function, attach branch, allow accessibility accross codespaces
	- public data: @model - dynamoDB for track quotes generated from users
		- id
		- queryName + secondary @index (query data more effectively)
		- quoteGenerated
		- createdAt
		- updatedAt
	- [appsync for graphql](/src/graphql)

### auth - amazon cognito
1. `amplify add auth`
2. `ampligy update auth` IAM control, enable unauthenticated logins for public API access

### lambda function
1. `amplify add function`
2. functionality
	- fetch a random quote
	- turn text of quote into lines (quote lines received)
	- turn text of author into a line (quote author)
	- turn elements into svg format (render)
	- svg -> **/base64 string**



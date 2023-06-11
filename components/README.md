# customized components

1. [page style blocks](/quoteGenerator/quoteGeneratorElements.tsx)
2. [**QuoteGeneratorModal**](/quoteGenerator/index.tsx)
    - using material ui's modal
    - react arrow function
    	- pass fields set up in the parent [index.tsx](/src/pages/index.tsx)
    		- open
			- close
			- set & processing data
			- set & receiving data)
	- render the modal for different states base on the value of the fields
		- states1: proccesing data and quote is empty yet
		- states2: quote received
    
    
3. [ImageBlob](/quoteGenerator/imageBlob.tsx)
	- handle receiving
	- render the image string received from lambda
	- return the image if received
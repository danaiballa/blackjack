# blackjack
Implementation of a BlackJack game in Typescript.

## How to run
1. Install node.js
    https://nodejs.org/en/download

    Now you should have node.js and npm installed. You can verify this by using
    ```
    node -v
    npm -v
    ```
2. Install typescript and ts-node.
    For global installation:
    ```
    npm install -g typescript
    npm install -g ts-node
    ```
    For local, replace `-g` with `-D`.
3. Install dependencies. Navigate to ./blackjack folder and 
    ```
    npm install
    ```
4. Navigate to ./src folder and run index.ts by typing
    ```
    ts-node index.ts
    ```
5. Run tests by running
    ```
    npm test
    ```
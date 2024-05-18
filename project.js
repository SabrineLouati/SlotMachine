//1.deposit some money
//2.determine number of lines to bet on
//3.collect a bet amount 
//4.spin the slot machine
//5.check if the user won
//6.give the user their winnings
//7.play again 



//1.deposit some money

//to get the user input, you create a function that you can use to synchronously prompt the user for input.
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS =3;

//symbols & value
const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6, 
    D : 8
}
//here we will multiply the bet by the value expl if we have A  the bet will be multiplied by 5
const SYMBOLS_VALUES = {
    A : 5,
    B : 4, 
    C : 3,
    D : 2
}






//function deposit(){}

const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
//convert the deposit amount into int
    const numberDepositAmount = parseFloat(depositAmount)
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0){
        console.log("Invalid deposit amount, try again.");
    } else{
        return numberDepositAmount;
    }
    }
};

//2.determine number of lines to bet on
const getNumberofLines = () =>{
    while(true){
        const lines = prompt("Enter number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines)
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
        console.log("Invalid number of lines, try again.");
    } else{
        return numberOfLines;
    }
    }
};

//3.collect a bet amount 
const getBet = (balance, lines) =>{
    while(true){
        const bet = prompt("Enter the total bet per line: ");
        const numberBet = parseFloat(bet)
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
        console.log("Invalid bet, try again.");
    } 
    else{
        return numberBet;
    }
    }

};
//4.spin the slot machine
//function for spinning the slot machine (it will be randomly selecting based on the counts )
const spin = () => {
    //generate the wheels
    //the idea is that we will put all the possible symbols that we could use 
    //inside an array and then we will randomly select them out and remove them every time we use them while we're generating each wheel

    //1.generate an array
    const symbols = [];
    //loop through all the different entries that i have inside of my symbols objects
        for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
            for (let i = 0; i < count; i++ ){
                //this will add however symbols we have into the array
                symbols.push(symbol);
            }
        }
    const reels = [];
    //first loop will be for single array that we have we need to generate whats inside of it 
    for (let i=0; i<COLS;i++){
        reels.push([]);
        //generate a copie from the available symbols to remove it then from in here 
        const reelSymbols = [...symbols];
    //secins loop will generate the number of rows and number of elements need to go insidethe array 
         for (let j = 0; j<ROWS;j++){
            //generate a random index
            const randonIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randonIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randonIndex, 1);


        }
    }    
    return reels;
};
//5.check if the user won
//transpose an array 
const transpose = (reels) => {
    const rows = [];
    for (let i=0;i<ROWS; i++){
        rows.push([]);
        for(let j=0; j< COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows ;
};
const printRows = (rows) => {
    for(const row of rows ){
        let rowString = "" ; 
        for ( const [i, symbol] of row.entries()){
            rowString += symbol
            if ( i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings =0;
    for (let row = 0; row <lines; row++){
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols){
            if (symbol != symbols[0]){
                allSame = false ; 
                break;

            }

        }
        if (allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]]

        }
    }
    return winnings;
};
const game = () => {
    let balance = deposit();

    while(true){
        console.log("You have a balance of d" +balance);
        const numberOfLines = getNumberofLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin(); 
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You won , d" +winnings.toString());
        if (balance <= 0){
            console.log("You ran out of money!");
            break;
        }
        const playAgain = prompt("Do you want to play again(y/n)?");
        if (playAgain != "y") break;

    }
};
game();

let balance = deposit();
const numberOfLines = getNumberofLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows, bet, numberOfLines)
console.log("You won, d" + winnings.toString())


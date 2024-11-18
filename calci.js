//***********************1*************************************************//

// let currentInput = '';
//     function clickedvutton(btnvalue) {
//         let op = document.getElementById("inputbox");     
//         currentInput += btnvalue;  
//         op.value = currentInput;
//     }
//     function calculateResult() {
//             let result = eval(currentInput);
//             document.getElementById("inputbox").value = result;  
//             currentInput = result.toString();     
//     }
//     function clearDisplay() {
//         currentInput = '';  
//         document.getElementById("inputbox").value = ''; 
//     }


//***********************2*************************************************//
let arr = [];  

function clickedvutton(btnvalue) {
    let op = document.getElementById("inputbox");


    if (typeof btnvalue === "number" || btnvalue === 0) {
        arr.push(btnvalue);  
        op.value = arr.join('');  
    } 

    else if (['+', '-', '*', '/', '%'].includes(btnvalue)) {

        if (arr.length > 0 && ['+', '-', '*', '/', '%'].includes(arr[arr.length - 1])) {
            console.log("Can't add consecutive operators");
        } else {
            arr.push(btnvalue);  
            op.value = arr.join('');  
        }
    }
}

function calculateResult() {
    let op = document.getElementById("inputbox");

    try {
        let expression = arr.join('');
        let result = eval(expression);

        op.value = result;

        arr = [result.toString()];  
    } catch (error) {
        op.value = 'Error';  
        arr = [];  
    }
}

function clearDisplay() {
    document.getElementById("inputbox").value = '';
    arr = [];
}


let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Set the Budget part
totalAmountButton.addEventListener("click", function(){
    tempAmount = totalAmount.value;

    // Empty or negative input
    if(tempAmount ==="" || tempAmount < 0){
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");
        // Set budget
        amount.innerHTML = tempAmount;
        // Set balance
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        // CLear input box
        totalAmount.value = "";
    }
});

// Function to disable Edit and Delete button
const disableButtons = function(bool){
    let editButtons = document.getElementsByClassName(("edit"));
    Array.from(editButtons).forEach((element) =>{
        element.disabled = bool
    })
}

// Function to modify List Elements
const modifyElement = function(element, edit=false){
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
}

// Function to create Expenses List
const listCreator = function(expenseName, expenseValue){
    let subListContent = document.createElement("div");
    subListContent.classList.add("sublist-content", "flex-space");
    list.appendChild(subListContent);
    subListContent.innerHTML = `
    <p class="product">${expenseName}</p>
    <p class="amount">${expenseValue}</p>
    `
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square","edit");
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", function(){
        modifyElement(editButton, true);
    });

    // Creating the delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    editButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", function(){
        modifyElement(deleteButton, true);
    })
    subListContent.appendChild(editButton);
    subListContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(subListContent)
}

// Functio n to Add Expenses
checkAmountButton.addEventListener("click", function(){
    // empty checks
    if(!userAmount.value || !productTitle.value){
        productTitleError.classList.remove("hide");
        return false;
    }
    // Enable buttons
    disableButtons(false);
    // Expense
    let expenditure = parseInt(userAmount.value);
    //Total expense( sum of existing expenses + new)
    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;
    //Total balance equals budget minus total expense
    const totalBalance = tempAmount - sum; 
    balanceValue.innerText = totalBalance
    //Create list
    listCreator(productTitle.value, userAmount.value);
    //empty inputs
    productTitle.value = "";
    userAmount.value = ""
})


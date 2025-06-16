// Make the add expense button work.
// Take the form capture data and append it to the section below.
// update the total amount.
// clear the form for the next entry after posting.


// getElementByID and selectQuery to get the data from each of the form's info panels and store it in an object. Pass that onto the appendItem.
// Use appendItem for the data that comes through to add it to active lists.
// Store the active lists in browser memory.

const totalItems = []

function getExpenseData(){
 const expenseFormData = document.getElementById("expense-form")
 
 expenseFormData.addEventListener("submit", function(e) {
    e.preventDefault()
    const formData = new FormData(expenseFormData)
    const expense = Object.fromEntries(formData)
    expenseFormData.reset()
    expense.value = parseFloat(expense.value)
    const newExpenseItem = convertExpense(expense)
    const updateResults = document.getElementById("results-list")
    updateResults.appendChild(newExpenseItem)
    totalItems.push(expense)
    totalExpense(totalItems)



 })
}

function convertExpense(expense){
    const item = document.createElement('div')
    item.className = "expense-item"
    item.innerHTML = `<strong>${expense.title}</strong><br></br><p>${expense.type} - £${expense.value.toFixed(2)}</p><br></br><p>${expense.description}</p><button type="click">Delete</button`
    return item
}

function totalExpense(totalItems){
    const tally = document.querySelector(".total-amount")
    const totalValue = totalItems.reduce((getMax, item) => getMax += item.value, 0)
    console.log(tally)
    tally.textContent=`Total: £${totalValue.toFixed(2)}`

}

function deleteExpense(){
    document.getElementById("results-list").addEventListener("click", function(e){
        if(e.target.textContent === "Delete"){
            const item = e.target.parentElement
            const index = Array.from(item.parentElement.children).indexOf(item)
            console.log(item, index, "The item and index of the deleted item")
            item.remove()
            totalItems.splice(index, 1)
            totalExpense(totalItems)
            console.log(totalItems, "Remaining expenses after deleting an item.")
        }
    })
}


getExpenseData();
deleteExpense();

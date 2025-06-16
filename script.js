const totalItems = []

function saveToStorage() {
    localStorage.setItem('expenses', JSON.stringify(totalItems))
}

function loadFromStorage() {
    const saved = localStorage.getItem('expenses')
    return saved ? JSON.parse(saved) : []
}

function convertExpense(expense){
    const item = document.createElement('div')
    item.className = "expense-item"
    item.innerHTML = `<strong>${expense.title}</strong><br></br><p>${expense.type} - £${expense.value.toFixed(2)}</p><br></br><p>${expense.description}</p><button type="button">Delete</button>`
    return item
}

function generateSavedExpenseReport(savedExpense) {
    return convertExpense(savedExpense)
}

function initializeApp() {

    const savedExpenses = loadFromStorage()
    
    if (savedExpenses.length > 0) {
        savedExpenses.forEach(expense => {
            totalItems.push(expense)
            const expenseElement = generateSavedExpenseReport(expense)
            document.getElementById("results-list").appendChild(expenseElement)
        })

        totalExpense(totalItems)
    }
}

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
        saveToStorage()
        totalExpense(totalItems)
    })
}

function totalExpense(totalItems){
    const tally = document.querySelector(".total-amount")
    const totalValue = totalItems.reduce((getMax, item) => getMax += item.value, 0)
    tally.textContent = `Total: £${totalValue.toFixed(2)}`
}

function deleteExpense(){
    document.getElementById("results-list").addEventListener("click", function(e){
        if(e.target.textContent === "Delete"){
            const item = e.target.parentElement
            const index = Array.from(item.parentElement.children).indexOf(item)
            
            item.remove()
            totalItems.splice(index, 1)
            saveToStorage()
            totalExpense(totalItems)
        }
    })
}

initializeApp()
getExpenseData()
deleteExpense()
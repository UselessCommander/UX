// Taget fra min eksamen

// Vent på, at DOM'en er klar før kørsel af JavaScript.
document.addEventListener('DOMContentLoaded', function() {
  
    // Tilføj klik-hændelse til '.burger' for mobil-menu toggling.
    document.querySelector('.burger').addEventListener('click', function() {
      // Toggle 'active' klassen på '.nav-menu' for at styre menuvisning.
      document.querySelector('.nav-menu').classList.toggle('active');
    });
  });

////////////////////////////////////////////////////////////////////////////////////////




function skiftPasswordVisibilitet() {
    const passwordInput = document.getElementById('password');
    const skiftIkon = document.getElementById('togglePassword');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      skiftIkon.classList.add('fa-eye-slash');
      skiftIkon.classList.remove('fa-eye');
    } else {
      passwordInput.type = 'password';
      skiftIkon.classList.remove('fa-eye-slash');
      skiftIkon.classList.add('fa-eye');
    }
}

  //kalender
    let nuÅr = new Date().getFullYear();
    let nuMåned = new Date().getMonth();

    let valgtDato = null;
  
  function opretKalender(måned, år) {
      const månedsNavne = ["Januar", "Februar", "Marts", "April", "Maj", "Juni",
          "Juli", "August", "September", "Oktober", "November", "December"];
      const kalenderHeader = document.getElementById('kalenderHeader');
      kalenderHeader.innerHTML = `${månedsNavne[måned]} ${år}`;
  
      const førsteDagIMåneden = new Date(år, måned, 1);
      const dageIMåneden = new Date(år, måned + 1, 0).getDate();
  
      let startDag = førsteDagIMåneden.getDay();
      startDag = startDag === 0 ? 6 : startDag - 1;
  
      const kalenderDiv = document.getElementById('kalender');
      kalenderDiv.innerHTML = '';
  
      
      for (let i = 1; i <= dageIMåneden; i++) {
          const cell = document.createElement('div');
          cell.classList.add('dag');
          cell.innerText = i;
          cell.dataset.dato = `${år}-${måned+1}-${i}`;
          kalenderDiv.appendChild(cell);
      }
  
     
      document.querySelectorAll('.dag').forEach(function(cell) {
          cell.addEventListener('click', function() {
              visEventModal(cell.dataset.dato);
          });
      });
  }

  window.addEventListener('click', function(event) {
    console.log(event.target); 
    if (event.target === eventModal) {
        lukModal();
    }
});
  
  
function visEventModal(dato) {
    valgtDato = dato; 
    const eventModal = document.getElementById('eventModal');
    eventModal.style.display = 'block';
}

  
  function lukModal() {
      const eventModal = document.getElementById('eventModal');
      eventModal.style.display = 'none';
  }
  

  document.addEventListener('DOMContentLoaded', () => {
      const lukModalButton = document.querySelector('.close');
      const gemBegivenhedButton = document.getElementById('gemBegivenhed');
  
      lukModalButton.addEventListener('click', lukModal);
      gemBegivenhedButton.addEventListener('click', gemBegivenhed);
  
  
      window.addEventListener('click', function(event) {
          const eventModal = document.getElementById('eventModal');
          if (event.target == eventModal) {
              lukModal();
          }
      });


      function gemBegivenhed() {
        var begivenhedsNavn = document.getElementById('begivenhedNavn').value;
        if (begivenhedsNavn && valgtDato) {
            var begivenhedsContainer = document.getElementById('begivenhedsListe');
            var begivenhedsElement = document.createElement('div');
            begivenhedsElement.textContent = `${begivenhedsNavn} - ${valgtDato}`;
            begivenhedsContainer.appendChild(begivenhedsElement);
            document.getElementById('begivenhedNavn').value = '';
            valgtDato = null;
        } else {
            alert('Indtast venligst navnet på begivenheden og vælg en dato.');
        }
        lukModal();
    }
  
    
      opretKalender(nuMåned, nuÅr);
  });
  


// budget
function visBudgetmodal(modalId) {
const modal = document.getElementById(modalId);
    modal.style.display = 'block';
}


function lukBudgetmodal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('addMaxBudgetBtn').addEventListener('click', () => visBudgetmodal('maxBudgetModal'));
    document.getElementById('addExpenseBtn').addEventListener('click', () => visBudgetmodal('newExpenseModal'));


    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
        });
    });


    window.addEventListener('click', event => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});

let budgetState = {
    maxBudget: 0,
    expenses: [],
    remainingBudget: 0
};

function setMaxBudget() {
    const maxBudgetInput = document.getElementById('modalMaxBudgetInput');
    const maxBudgetValue = parseFloat(maxBudgetInput.value);
    
    if (!isNaN(maxBudgetValue) && maxBudgetValue > 0) {
        budgetState.maxBudget = maxBudgetValue;
        budgetState.remainingBudget = maxBudgetValue - calculateTotalExpenses(budgetState.expenses);
        updateBudgetDisplay();
        lukModal('maxBudgetModal');
    } else {
        alert('Indtast venligst et gyldigt tal for maksimumsbudget.');
    }
}

function addExpense() {
    const expenseNameInput = document.getElementById('expenseNameInput');
    const expenseAmountInput = document.getElementById('expenseAmountInput');
    const expenseName = expenseNameInput.value.trim();
    const expenseAmount = parseFloat(expenseAmountInput.value);
    
    if (expenseName && !isNaN(expenseAmount) && expenseAmount > 0) {
        const newExpense = {
            name: expenseName,
            amount: expenseAmount
        };
        
        budgetState.expenses.push(newExpense);
        budgetState.remainingBudget -= expenseAmount;
        updateBudgetDisplay();
        updateExpensesList();
        lukModal('newExpenseModal');
    } else {
        alert('Indtast venligst et gyldigt navn og beløb for udgiften.');
    }
}

function calculateTotalExpenses(expenses) {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
}

function updateBudgetDisplay() {
    const remainingAmountElement = document.getElementById('remainingAmount');
    remainingAmountElement.textContent = budgetState.remainingBudget.toFixed(2) + ' DKK';
}

function updateExpensesList() {
    const budgetList = document.querySelector('.budget-list');
    budgetList.innerHTML = ''; 
    budgetState.expenses.forEach(expense => {
        budgetList.innerHTML += `<div class="expense-item">${expense.name}: ${expense.amount.toFixed(2)} DKK</div>`;
    });
}

function updateExpensesList() {
    const budgetList = document.querySelector('.budget-list');
    budgetList.innerHTML = ''; 
    budgetState.expenses.forEach(expense => {
        const expenseDiv = document.createElement('div');
        expenseDiv.classList.add('expense-item');
        expenseDiv.innerHTML = `
            <span>${expense.name}</span>
            <span>${expense.amount.toFixed(2)} DKK</span>
        `;
        budgetList.appendChild(expenseDiv);
    });
}



updateBudgetDisplay();
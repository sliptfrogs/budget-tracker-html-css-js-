// Data

const listBalance = {
  totalEntries: 0,
  currentBalance: 500.00,
};

// Crouser
const idCounter = () => {
  let counter = 0;
  return () => {
    counter++;
    return counter;
  };
};
const idIncrease = idCounter();

const balanceCounter = (totalAmount) => {
  let counter = totalAmount;

  return (amount, method) => {
    method? counter+= amount : counter-=amount;
    return counter;
  };
};
const balanceAdd = balanceCounter(listBalance.currentBalance);

const listLog = [
];
// Display Log
const displayLogHistory = () => {
  let content = "";
  listLog?.slice().reverse().map((value, index) => {
    content += `
                    <tr>
                        <td>
                            #${value.id}
                        </td>
                        ${
                            value.method? `<td style="color:green; font-weight:bold;">+ $${value.amount}</td>`:`<td style="color:red; font-weight:bold;">- $${value.amount}</td>`
                        }
                        <td>
                            ${value.remark}
                        </td>
                        <td>
                            ${value.date}
                        </td>
                        <td>
                            $${value.balanceAfter}
                        </td>
                    </tr>
            `;
  });
  if(content != ""){
      document.getElementById("tbody").innerHTML = content;
  }
};

const myFunction = () => {
  const amount = parseFloat(document.getElementById("amount").value);
  const remark = document.getElementById("remark").value;
  const date = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
  const income = document.getElementById('income');

  if(amount=='' || remark ==''){
    alert("You need to fill form first");
    return;
  }

  let method=1;


  if(income.checked){
    method = 1;/* For Income */
  }else{
    method = 0; /* For Expense */
  }

  const id = idIncrease();
  const balanceAfter = balanceAdd(amount, method);



  document.getElementById("demo").innerHTML = id;
  document.getElementById("balance").innerHTML = `$${parseFloat(balanceAfter).toFixed(2)}`;

  listLog.push({
    id: id,
    amount: amount,
    remark: remark,
    date: date,
    method: method,
    balanceAfter: balanceAfter,
  });
  displayLogHistory();
};
const displayUserData = () => {
  document.getElementById(
    "balance"
  ).innerHTML = `$${listBalance.currentBalance.toFixed(2)}`;
};
displayUserData();
displayLogHistory();

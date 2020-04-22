function BankAccount(firstName, lastName, id){
  this.firstName = firstName;
  this.lastName = lastName;
  this.id = id;
  this.balance = 1000; //set balance
  this.depositted = 0;
  this.withdrawn = 0;
}
BankAccount.prototype.deposit = function(){
  return this.depositted + this.balance;
}
BankAccount.prototype.withdraw = function(){  
  return this.balance - this.withdrawn;
}
BankAccount.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
}

$(document).ready(function(){
  $("#createAccount").one("click",function(){
    $("#show-form").append(
                            '<form id="account">' +
                            '<div class="inputs"' +
                            '<div class="form-group">' +
                              '<label for="name">First Name</label>' +
                              '<input type="text" class="form-control" id="first-name">' +
                            '</div>' +
                            '<div class="form-group">' +
                              '<label for="name">Last Name</label>' +
                              '<input type="text" class="form-control" id="last-name">' +
                            '</div>' +
                            '<div class="form-group">' +
                              '<label for="name">National ID</label>' +
                              '<input type="number" placeholder="0" class="form-control" id="id-no">' +
                            '</div>' +
                            '<button class="btn" type="submit">Create</button>' + 
                            '</div>' +
                            '</form>'
    );
    $("form#account").one("submit",function(event){
      if($("#first-name").val() === "" || $("#last-name").val() === "" || $("#id-no").val() === "") alert("All fields are required!");
      else 
      event.preventDefault();
      let first_name = $("#first-name").val();
      let last_name = $("#last-name").val();
      let id_no = $("#id-no").val();
      let newAccount = new BankAccount(first_name, last_name, id_no);
      $("form").addClass("hideForm");
      $(".hideForm").slideUp();
      $("#createAccount").hide();
      $("#welcome").fadeIn(3000);
      $("#welcome").fadeOut(3000);
      $("#account-info").append(
        '<span id="welcome">Welcome</span>' +
        '<div id=accountInfo>' +
        '<p class="name">NAME: ' + newAccount.fullName() + '</p>' +
        '<p class="name">ID: ' + ($("#id-no").val()) + '</p>' +
        '<p id="balance"class="name">Balance: $'  + newAccount.balance + '</span></p>' +
        '<hr>' +
        '<input class="form-control" plceholder="0" type="number" id="deposit-amount">' + 
        '<label for="deposit-amount" type="button" class="btn" id="deposit">Deposit</label>' +
        '<input class="form-control" plceholder="0" type="number" id="withdraw-amount">' + 
        '<label for="withdraw-amount" type="button" class="btn" id="withdraw">Withdraw</label>' +
        '</div'
      );
      $("#deposit").click(function(){
        let deposit_amount = parseFloat($("#deposit-amount").val());
        newAccount.depositted = deposit_amount;
        newAccount.balance = newAccount.deposit();
        $("p#balance").text("Balance: " + "$" + newAccount.balance);
        $("#deposit-amount").val("");
      });
      $("#withdraw").click(function(){
        let withdraw_amount = parseFloat($("#withdraw-amount").val());
        newAccount.withdrawn = withdraw_amount;
        newAccount.balance = newAccount.withdraw();
        $("p#balance").text("Balance: " + "$" + newAccount.balance);
        $("#withdraw-amount").val("");
      });
    });
  });
});
(() => {
  "use strict";
  const App = () => {
    return {
      balance: 0,
      availableBills: [],
      withdraw: {},

      init: function () {
        this.availableBills = [
          { name: "cem", amount: 1, value: 100 },
          { name: "cinquenta", amount: 3, value: 50 },
          { name: "vinte", amount: 4, value: 20 },
          { name: "dez", amount: 1, value: 10 },
          { name: "cinco", amount: 3, value: 5 },
          { name: "dois", amount: 12, value: 2 },
          { name: "um", amount: 10, value: 1 },
        ];
        this.balance = 122.5;
        this.setEvents();
        this.setInfo();
      },

      setEvents: function () {
        let $inputAmount = document.querySelector(".user-input-amount");
        let $confirmButton = document.querySelector(".confirm-button");
        $confirmButton.addEventListener("click", () =>
          this.handleWithdraw(Number($inputAmount.value))
        );
      },

      handleWithdraw: function (withdrawValue) {
        this.withdraw = {};

        if (!withdrawValue || withdrawValue < 1) {
          return this.setMessage("Insira um valor maior que 0");
        }
        if (withdrawValue > this.balance) {
          return this.setMessage("Saldo insuficiente");
        }
        if (!Number.isInteger(withdrawValue)) {
          return this.setMessage("Só é possível sacar valores inteiros");
        }
        let drawn = 0;
        let index = 0;
        while (drawn != withdrawValue) {
          let missingValue = withdrawValue - drawn;
          let currentBill = this.availableBills[index];
          try {
            if (currentBill.value <= missingValue && currentBill.amount > 0) {
              this.availableBills[index].amount--;
              drawn += currentBill.value;
              if (!this.withdraw[currentBill.value]) {
                this.withdraw[currentBill.value] = {
                  name: currentBill.name,
                  value: currentBill.value,
                  amount: 1,
                };
              } else {
                this.withdraw[currentBill.value].amount++;
              }
            } else {
              index++;
            }
          } catch {
            return this.setMessage(
              "Impossível sacar esse valor.<br>Notas insuficientes."
            );
          }
        }
        this.balance -= drawn;
        let message = "Saque efetuado com sucesso";
        for (let bill in this.withdraw) {
          message += `<br>${this.withdraw[bill].amount} nota${
            this.withdraw[bill].amount > 1 ? "s" : ""
          } de R$ ${this.withdraw[bill].value}`;
        }
        return this.setMessage(message);
      },

      setMessage: function (message) {
        let $response = document.querySelector(".response");
        $response.innerHTML = message;
        this.setInfo();
      },

      setInfo: function () {
        let $balance = document.querySelector(".balance");
        $balance.innerHTML = `<strong>Saldo:</strong> R$ ${this.balance}0`;
        let $table = document.querySelector(".available-bills");
        $table.innerHTML = "";
        for (let bill in this.availableBills) {
          let $line = document.createElement("tr");
          let $name = document.createElement("td");
          $name.textContent = `R$ ${this.availableBills[bill].value}`;
          let $quantity = document.createElement("td");
          $quantity.textContent = `${this.availableBills[bill].amount}`;
          $line.appendChild($name);
          $line.appendChild($quantity);
          $table.appendChild($line);
        }
      },
    };
  };
  const aplication = App();
  aplication.init();
})();

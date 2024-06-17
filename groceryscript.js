document.addEventListener("DOMContentLoaded", function() {
    if (typeof window.Telegram === 'undefined' || typeof window.Telegram.WebApp === 'undefined') {
        console.error("Telegram WebApp is not defined. Make sure this script runs inside Telegram.");
        return;
    }

    let userId;

    const tg = window.Telegram.WebApp;
    tg.expand();
    userId = tg.initDataUnsafe.user.id;
    loginUser(userId);

    /*
        */
    if (tg.MainButton) {
        console.log("MainButton initialized");
        tg.MainButton.textColor = "#FFFFFF";
        tg.MainButton.color = "#2cab37";

        let item = "";
        let addButtonClickCount = 0;
        const addButtonClickTarget = 3;

        function setupButton(button, itemNumber) {
            button.addEventListener("click", function(){
                if (tg.MainButton.isVisible) {
                    tg.MainButton.hide();
                } else {
                    tg.MainButton.setText(`Ви обрали товар ${itemNumber}!`);
                    item = itemNumber;
                    tg.MainButton.show();
                }

                addButtonClickCount++;
                if (addButtonClickCount >= addButtonClickTarget) {
                    taskCompletion[1] = true; 
                    document.getElementById("task-add-clicks").classList.add("completed");
                    checkBonus();
                    updateQuestStatus(userId, { 'addClicks': true });
                }
            });
        }

        setupButton(document.getElementById("btn1"), "1");
        setupButton(document.getElementById("btn2"), "2");
        setupButton(document.getElementById("btn3"), "3");
        setupButton(document.getElementById("btn4"), "4");
        setupButton(document.getElementById("btn5"), "5");
        setupButton(document.getElementById("btn6"), "6");

        tg.onEvent("mainButtonClicked", function(){
            console.log("MainButton clicked with item:", item);
            tg.sendData(item);
        });
    } else {
        console.error("MainButton is not available. Make sure this code is running inside Telegram WebApp.");
    }

    

    
});

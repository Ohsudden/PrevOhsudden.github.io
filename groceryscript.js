document.addEventListener("DOMContentLoaded", function() {
    if (typeof window.Telegram === 'undefined' || typeof window.Telegram.WebApp === 'undefined') {
        console.error("Telegram WebApp is not defined. Make sure this script runs inside Telegram.");
        return;
    }

    let tg = window.Telegram.WebApp;

    tg.expand();

    let taskCompletion = [false, false, false, false]; 
    let taskRewards = [0.01, 0.02, 0.03, 0.04]; 

    let loginCount = 0;
    let itemsBought = 0;
    let boughtMilk = false;

    // Increment login count on page load
    loginCount++;
    checkTasks();

    if (tg.MainButton) {
        console.log("MainButton initialized");
        tg.MainButton.textColor = "#FFFFFF";
        tg.MainButton.color = "#2cab37";

        let item = "";

        function setupButton(button, itemNumber) {
            button.addEventListener("click", function(){
                if (tg.MainButton.isVisible) {
                    tg.MainButton.hide();
                } else {
                    tg.MainButton.setText(`Ви обрали товар ${itemNumber}!`);
                    item = itemNumber;
                    tg.MainButton.show();
                    itemsBought++;
                    if (itemNumber === "1") { // Assuming "1" is the milk item
                        boughtMilk = true;
                    }
                    checkTasks();
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

    // Add click event listener for swiper slides
    document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
        slide.addEventListener('click', () => {
            taskCompletion[index] = !taskCompletion[index];
            slide.classList.toggle('completed', taskCompletion[index]);
            checkBonus();
        });
    });

    function checkTasks() {
        // Check "Log in" task
        if (!taskCompletion[3]) {
            taskCompletion[3] = loginCount > 0;
        }

        // Check "Log in two times" task
        if (!taskCompletion[2]) {
            taskCompletion[2] = loginCount >= 2;
        }

        // Check "Buy milk" task
        if (!taskCompletion[0]) {
            taskCompletion[0] = boughtMilk;
        }

        // Check "Buy 3 goods" task
        if (!taskCompletion[1]) {
            taskCompletion[1] = itemsBought >= 3;
        }

        checkBonus();
    }

    function checkBonus() {
        const allTasksCompleted = taskCompletion.every(status => status);
        const totalReward = taskCompletion.reduce((total, completed, index) => {
            return completed ? total + taskRewards[index] : total;
        }, 0).toFixed(2);

        document.getElementById('total-reward').innerText = totalReward;
        document.getElementById('bonus-message').style.display = allTasksCompleted ? 'block' : 'none';

        // Update task slide status
        document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
            slide.classList.toggle('completed', taskCompletion[index]);
        });
    }

    checkTasks();
});

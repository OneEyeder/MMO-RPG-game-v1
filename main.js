// Изначальные переменные и звуки
let message = 'Привет';
let user = 'Путник';
let balance = 10;

let message2 = `Твоя цель победить босса, тогда ты пройдешь испытание.
Нажми OK чтобы продолжить...`;

message += ` ${user}, На твоем счету ${balance} золотых, `;
message += 'За 1 золотой можешь позволить себе 1 рандомный предмет из моей лавки';

// alert(message);
// alert(message2);

document.body.addEventListener('click', () => {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();
}, { once: true }); // запускать один раз при первом клике

// Звуки
const buySound = new Audio('buy-sound.mp3');
const errorSound = new Audio('mep-map.mp3');
const damageSound = new Audio('damage-sound.mp3');
const deathSound = new Audio('death.mp3');
const backgroundMusic = new Audio('background-music.mp3');
const victoryMusic = new Audio('victory-music.mp3');


let swordBtn = document.querySelector('.buy__item');
let balanceElement = document.querySelector('.balance__item');

let swordPrice = 1;

let bossBtn = document.querySelector('.boss-btn');
let bossHealthValue = 100;
let bossHealthElement = document.querySelector('.boss-health');

let damage = 1;
let sword = 0;

let bossImg = document.querySelector('.boss-img');

// Функция покупки меча
function swordFunction() {
    swordBtn.addEventListener('click', function () {
        if (balance >= swordPrice) {
            buySound.currentTime = 0;
            buySound.play();
            balance -= swordPrice;
            sword += 1;
            balanceElement.textContent = `${balance} Золотых`;
        } else {
            balanceElement.textContent = 'Недостаточно золотых для покупки';
            errorSound.currentTime = 0;
            errorSound.play();
        }
    });
}

// Объединенная функция боя и смены изображений
function bossInteraction() {
    bossBtn.addEventListener('click', function () {
        if (bossHealthValue > 0) {
            // Атака босса
            damageSound.currentTime = 0;
            damageSound.play();

            let currentDamage = damage + sword;
            bossHealthValue -= currentDamage;

            if (bossHealthValue <= 0) {
                // Победа над боссом
                bossHealthValue = 0;
                deathSound.currentTime = 0;
                deathSound.play();
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0; // сбросить на начало

                // Запустить музыку победы
                victoryMusic.currentTime = 0;
                victoryMusic.play();

                // Обновляем текст и изображение
                bossHealthElement.textContent = 'Босс побежден, вы победили!';
                document.querySelector('.boss-img').setAttribute('src', './goblin-defeat.png');
            } else {
                // Еще не побежден, показываем здоровье и атаку
                bossHealthElement.textContent = `Здоровье ${bossHealthValue}`;
                document.querySelector('.boss-img').setAttribute('src', './boss-atack.png');
            }
        }
    });
}

// Запуск функций
swordFunction();
bossInteraction();
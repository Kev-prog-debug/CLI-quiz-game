#!/usr/bin/env node
debugger;
const chalkAnimation = require("chalk-animation");
const figlet = require("figlet");
const gradient = require("gradient-string");
const inquirer = require("inquirer");
const nanospinner = require("nanospinner");
const chalk = require("chalk");

let playerName;
let answer1;
let answer2;
console.log(
  figlet.textSync("Kyaw Gyi CLI game", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "fitted",
    width: 100,
    whitespaceBreak: true,
  })
);
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbow = chalkAnimation.rainbow(
    "Welcome from my CLI quiz game, stranger"
  );
  await sleep();
  rainbow.stop();
  const neon = chalkAnimation.neon("Press any key to continue");
  await sleep();
  neon.stop();
}

function getUsername() {
  inquirer
    .prompt({
      type: "input",
      name: "username",
      message: "What is your name, stranger ?",
      default() {
        return "Player";
      },
    })
    .then((answers) => {
      playerName = answers.username;
      question1();
    });
}

function handleAnswers(isCorrectAns) {
  if (isCorrectAns) {
    console.log(chalk.bgWhite.green("You're right"));
    return true;
  } else {
    console.log(chalk.red("Wrong answer, you loser!"));
    process.exit(1);
  }
}

function question1() {
  inquirer
    .prompt({
      name: "answer1",
      type: "list",
      message: "Which one is the largest ?",
      choices: [1, 2, 3],
    })
    .then((answers) => {
      answer1 = answers.answer1;
      handleAnswers(answer1 == 3) ? question2() : "";
    });
}

function question2() {
  inquirer
    .prompt({
      name: "answer2",
      type: "list",
      message: "RGB means Red, Green and Blue.",
      choices: ["TRUE", "FALSE"],
      default() {
        return "FALSE";
      },
    })
    .then((answers) => {
      answer2 = answers.answer2;
      handleAnswers(answer2 == "TRUE");
    });
}

welcome();
getUsername();

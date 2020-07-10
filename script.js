function operate (expr) {

  //holds the array after evaluating exponents
  let noexponent = []

  for (let i = 0; i < expr.length; i++) {
    if (expr[i] == "^") {
      noexponent.pop()
      noexponent.push(expr[i - 1]**expr[i + 1])
      i++
    }
    else {
      noexponent.push(expr[i])
    }
  }

  //holds the array after evaluating * and /
  let nomultiply = []
  let flag = 0;
  let start = 0;
  //passes through the array looking for * and /
  for(let i = 0; i < noexponent.length; i++) {
    //once it finds one, marks it as the start of the subexpression
    if (noexponent[i] == "x" || noexponent[i] == "/") {
        flag = 1;
        start = i - 1
        nomultiply.pop()
    }
    if (flag == 1 && (noexponent[i] == "+" || noexponent[i] == "-")) {
      //once it finds the end of the subexpression, it returns the subexpression to be parsed
      flag = 0
      let subexpr = noexponent.slice(start - 1, i)
      let num = subexpr[0]
      for (let j = 1; j < subexpr.length; j+= 2) {
        if (subexpr[j] == "x") {
          num *= subexpr[j + 1]
        }
        else {
          num /= subexpr[j + 1]
        }
      }
      nomultiply.push(num)
    }
    if (flag == 0) {
       nomultiply.push(noexponent[i])
    }
  }
  if (flag == 1) {
    flag = 0
    let subexpr = noexponent.slice(start, noexponent.length)
    let num = subexpr[0]
    for (let j = 1; j < subexpr.length; j+= 2) {
      if (subexpr[j] == "x") {
        num *= subexpr[j + 1]
      }
      else {
        num /= subexpr[j + 1]
      }
    }
    nomultiply.push(num)
  }

  sol = nomultiply[0]

  for (let i = 1; i < nomultiply.length; i+= 2) {
    if (nomultiply[i] = "+") {
      sol += nomultiply[i + 1]
    }
    else {
      sol -= nomultiply[i + 1]
    }
  }

  if (String(sol).length > 7) {
    sol = parseInt(sol*1000000)/1000000
  }

  return sol
}

//expr is used for the actual operation
let expr = []
//display controls the onscreen display
let display = ""
//curr will hold the current number
let curr = ""
//ans holds the last answer
let ans = 0

let displayDOM = document.querySelector("#display")
const eqn = document.querySelectorAll(".eqn")

eqn.forEach((num) => {
  num.addEventListener("click", (e) => {
    console.log(e.target.textContent)
    curr += e.target.textContent
    display += e.target.textContent
    displayDOM.textContent = display
  })
})

const operators = document.querySelectorAll(".operator")

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    if (curr == "") {
      return
    }
    expr.push(parseInt(curr))
    expr.push(e.target.textContent)
    curr = ""
    display += e.target.textContent
    displayDOM.textContent = display
  })
})

const clear = document.querySelector(".clear")

clear.addEventListener("click", (e) => {
  expr = []
  display = ""
  displayDOM.textContent = display
  curr = ""
})

const prevAns = document.querySelector(".ans")

prevAns.addEventListener("click", (e) => {
  if (curr != "") {
    return
  }
  curr = ans;
  display += ans;
  displayDOM.textContent = display;
})

const eval = document.querySelector(".eval")

eval.addEventListener("click", (e) => {
  if (curr === "") {
    return
  }
  expr.push(parseInt(curr))
  ans = operate(expr)

  if (!ans) {
    alert("nope.")
    ans = 0;
    display = ""
    curr = ""
    expr = []
    displayDOM.textContent = display;
    return
  }

  display = ans;
  displayDOM.textContent = display;
  curr = ans;
  expr = []
})

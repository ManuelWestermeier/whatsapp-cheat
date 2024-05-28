function wait(minutes = 0) {
    return new Promise(res =>
        setTimeout(() => {
            res(true);
        }, minutes * 60000)
    )
}

async function submitSendForm(times = 1, time = 0, timeBetween = 0) {
    let sendButton = document.querySelector("*[aria-label=Senden]")

    if (!sendButton) {
        alert("the sendbutton have to be vidible | button not found")
    }

    if (time > 0) {
        await wait(time)
    }

    for (let index = 0; index < times; index++) {
        if (timeBetween > 0) {
            await wait(timeBetween)
        }
        sendButton.click()
        console.log("round", index)
    }
}

//form

const submitForm = document.createElement("form")
submitForm.classList.add("bot-form")
submitForm.classList.add("invisible")

submitForm.innerHTML = `
<input type="number" name="times" placeholder="Times" />
<input type="number" name="time " step="0.001" placeholder="Time (minutes)" />
<input type="number" name="timeBetween" step="0.001" placeholder="Time Between (minutes)" />
<button>Run</button>
`

submitForm.onsubmit = e => {
    e.preventDefault()
    const fd = new FormData(e.target)
    submitSendForm(parseFloat(fd.get("times")), parseFloat(fd.get("time")), parseFloat())
    submitForm.classList.toggle("invisible")
}

document.documentElement.appendChild(submitForm)

//button

const botButton = document.createElement("button")
botButton.innerText = "Whatsapp Bot"
botButton.classList.add("bot-button")

botButton.onclick = () => submitForm.classList.toggle("invisible")

document.documentElement.appendChild(botButton)
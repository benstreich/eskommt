
document.addEventListener('DOMContentLoaded', () => {
    const consoleEl = document.getElementById('console');

    const questions = [
        { q: "Wie heisst der Sohn S's Grossvater?", a: ["SV"] },
        { q: "MV von Rakul Rajogopu?", a: ["Negativ"] },
        { q: ".. ... - / .-. .- -.- ..- .-.. ... / -- ...- / --. .-.. . .. -.-. .... / .-- .. . / -.. . .. -. . .-. ..--..", a: [".--- .-"] },
        { q: "82 97 115 115 101 32 100 105 101 32 109 105 116 32 117 110 115 32 105 110 32 108 111 110 100 111 110 32 119 97 114 ", a: ["109 111 110 107 101 121 115", "77 111 110 107 101 121 115"] },
        { q: "Jvr urvffg oynpxlf vafry", a: ["Ankbf", "ankbf"] }
    ];

    let currentQuestion = 0;

    const appendLine = (html) => {
        const line = document.createElement('div');
        line.innerHTML = html;
        consoleEl.appendChild(line);
        window.scrollTo(0, document.body.scrollHeight);
    };

    const askQuestion = () => {
    if (currentQuestion < questions.length) {
        const questionLine = document.createElement('div');
        questionLine.classList.add('output');
        consoleEl.appendChild(questionLine);
        typeText(`Frage ${currentQuestion + 1}: ${questions[currentQuestion].q}`, questionLine, 50, newPrompt);
    } else {
        appendLine(`<div class="output">du hurensohn bekommst gar nichts</div>`);
        newPrompt();
    }
    };


    const handleAnswer = (answer) => {
        const correctAnswers = questions[currentQuestion].a.map(ans => ans.toLowerCase().trim());
        if (correctAnswers.includes(answer.toLowerCase().trim())) {
            appendLine(`<div class="output">Richtig!</div>`);
            currentQuestion++;
        } else {
            appendLine(`<div class="output">Leider falsch</div>`);
        }
        setTimeout(askQuestion, 500);
    };

    const newPrompt = () => {
        const line = document.createElement('div');
        line.innerHTML = '<span class="prompt">monkey@web:~$</span> <input autofocus />';
        consoleEl.appendChild(line);
        const input = line.querySelector('input');
        input.focus();

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const userInput = input.value;
                line.innerHTML = `<span class="prompt">monkey@web:~$</span> ${userInput}`;
                if (currentQuestion < questions.length) {
                    handleAnswer(userInput);
                } else {
                    newPrompt();
                }
            }
        });
    };

    const typeText = (text, element, speed = 65, callback) => {
        let i = 0;
        const typing = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                window.scrollTo(0, document.body.scrollHeight);
            } else {
                clearInterval(typing);
                if (callback) callback();
            }
        }, speed);
    };

    const welcomeLine = document.createElement('div');
    welcomeLine.classList.add('output');
    consoleEl.appendChild(welcomeLine);
    typeText('Hallo Lian😈\nBeantworte mir diese 5 Fragen und du erhälst einen Preis\nTipp: (Antworte immer wie die Frage)', welcomeLine, 50, askQuestion);

    document.body.addEventListener('click', () => {
        const input = document.querySelector('input');
        if (input) input.focus();
    });
});

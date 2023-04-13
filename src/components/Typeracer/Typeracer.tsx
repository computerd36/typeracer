import React, { useRef } from "react";
import finishedpic from "../../assets/finished.png";
import Timer from "../Timer/Timer";

export default function Typeracer(props: { text: string }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [text, setText] = React.useState(props.text);
    const [words, setWords] = React.useState(props.text.split(" "));
    const [finishedWords, setFinishedWords] = React.useState<string[]>([]);
    const [wordcount, setWordcount] = React.useState(words.length);
    const [input, setInput] = React.useState("");
    const [index, setIndex] = React.useState(0);
    const [starttime, setStarttime] = React.useState(0);
    const [time, setTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    const [isFinished, setIsFinished] = React.useState(false);
    const [wpm, setWpm] = React.useState(0);
    const [errors, setErrors] = React.useState(0);
    const [inputEmpty, setInputempty] = React.useState(true);
    const [lastWordWrong, setLastWordWrong] = React.useState(false);

    React.useEffect(() => {
        if (isRunning && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isRunning]);

    React.useEffect(() => {
        if (isRunning && !isFinished) {
            const intervalId = setInterval(() => {
                if (finishedWords.length > 0 && time > 0) {
                    const elapsedSeconds = Math.floor((Date.now() - starttime) / 1000);
                    setWpm(Math.floor(finishedWords.length / (elapsedSeconds / 60)));
                }
            }, 1000); // Call the hook every 1000 milliseconds (1 second)

            // Cleanup function to clear the interval when the component unmounts
            return () => clearInterval(intervalId);
        }
    }, [finishedWords, time]);




    React.useEffect(() => {
        const elapsedSeconds = Math.floor((Date.now() - starttime) / 1000);
        setTime(elapsedSeconds);
        if (isFinished) {
            setText("");
            const elapsedSeconds = Math.floor((Date.now() - starttime) / 1000);
            setTime(elapsedSeconds);
            setWpm(Math.floor(wordcount / (elapsedSeconds / 60)));
        }
    }, [isFinished]);

    function madeError() {
        setLastWordWrong(true);
        const input = document.getElementById("gameinput");
        if (input) {
            input.style.backgroundColor = "red";
            setTimeout(() => {
                input.style.backgroundColor = "black";
            }, 200);
        }
    }


    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);

        if (isRunning && e.target.value === words[0] + " ") {
            setFinishedWords([...finishedWords, words[0]]);
            setText(text.replace(words[0] + " ", ""));
            setWords(words.slice(1));

            if (words.length === 1) {
                setIsFinished(true);
            }
            setLastWordWrong(false);
            setIndex(index + 1);
            setInput("");
            e.target.value = "";
        }

        if (e.target.value === "") {
            setInputempty(true);
        } else {
            setInputempty(false);
        }

        if (e.target.value.charAt(e.target.value.length - 1) === " " && e.target.value !== words[0] + " ") {
            setErrors(errors + 1);
            setInput("");
            setInputempty(true);
            madeError();
        }



    }

    function handleButtonChange(e: React.MouseEvent<HTMLButtonElement>) {
        setStarttime(Date.now());
        setWords(text.split(" "));
        setIsRunning(true);
        setWordcount(words.length);
    }

    function changeText(e: React.ChangeEvent<HTMLSelectElement>) {
        const tPolice = "Excessive and unnecessary force by law enforcement officers is a problem that needs accountability. This requires better training and screening, community oversight, and improved laws to protect citizens. We must demand change for a fairer society.";
        const tBees = "Bees, butterflies, and other insects play a crucial role in pollinating plants, but they are facing serious threats such as habitat loss, pesticides, and climate change. Without these pollinators, many of our favorite fruits and vegetables would disappear. It's important that we take action to protect these essential creatures, such as planting pollinator-friendly gardens, reducing pesticide use, and supporting policies that promote insect conservation. Let's type quickly and spread the word about the importance of protecting bees and other insects!";
        const tCultural = "Cultural appropriation is the adoption of elements from a culture without understanding the significance behind it, perpetuating harmful stereotypes and erasing the history of marginalized communities. Educate yourself and engage in respectful cultural exchange. Let's type fast and promote cultural sensitivity and respect!"
        const tTest = "This is a test.";

        switch (e.target.value) {
            case "police":
                setText(tPolice);
                setWords(tPolice.split(" "));
                break;
            case "bees":
                setText(tBees);
                setWords(tBees.split(" "));
                break;
            case "cultural":
                setText(tCultural);
                setWords(tCultural.split(" "));
                break;
            case "test":
                setText(tTest);
                setWords(tTest.split(" "));
                break;
            default:
                setText(tPolice);
                setWords(tPolice.split(" "));
        }
    }

    function newGame() {
        setIsRunning(false);
        setIsFinished(false);
        setIndex(0);
        setText(props.text);
        setWords(props.text.split(" "));
        setInput("");
        setStarttime(0);
        setTime(0);
        setWpm(0);
        setFinishedWords([""]);
        setErrors(0);
        
    }

    return (
        <div className="maingame">


            {!isRunning && !isFinished && (
                <div className="select">
                    <label htmlFor="select">Text: </label>
                    <select onChange={changeText}>
                        <option value="police">Short: Police Brutality</option>
                        <option value="cultural">Medium: Cultural Appropriation</option>
                        <option value="bees">Long: Bees</option>
                        <option value="test">Test</option>
                    </select>
                </div>
            )}

            {isFinished && (
                time && !isFinished && (
                    <p>
                        It took you {time} seconds for {wordcount} words. Thats {wpm} WPM! <br />
                    </p>

                )
            )}

            {!isRunning && (
                <button
                    data-text="Awesome"
                    className="button"
                    onClick={handleButtonChange}
                >
                    <span className="actual-text">&nbsp;Start&nbsp;Race&nbsp;</span>
                    <span className="hover-text" aria-hidden="true">
                        &nbsp;Start&nbsp;Race&nbsp;
                    </span>
                </button>
            )}

            {isRunning && (
                <>
                    {isRunning && !isFinished && <div className="ingamestats">Typos: {errors}  <Timer /> {wpm} WPM</div>}
                    <div className="gametext">
                        {!isFinished && finishedWords.map((word, index) => (
                            <span key={index} className="finishedwords">
                                {word}{" "}
                            </span>
                        ))}

                        {text}
                        {isFinished &&
                            <div className="score">
                                <img src={finishedpic} alt="You made it!"></img>
                                <a id="scoreaccuracy">{ Math.floor((errors !== 0) ? 100 - (errors / wordcount * 100) : 100)} % accuracy</a>
                                <a id="scorewpm">{wpm} WPM</a>
                                <a id="scoretime">{time} s</a>
                            </div>
                        }
                    </div>
                    {!isFinished && <p id="pnext">Words left: <strong>{words.length} / {wordcount}</strong></p>}
                    {(!isFinished && !inputEmpty) ? <p id="pcurrent">Current word: <strong>{words[0]}</strong></p> : <p>⠀</p>}
                    {!isFinished && <input
                        ref={inputRef}
                        className="input"
                        id="gameinput"
                        onChange={handleInputChange}
                        value={input}
                        placeholder={words[0]}
                    />}
                    {isFinished && <><br /><a onClick={newGame}>Click here to try again.</a></>}


                </>
            )}
        </div>
    );
}

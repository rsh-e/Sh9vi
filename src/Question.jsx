import React, { useState, useEffect } from 'react'
import BasicModal from './Modal'

export default function Question() {
    const [question, setQuestion] = useState('')
    const [result, setResult] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [times, setTimes] = useState([])
    const [averageState, setAverageState] = useState(0)

    //This is to get the high score and update for a new one
    const initialHighscore = parseInt(localStorage.getItem('highScore')) || 0
    const [highscore, setHighscore] = useState(initialHighscore)
    const [alertHighscore, setAlertHighscore] = useState('')
    // idk what this does but without it it doesnt work
    useEffect(() => {
        localStorage.setItem('highScore', highscore.toString())
    }, [highscore])
    // updates to the new score
    const updateScore = () => {
        if (score > highscore) {
            setHighscore(highscore => score)
            setAlertHighscore(alertHighscore => 'you got a new highscore!')
        }
    }

    // This block is for the timer
    const [seconds, setSeconds] = useState(9); // Initial number of seconds
    const [paused, setPaused] = useState(false) // This is to set whether the timer is paused
    useEffect(() => {
        const timer = setInterval(() => {
            if (paused != true) {
                if (seconds > 0) {
                    setSeconds(prevSeconds => prevSeconds - 1);
                }
                else {
                    updateScore()
                    avgTime()
                    clearInterval(timer);
                    // Perform any actions when the timer reaches zero
                    setIsDisabled(true)
                    setResult("you ran out of time")
                }
            }
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup the timer on component unmount
    }, [seconds]);


    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    // The following controls the score
    const [score, setScore] = useState(0)
    // This function increments the score
    function incrementScore() {
        setScore(oldScore => oldScore + 1)
    }
    // This function sets the score to 0
    function nullScore() {
        setScore(score => 0)
    }

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }

    // This block generates the random numbers
    const [inputValue, setInputValue] = useState('')
    const [num1, setNum1] = useState(getRndInteger(1, 100))
    const [num2, setNum2] = useState(getRndInteger(1, 100))
    const [total, setTotal] = useState(num1 + num2)

    // This block ensures that the numbers don't keep changing when something is pressed
    useEffect(() => {
        setNum1(num1)
        setNum2(num2)
        setTotal(num1 + num2)
    }, [])

    const generateNewNumbers = () => {
        let operation = getRndInteger(1, 5)
        // For addition 
        if (operation == 1) {
            const newNum1 = getRndInteger(1, 100)
            const newNum2 = getRndInteger(1, 100)
            setNum1(newNum1)
            setNum2(newNum2)
            setTotal(newNum1 + newNum2)
            setQuestion(question => `${newNum1} + ${newNum2} = `)
        }
        // For subtraction
        else if (operation == 2) {
            const newNum1 = getRndInteger(1, 100)
            const newNum2 = getRndInteger(1, newNum1)
            setNum1(newNum1)
            setNum2(newNum2)
            setTotal(newNum1 - newNum2)
            setQuestion(question => `${newNum1} - ${newNum2} = `)
        }
        // For multiplcation
        else if (operation == 3) {
            const newNum1 = getRndInteger(1, 10)
            const newNum2 = getRndInteger(1, 10)
            setNum1(newNum1)
            setNum2(newNum2)
            setTotal(newNum1 * newNum2)
            setQuestion(question => `${newNum1} * ${newNum2} = `)
        }
        // For divison
        else {
            let newNum1 = 5
            let newNum2 = 2
            while (newNum1 % newNum2 != 0) {
                newNum1 = getRndInteger(1, 100)
                newNum2 = getRndInteger(1, newNum1)
            }
            setNum1(newNum1)
            setNum2(newNum2)
            setTotal(newNum1 / newNum2)
            setQuestion(question => `${newNum1} / ${newNum2} = `)
        }

    }

    useEffect(() => {
        generateNewNumbers()
    }, [])


    // This block checks if the enter key is entered
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEnterPress()
        }
    }

    const recordTime = () => {
        setTimes(oldTimes => [...oldTimes, 9 - seconds])
    }

    const avgTime = () => {
        let sum = 0
        let length = times.length
        for (let i = 0; i < length; i++) {
            sum = sum + times[i]
        }
        let average = Math.round((sum / length) * 10) / 10
        if (isNaN(average)) {
            average = 0
        }
        setAverageState(averageState => average)
    }

    //If the enter key is pressed, then the function checks whether the sum is correct or not
    function handleEnterPress() {
        // If it's correct then the score gets incremented
        if ((inputValue == total) && (seconds != 0)) {
            incrementScore()
            generateNewNumbers()
            setInputValue('')
            setResult('Correct!')
            recordTime()
            setSeconds(9)
        }
        else if (inputValue != total) {
            setInputValue('')
            setResult("your answer was incorrect")
            setIsDisabled(true)
            // The timer get's paused with the following code
            avgTime()
            updateScore()
            setPaused(paused => true)
        }
    }

    function refresh() {
        window.location.reload()
    }

    function restart(result) {
        if (result == "your answer was incorrect") {
            return (
                <>
                    <BasicModal score={score} times={times} average={averageState} highscore={highscore} result={result} alertHighscore={alertHighscore} />

                    <div className="flex items-center justify-around mt-5">
                        <button className="rounded-md bg-black" onClick={refresh}>
                            <span className="block -translate-x-2 -translate-y-2 rounded-md border-2 border-black bg-yellow-500 p-2 text-xl font-bric_grote  hover:-translate-y-3 active:translate-x-0 active:translate-y-0 transition-all"> play again </span>
                        </button>
                    </div>
                </>

            )
        }
        else if (result == "you ran out of time") {
            return (
                <>
                    <BasicModal score={score} times={times} average={averageState} highscore={highscore} result={result} alertHighscore={alertHighscore} />
                    <div className="flex items-center justify-around mt-5">
                        <button className="rounded-md bg-black" onClick={refresh}>
                            <span className="block -translate-x-2 -translate-y-2 rounded-md border-2 border-black bg-yellow-500 p-2 text-xl font-bric_grote  hover:-translate-y-3 active:translate-x-0 active:translate-y-0 transition-all"> play again </span>
                        </button>
                    </div>
                </>
            )
        }
    }


    return (
        <>
            <div className='flex flex-col items-center mt-10 lg:mt-0'>

                <div className='flex flex-row justify-between font-dark_grote text-lg lg:text-xl space-x-[220px] lg:space-x-[520px]'>
                    <p>time: {seconds}</p>
                    <p>score: {score}</p>
                </div>

                <div className="flex items-center justify-around mt-3 lg:mt-5 ml-2">
                    <div className="bg-black rounded-md">
                        <div className="flex flex-row items-center justify-center -translate-x-2 lg:-translate-x-3 -translate-y-2 lg:-translate-y-3 w-[340px] lg:w-[650px] font-dark_grote text-5xl lg:text-8xl p-2 lg:p-7 bg-white rounded-md border-2 border-black">
                            <label>{question}</label>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                maxLength={3}
                                disabled={isDisabled}
                                className='w-24 lg:w-48 pt-2 ml-7 mt-6 px-3 block -translate-x-2 -translate-y-2 rounded-md border-2 bg-white border-black p-2'
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col my-3 text-lg font-bric_grote mt-5'>
                    {result}
                    {restart(result)}
                </div>
            </div >



        </>
    )
}
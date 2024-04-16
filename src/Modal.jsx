import * as React from 'react'
import Modal from '@mui/material/Modal'

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [copied, setCopied] = React.useState('')

    function refresh() {
        window.location.reload()
    }

    const copy = () => setCopied(copied => "Score copied")

    function copyToKeyboard(score) {
        navigator.clipboard.writeText(`i scored ${score} points on the new sh9vi game! see if you can beat it at sh9vi.netlify.app`)
        setCopied(copied => "score copied! share it with your friends!")
    }

    return (
        <div>
            {/* <button onClick={handleOpen} className='border-2 border-black'>Open modal</button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='flex flex-row justify-center align-middle h-screen items-center'>
                    <div className='bg-white w-[350px] md:w-[400px] h-[450px] border-2 border-black rounded-md'>
                        <div className="flex flex-row justify-between border-b-2 border-black pb-3 pt-2">
                            <div className='flex flex-row pl-4'>
                                <h1 className="font-dark_grote font-extrabold text-3xl">sh9vi</h1>
                                {/* <p className="mt-2 ml-2">(by <a href="https://www.linkedin.com/in/rsh-e/" target="_blank" className="underline underline-offset-4 text-violet-600">hrushikesh emkay</a>)</p> */}
                            </div>
                            <div>
                                <button className='px-2 mr-4 mt-1 font-bold font-dark_grote text-2xl' onClick={handleClose}>X</button>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center mt-2'>
                            <h1 className="font-dark_grote font-extrabold text-4xl">game over</h1>
                            <p className='font-dark_grote text-2xl'>{props.result}</p>

                        </div>
                        <div className='flex flex-col items-center justify-center font-bric_grote'>
                            <p className='font-dark_grote text-3xl mb-1 text-yellow-500'>{props.alertHighscore}</p>
                            <p>you scored: {props.score} points</p>
                            <p>avg time to solve: {props.average}s</p>
                            <p>high score: {props.highscore} points</p>
                        </div>
                        <div className='flex flex-col justify-center px-16 space-y-3 mt-6 '>
                            <button className="rounded-md bg-black" onClick={refresh}>
                                <span className="block -translate-x-1 -translate-y-1 rounded-md border-2 border-black bg-yellow-500 p-2 text-xl font-bric_grote  hover:-translate-y-2 active:translate-x-0 active:translate-y-0 transition-all"> play again </span>
                            </button>
                            <button className="rounded-md bg-black" onClick={() => copyToKeyboard(props.score)}>
                                <span className="block -translate-x-1 -translate-y-1 rounded-md border-2 border-black bg-yellow-500 p-2 text-xl font-bric_grote  hover:-translate-y-2 active:translate-x-0 active:translate-y-0 transition-all"> share your score </span>
                            </button>
                        </div>
                        <p className='flex flex-row justify-center mt-3 font-bric_grote text-sm'>i'd apprectiate your feedback, find me <a href='https://twitter.com/rsh_emk' className='underline underline-offset-2 pl-1'>here</a></p>
                        <p className='flex flex-row justify-center font-bric_grote text-sm'>{copied}</p>
                    </div>
                </div>
            </Modal >
        </div >
    );
}
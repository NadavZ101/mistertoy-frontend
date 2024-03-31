import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"

import { UserComments } from "../cmps/UserComments.jsx"
import { CommentModal } from "../cmps/CommentModal.jsx"

import Button from '@mui/material/Button';

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [msg, setMsg] = useState(null)
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId, msg])

    function loadToy() {
        toyService.getToyById(toyId)
            .then(toy => {
                if (!toy.msgs) toy.msgs = []
                setToy(toy)
            })
            .catch(err => {
                console.log('Problem in load toy', err)
                Navigate('/toy')
            })
    }

    async function saveComment(userMsg) {
        if (!userMsg) return

        try {
            const savedMsg = await toyService.addToyMsg(toyId, userMsg)
            console.log("🚀 ~ saveComment ~ savedMsg:", savedMsg)

            setToy(prevToy => ({
                ...prevToy,
                msgs: [...prevToy.msgs, savedMsg]
            }))
        } catch (err) {
            console.error('Problem saving toy message', err)
        }
    }


    if (!toy) return <div>Loading toy...</div>
    return (
        <section className="toy-details">
            <h2>Toy Details</h2>
            <Link to="/toy">←</Link>
            <section className="toy-details-container">
                <p>{toy.name}</p>
                <p>Price: ${toy.price}</p>
                <img className="toy-details-img" src={`https://robohash.org/${toy.name}?set=set2`} />
                <p>Labels: {toy.labels.join(' | ')}</p>
                <p>In Stock: {toy.inStock ? 'Yes' : 'No'}</p>
                <p>Created at: {new Date(toy.createdAt).toLocaleDateString()}</p>


                <p>Users Comments:
                    {
                        toy.msgs &&

                        toy.msgs.map(msg =>
                            <div className="user-msgs" key={msg.id}>
                                <UserComments msg={msg} setMsg={setMsg} />
                            </div>)
                    }
                </p>

                {/* <Button className="btn" onClick={() => setIsCommentModalOpen(true)} variant="Add Comment">Add Comment</Button> */}


            </section>

            <button className="btn" onClick={() => setIsCommentModalOpen(true)}>
                Add Comment
            </button>

            <CommentModal
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}
                onSave={(comment) => saveComment(comment)}
            />

        </section>
    )
}

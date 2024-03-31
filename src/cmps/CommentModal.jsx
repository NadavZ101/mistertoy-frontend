import { useState } from "react";

export function CommentModal({ isOpen, onClose, onSave }) {
    const [comment, setComment] = useState('')

    function handleChange({ target }) {
        const value = target.value
        setComment(value)
    }

    function handleSave() {
        onSave(comment)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="comment-modal">
            <div className="modal-content">
                <pre>
                    <textarea
                        value={comment}
                        onChange={handleChange}
                        placeholder="Enter your comment"
                    />
                </pre>
                <button onClick={handleSave}>Write</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}
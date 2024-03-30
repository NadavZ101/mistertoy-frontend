
export function UserComments({ msg, setMsg }) {
    console.log("🚀 ~ UserComments ~ msg:", msg)

    if (!msg) return <div>Loading Comments...</div>
    return <div className="user-comment">
        <p>name: {msg.by?.fullname}</p>
        <p>comment: {msg.txt}</p>
    </div>

}

export const UserCard = ({ username }: { username: string }) => {
    return (
        <div style={{ border: '2px solid red', padding: '20px' }}>
            <div>{username ?? 'user'}</div>
            <div>password: 123</div>
        </div>
    )
}
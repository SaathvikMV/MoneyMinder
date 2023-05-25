function calculateFriendsExpense(userLoans) {
    const friendMap = new Map()
    for (const friend of userLoans.friends) {
        if (friendMap.has(friend.name)) {
            if (friend.type == "lent") {
                friendMap.set(friend.name, friendMap.get(friend.name) + friend.amount)
            } else {
                friendMap.set(friend.name, friendMap.get(friend.name) - friend.amount)
            }
        } else {
            if (friend.type == "lent") {
                friendMap.set(friend.name, friend.amount)
            } else {
                friendMap.set(friend.name, 0 - friend.amount)
            }
        }
    }
    const allFriendsExpense = []
    for (const [key, value] of friendMap) {
        const obj = {
            name: key,
            expense: value
        }
        allFriendsExpense.push(obj)
    }
    return allFriendsExpense
}

function getFreinds(userLoans) {
    const friendSet = new Set()
    const friends = []
    for (const friend of userLoans.friends) {
        if (!friendSet.has(friend.name)) {
            friends.push(friend.name)
            friendSet.add(friend.name)
        }
    }
    return friends
}
module.exports = { calculateFriendsExpense, getFreinds }
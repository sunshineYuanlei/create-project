export default {
    login(account:string, pwd:string) {
        console.log(account, pwd)
        return {data: {random: Math.random()}}
    }
}
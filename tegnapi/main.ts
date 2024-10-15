interface IUser {
    id: string, userName: string; age: number; address: string; isAdmin: boolean
}

class User implements IUser {
    id: string;
    userName: string;
    age: number;
    address: string;
    isAdmin: boolean;
    constructor(id: string, userName: string, age: number, address: string, isAdmin: boolean) {
        this.id = id;
        this.userName = userName;
        this.age = age;
        this.address = address;
        this.isAdmin = isAdmin;
    }
}




let userArr: User[] = []

function addUser({ userName, age, address, isAdmin }: { userName: string, age: number, address: string, isAdmin: boolean }) {
    let id = (userArr.length ? Math.max(...userArr.map(e => parseInt(e.id))) + 1 : 0).toString()
    userArr.push(new User(id, userName, age, address, isAdmin))
    updateTable(userArr)
}

addUser({ userName: "user1", age: 31, address: "address1", isAdmin: true })
addUser({ userName: "user2", age: 32, address: "address2", isAdmin: false })
addUser({ userName: "user3", age: 33, address: "address3", isAdmin: true })
addUser({ userName: "user4", age: 34, address: "address4", isAdmin: false })
addUser({ userName: "user5", age: 35, address: "address5", isAdmin: true })

function removeUserByAttr(key: string, value: string) {
    userArr = userArr.filter(user => user[key as keyof User] !== value)
    updateTable(userArr)
}

function removeUserById(id: string) {
    if(modifyingId === ''){
        userArr = userArr.filter(user => user.id !== id)
        updateTable(userArr)
    }
}

let modifyingId = ''
function modifyUserById(id: string){
    let currentUser = userArr.find(e=>e.id == id)
    modifyingId = id
    $("#inp_username").val(currentUser!.userName)
    $("#inp_age").val(currentUser!.age)
    $("#inp_address").val(currentUser!.address)
    $("#inp_admin").val(currentUser!.isAdmin.toString())
    modalUp()
}

function concatArrays(arr1: User[], arr2: User[]) {
    return [...arr1, ...arr2]
}

function updateTable(data: User[]) {
    $("tbody").html(
        (data.map((e) =>
            `<tr>
                <td>${e.id}</td>
                <td>${e.userName}</td>
                <td>${e.age}</td>
                <td>${e.address}</td>
                <td>${e.isAdmin}</td>
                <td>
                    <button onclick="removeUserById('${e.id}')" type="button">Remove</button>
                    <button onclick="modifyUserById('${e.id}')" type="button">Modify</button>
                </td>
            </tr>`
        )).join()
    )
}

$(document).on("DOMContentLoaded", () => {
    updateTable(userArr)
})

function modalUp() {
    $("form").css("display", "flex")
}

function modalDown() {
    $("form").css("display", "none")
    modifyingId = ''
}

function modalSubmit() {
    let attrs = {userName: "", age: "", address: "", admin: false}
    $("form>input").each(function () {
        var input = $(this); // This is the jquery object of the input, do what you will
        console.log()
        switch (input.attr("id")) {
            case "inp_username":
                attrs.userName = input.val()!.toString()
                break;

            case "inp_age":
                attrs["age"] = input.val()!.toString()
                break;

            case "inp_address":
                attrs["address"] = input.val()!.toString()
                break;

            case "inp_admin":
                attrs["admin"] = input.is(":checked")!
                break;
        }
    })
    if (attrs["age"] !== "") {
        if(modifyingId != ''){
            let modifyingIndex = userArr.findIndex(e=>e.id == modifyingId)
            console.warn(userArr.find(e=>e.id == modifyingId));
            userArr[modifyingIndex] = {
                id: modifyingId,
                userName: attrs.userName, 
                age: parseInt(attrs.age),
                address: attrs.address,
                isAdmin: attrs.admin
            }
            console.info(userArr.find(e=>e.id == modifyingId));
            updateTable(userArr)
        } else{
            addUser({
                userName: attrs.userName, 
                age: parseInt(attrs.age),
                address: attrs.address,
                isAdmin: attrs.admin
            })
        }
        
        modalDown()
    }
}

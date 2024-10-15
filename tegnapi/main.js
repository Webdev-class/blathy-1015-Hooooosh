var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var User = /** @class */ (function () {
    function User(id, userName, age, address, isAdmin) {
        this.id = id;
        this.userName = userName;
        this.age = age;
        this.address = address;
        this.isAdmin = isAdmin;
    }
    return User;
}());
var userArr = [];
function addUser(_a) {
    var userName = _a.userName, age = _a.age, address = _a.address, isAdmin = _a.isAdmin;
    var id = (userArr.length ? Math.max.apply(Math, userArr.map(function (e) { return parseInt(e.id); })) + 1 : 0).toString();
    userArr.push(new User(id, userName, age, address, isAdmin));
    updateTable(userArr);
}
addUser({ userName: "user1", age: 31, address: "address1", isAdmin: true });
addUser({ userName: "user2", age: 32, address: "address2", isAdmin: false });
addUser({ userName: "user3", age: 33, address: "address3", isAdmin: true });
addUser({ userName: "user4", age: 34, address: "address4", isAdmin: false });
addUser({ userName: "user5", age: 35, address: "address5", isAdmin: true });
function removeUserByAttr(key, value) {
    userArr = userArr.filter(function (user) { return user[key] !== value; });
    updateTable(userArr);
}
function removeUserById(id) {
    if (modifyingId === '') {
        userArr = userArr.filter(function (user) { return user.id !== id; });
        updateTable(userArr);
    }
}
var modifyingId = '';
function modifyUserById(id) {
    var currentUser = userArr.find(function (e) { return e.id == id; });
    modifyingId = id;
    $("#inp_username").val(currentUser.userName);
    $("#inp_age").val(currentUser.age);
    $("#inp_address").val(currentUser.address);
    $("#inp_admin").val(currentUser.isAdmin.toString());
    modalUp();
}
function concatArrays(arr1, arr2) {
    return __spreadArray(__spreadArray([], arr1, true), arr2, true);
}
function updateTable(data) {
    $("tbody").html((data.map(function (e) {
        return "<tr>\n                <td>".concat(e.id, "</td>\n                <td>").concat(e.userName, "</td>\n                <td>").concat(e.age, "</td>\n                <td>").concat(e.address, "</td>\n                <td>").concat(e.isAdmin, "</td>\n                <td>\n                    <button onclick=\"removeUserById('").concat(e.id, "')\" type=\"button\">Remove</button>\n                    <button onclick=\"modifyUserById('").concat(e.id, "')\" type=\"button\">Modify</button>\n                </td>\n            </tr>");
    })).join());
}
$(document).on("DOMContentLoaded", function () {
    updateTable(userArr);
});
function modalUp() {
    $("form").css("display", "flex");
}
function modalDown() {
    $("form").css("display", "none");
    modifyingId = '';
}
function modalSubmit() {
    var attrs = { userName: "", age: "", address: "", admin: false };
    $("form>input").each(function () {
        var input = $(this); // This is the jquery object of the input, do what you will
        console.log();
        switch (input.attr("id")) {
            case "inp_username":
                attrs.userName = input.val().toString();
                break;
            case "inp_age":
                attrs["age"] = input.val().toString();
                break;
            case "inp_address":
                attrs["address"] = input.val().toString();
                break;
            case "inp_admin":
                attrs["admin"] = input.is(":checked");
                break;
        }
    });
    if (attrs["age"] !== "") {
        if (modifyingId != '') {
            var modifyingIndex = userArr.findIndex(function (e) { return e.id == modifyingId; });
            console.warn(userArr.find(function (e) { return e.id == modifyingId; }));
            userArr[modifyingIndex] = {
                id: modifyingId,
                userName: attrs.userName,
                age: parseInt(attrs.age),
                address: attrs.address,
                isAdmin: attrs.admin
            };
            console.info(userArr.find(function (e) { return e.id == modifyingId; }));
            updateTable(userArr);
        }
        else {
            addUser({
                userName: attrs.userName,
                age: parseInt(attrs.age),
                address: attrs.address,
                isAdmin: attrs.admin
            });
        }
        modalDown();
    }
}

//Font size for all which doesnt have
var elements = document.querySelectorAll( 'body *' );
for (es = 0; es < elements.length; es++) {
    if (elements[es].style.fontSize == "") {
        elements[es].style.fontSize = "14"
    }
}
window.addEventListener('online', function() {
    notify("Internet connection restored")
    document.getElementById("noInternet2").hidden = true;
});
window.addEventListener('offline', function() {
    notify("Internet Connection lost")
    document.getElementById("noInternet2").hidden = false;
});
function recheckInternet() {
    if (navigator.onLine == true) {
        document.getElementById("noInternet").hidden = true;
    } else {
        notify("Check your internet connection and try again")
        document.getElementById("noInternet").hidden = false;
    }
}
//functions
function setScreen(scrnId) {
    for (i = 0; i < document.querySelectorAll(".scrn").length; i++) {
        if(document.getElementsByClassName("scrn")[i].id == scrnId) {
            document.getElementById(document.getElementsByClassName("scrn")[i].id).hidden = false;
        } else {
            document.getElementById(document.getElementsByClassName("scrn")[i].id).hidden = true;
        }
    }
}
function findInUsername(arra, valName) {
    let finder = arra.findIndex(function(element) {
        if (element.username == valName) {
            return true;
        }
        return false;
    });
    return(finder)
}
function findInUserId(arra, valName) {
    let finder = arra.findIndex(function(element) {
        if (element.userId == valName) {
            return true;
        }
        return false;
    });
    return(finder)
}
function findInCreateDate(arra, valName) {
    let finder = arra.findIndex(function(element) {
        if (element.createDate == valName) {
            return true;
        }
        return false;
    });
    return(finder)
}
function findInIds(arra, valName) {
    let finder = arra.findIndex(function(element) {
        if (element.id == valName) {
            return true;
        }
        return false;
    });
    return(finder)
}
function animation(id, animationName, duration) {
    document.getElementById(id).style.animationName=animationName;
    document.getElementById(id).style.animationDuration=duration
    document.getElementById(id).style.animationFillMode="forwards"
}
var notifyWait;
function notify(msg) {
    clearTimeout(notifyWait)
    document.getElementById("notify").innerHTML = msg;
    animation("notify", "notifyIn", "0.5s")
    notifyWait = setTimeout(function() {
        animation("notify", "notifyOut", "1.5s")
    }, 2000)
}
function getFullDates() {
    let dates = new Date();
    let date = dates.getDate();
    let month = parseInt(dates.getMonth()) + 1;
    if (date < 10) {
        date = "0" + date
    }
    if (month < 10) {
        month = "0" + month
    }
    return(date + ":" + month + ":" + (dates.getFullYear()))
}
function message(placeHolder, enableSeconds) {
    let div = document.createElement("div")
    div.style.width = "65%"
    div.style.position = "fixed"
    div.style.top = "0%"
    div.style.left = "12.5%"
    div.style.borderStyle = "solid"
    div.style.borderWidth ="1px"
    div.style.borderRadius = "15px"
    div.style.backgroundColor = "white"
    div.style.zIndex = "99999"
    div.style.padding ="5%"
    let label = document.createElement("label")
    label.innerHTML = placeHolder,
    label.style.display = "inline-block"
    label.style.width = "100%";
    let ok = document.createElement("button");
    ok.style.width = "25%"
    ok.innerHTML = "OK (" + enableSeconds + "s)"
    ok.style.float = "right"
    ok.style.borderStyle = "none"
    ok.style.backgroundColor = "white"
    ok.disabled = true;
    div.appendChild(label)
    div.appendChild(document.createElement("br"))
    div.appendChild(document.createElement("br"))
    div.appendChild(ok)
    document.body.appendChild(div)
    div.style.top = (((window.getComputedStyle(document.body).height).slice(0,this.length - 2) / 2) - (div.clientHeight / 2)) + "px"
    document.getElementById("barrier2").hidden = false;
    if (enableSeconds < 0) {
        ok.hidden = true;
    } else if (enableSeconds == 0) {
        ok.innerHTML = "OK"
        ok.hidden = false;
        ok.disabled = false;
    } else {
        let CDNum = enableSeconds;
        let CD = setInterval(function() {
            CDNum -= 1;
            ok.innerHTML = "OK (" + CDNum + "s)"
            if (CDNum <= 0) {
                ok.disabled = false;
                ok.innerHTML = "OK";
                clearInterval(CD);
            }
        }, 1000)
    }
    ok.onclick = function() {
        div.remove()
        document.getElementById("barrier2").hidden = true;
    }
}
function getCurrentTime() {
    let date = new Date()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let ampm = "am"
    if (hour > 12) {
        hour = hour - 12;
        ampm = "pm";
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    return(hour+":"+minute+" "+ampm)
}
function extractTime(time) {
    let obj = {"hour": "", "minute": "", "ampm": ""}
    let extract = time.split(":")
    obj.hour = parseInt(extract[0])
    obj.minute = parseInt(extract[1].split(" ")[0])
    obj.ampm = extract[1].split(" ")[1]
    return(obj)
}
function time2seconds(time) {
    let extract = extractTime(time)
    let hour = extract.hour;
    let minute = extract.minute;
    if (extract.ampm == "pm") {
        hour += 12
    }
    minute += hour * 60;
    let second = minute * 60;
    return(second)
}
function asc(arr) {
    return(arr.sort(function(b, a){return b-a}));
}
function timeInputValue(id) {
    let raw = document.getElementById(id).value.split(":");
    let hour = raw[0]
    let minute = raw[1]
    let ampm = "am"
    if (parseInt(hour) > 12) {
        hour = hour - 12;
        ampm = "pm"
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    return(hour + ":" + minute + " " + ampm)
}
setTimeout(function() {
    document.getElementById("noInternet").hidden = true;
    if (navigator.onLine == true) {
        readRecords("users", {}, function(records) {
            setScreen("homeScrn")
        }) 
    } else {
        document.getElementById("noInternet").hidden = false;
    }
}, 1500)
//Setup
function setCenter() {
    let pxVal = ((parseInt(document.body.clientWidth) / 2) - (320 / 2))
    document.getElementById("screens").style.left = ((100 * pxVal) / document.body.offsetWidth) + "%";
}
setCenter();
document.body.onresize = function() { 
    setCenter();
}
//Notifier Control
document.getElementById("notify").onclick = function() {
    animation("notify", "notifyOut", "0.5s");
    clearTimeout(notifyWait)
}
//If not proceeded
setTimeout(function() {
    if (document.getElementById("splashScrn").hidden == false) {
        document.getElementById("noInternet").hidden = false;
        notify("Please check your internet connection and try again")
    }
}, 5000)
//Menu
var menu;
readRecords("menu", {}, function(records) {
    menu = records;
});
//Home Screen
document.getElementById("homeBtn").onclick = function() {
    setScreen("homeScrn")
    this.hidden = true;
    if (document.getElementById("reader").innerHTML != "") {
        html5QrCode.stop()
    }
}
//Orders
var fromBill = [false];
function findInItem(arra, valName) {
    let finder = arra.findIndex(function(element) { 
        if (element.item == valName) {
            return true;
        }
        return false;
    });
    return(finder)
}
document.getElementById("orders").onclick = function() {
    setScreen("orderScrn")
    document.getElementById("homeBtn").hidden = false;
    document.getElementById("ordersHolder").innerHTML = "Loading. Please wait..."
    var yourOrders = []
    let orderWait = 0;
    var orders;
    var preOrders;
    console.log(getFullDates())
    readRecords("orders", {date: getFullDates()}, function(records) {
        orders = records;
        for (let yo = 0; yo < records.length; yo++) {
            yourOrders.push(records[yo])
        }
        orderWait += 1;
    })
    readRecords("preOrders", {date: getFullDates()}, function(records) {
        preOrders = records;
        for (let yo = 0; yo < records.length; yo++) {
            yourOrders.push(records[yo])
        }
        orderWait += 1;
    })
    let orderWaiter = setInterval(function() {
        if (orderWait == 2) {
            document.getElementById("ordersHolder").innerHTML = ""
            clearInterval(orderWaiter)
            var ordersTimeList = []
            for (let otl = 0; otl < yourOrders.length; otl++) {
                ordersTimeList.push("[\"" + yourOrders[otl].time + "\", " + yourOrders[otl].id + ", \"" + yourOrders[otl].type + "\", \"" + yourOrders[otl].date + "\"]");
            }
            asc(ordersTimeList);
            let toClickBtn = "";
            for (let ol = 0; ol < ordersTimeList.length; ol++) {
                let orderBtn = document.createElement("button");
                orderBtn.value = "{\"id\":"+JSON.parse(ordersTimeList[ol])[1]+",\"type\":\""+JSON.parse(ordersTimeList[ol])[2]+"\"}";
                orderBtn.innerHTML = JSON.parse(ordersTimeList[ol])[3] + ", " + JSON.parse(ordersTimeList[ol])[0]
                let orderLabel = document.createElement("label")
                orderLabel.style.float = "right";
                orderLabel.innerHTML = "- " + JSON.parse(ordersTimeList[ol])[2]
                orderLabel.onclick = function(labe) { 
                    labe.target.parentElement.click();
                }   
                orderBtn.appendChild(orderLabel)
                orderBtn.style.width = "100%";
                orderBtn.style.fontSize = "15"
                orderBtn.style.fontWeight = "bolder"
                orderBtn.style.textAlign = "left"
                document.getElementById("ordersHolder").appendChild(orderBtn)
                document.getElementById("ordersHolder").appendChild(document.createElement("br"))
                document.getElementById("ordersHolder").appendChild(document.createElement("br"))
                orderBtn.onclick = function(btn) {
                    setScreen("orderInfoScrn")
                    document.getElementById("orderTotal").innerHTML = "0"
                    let typeOfOrder;
                    let orderId = JSON.parse(btn.target.value).id;
                    if (JSON.parse(btn.target.value).type == "Order") {
                        typeOfOrder = orders;
                    } else {
                        typeOfOrder = preOrders;
                    }
                    if (JSON.parse(btn.target.value).type == "Order") {
                        document.getElementById("orderTableNumber").innerHTML = typeOfOrder[findInIds(typeOfOrder, orderId)].tableNumber;
                    } else {
                        if (typeOfOrder[findInIds(typeOfOrder, orderId)].tableNumber != "") {
                            document.getElementById("orderTableNumber").innerHTML = typeOfOrder[findInIds(typeOfOrder, orderId)].tableNumber;
                        } else {
                            document.getElementById("orderTableNumber").innerHTML = '<label style="background-color: red;">Not arrived yet</label>'
                        }
                    }
                    document.getElementById("orderMembers").innerHTML = typeOfOrder[findInIds(typeOfOrder, orderId)].members;
                    document.getElementById("orderRemarks").value = typeOfOrder[findInIds(typeOfOrder, orderId)].remarks;
                    let orderNum = 0;
                    let specOrder = JSON.parse(typeOfOrder[findInIds(typeOfOrder, orderId)].orders)
                    document.getElementById("orderListHolder").innerHTML = ""
                    for (let os = 0; os < specOrder.length; os++) {
                        let orderDiv = document.createElement("div");
                        orderDiv.style.width = "100%";
                        orderDiv.style.outlineStyle = "solid"
                        orderDiv.style.outlineWidth = "1px"
                        let orderInp = document.createElement("label");
                        orderInp.style.display = "inline-block";
                        orderInp.id = "orderInput"+orderNum;
                        orderInp.style.width = "50%";
                        orderInp.innerHTML = specOrder[os].item;
                        orderInp.style.outlineStyle = "solid"
                        orderInp.style.outlineWidth = "1px"
                        orderInp.style.paddingTop = "3px"
                        orderInp.style.paddingBottom = "3px"
                        let orderQuantity = document.createElement("label");
                        orderQuantity.style.display = "inline-block"
                        orderQuantity.id = "orderQuantity"+orderNum;
                        orderQuantity.style.width = "25%";
                        orderQuantity.innerHTML = specOrder[os].quantity;
                        orderQuantity.style.outlineStyle = "solid"
                        orderQuantity.style.outlineWidth = "1px"
                        orderQuantity.style.paddingTop = "3px"
                        orderQuantity.style.paddingBottom = "3px"
                        let orderAmount = document.createElement("label")
                        orderAmount.style.display = "inline-block"
                        orderAmount.style.width = "25%";
                        orderAmount.innerHTML = parseInt(menu[findInItem(menu, specOrder[os].item)].price) * parseInt(specOrder[os].quantity);
                        orderAmount.style.outlineStyle = "solid"
                        orderAmount.style.outlineWidth = "1px"
                        orderAmount.style.paddingTop = "3px"
                        orderAmount.style.paddingBottom = "3px"
                        document.getElementById("orderTotal").innerHTML = parseInt(document.getElementById("orderTotal").innerHTML) + (parseInt(menu[findInItem(menu, specOrder[os].item)].price) * parseInt(specOrder[os].quantity)) 
                        orderDiv.appendChild(orderInp);
                        orderDiv.appendChild(orderQuantity);
                        orderDiv.appendChild(orderAmount);
                        document.getElementById("orderListHolder").appendChild(orderDiv)
                        orderNum += 1
                    }
                    if (btn.target.value == "Order") {
                        if (orders[findInIds(orders, btn.target.id)].used == true) {
                            document.getElementById("orderPaid").hidden = true;
                        } else {
                            document.getElementById("orderPaid").hidden = false;
                        }
                    }
                    let orderType;
                    if (btn.target.value == "Pre Order") {
                        orderType = "preOrders"
                    } else {
                        orderType = "orders"
                    }
                    if (eval(orderType)[findInIds(eval(orderType), JSON.parse(btn.target.value).id)].used == true) {
                        document.getElementById("orderPaid").hidden = true;
                    } else {
                        document.getElementById("orderPaid").hidden = false;
                    }
                    document.getElementById("orderPaid").onclick = function() {
                        document.getElementById("orderPaid").disabled = true;
                        updateRecord(orderType, {id: JSON.parse(btn.target.value).id, userId: eval(orderType)[findInIds(eval(orderType), JSON.parse(btn.target.value).id)].userId, orders: eval(orderType)[findInIds(eval(orderType), JSON.parse(btn.target.value).id)].orders, members: eval(orderType)[findInIds(eval(orderType), JSON.parse(btn.target.value).id)].members, remarks: eval(orderType)[findInIds(eval(orderType), JSON.parse(btn.target.value).id)].remarks, date: eval(orderType)[findInIds(eval(orderType), JSON.parse(btn.target.value).id)].date, used: true, type: eval(orderType)[findInIds(eval(orderType), JSON.parse(btn.target.value).id)].type, time: eval(orderType)[findInIds(eval(orderType), JSON.parse(btn.target.value).id)].time, tableNumber: eval(orderType)[findInIds(eval(orderType), JSON.parse(btn.target.value).id)].tableNumber, arrived: eval(orderType)[findInIds(eval(orderType), JSON.parse(btn.target.value).id)].arrived}, function(record, success) {
                            document.getElementById("orderPaid").innerHTML = "Done";
                        })
                    }
                }
                if (fromBill[0] == true) {
                    if (fromBill[1].type == JSON.parse(ordersTimeList[ol])[2] && fromBill[1].id == JSON.parse(ordersTimeList[ol])[1]) {
                        fromBill[0] = false;
                        toClickBtn = orderBtn;
                    }
                    if (ol == (ordersTimeList.length - 1) && fromBill[0] == true) {
                        message("Invalid or expired Code");
                        fromBill[0] = false;
                    }
                }
            }
            document.body.scrollTop = document.body.scrollHeight
            if (toClickBtn != "") {
                toClickBtn.click();
            }
        }
    }, 100);
}
//Bills
var html5QrCode;
document.getElementById("bill").onclick = function() {
    setScreen("billScrn")
    document.getElementById("homeBtn").hidden = false;
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            var cameraId = devices[0].id;
            document.getElementById("reader").innerHTML = ""
            html5QrCode = new Html5Qrcode("reader");
            const qrCodeSuccessCallback = (decodedText, decodedResult) => {
                fromBill = [true, JSON.parse(decodedText)]
                document.getElementById("orders").click();
                html5QrCode.stop().then((ignore) => {
                    // QR Code scanning is stopped.
                }).catch((err) => {
                    // Stop failed, handle it.
                });
            };
            const config = { fps: 30, qrbox: { width: 320, height: 320 } };
            // If you want to prefer back camera
            html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
        }
    }).catch(err => {
        message("An error occured", 0)
    });
}
//Menu
document.getElementById("menu").onclick = function() {
    document.getElementById("homeBtn").hidden = false;
    setScreen("menuScrn");
}
function updateMenu(records) {
    document.getElementById("menuHolder").innerHTML = "";
    var menuTypes = []
    for (mt = 0; mt < menu.length; mt++) {
        if (menuTypes.indexOf(menu[mt].type) == -1) {
            menuTypes.push(menu[mt].type);
        }
    }
    let indexNum = 0;
    for (t = 0; t < menuTypes.length; t++) {
        let title = document.createElement("div");
        title.innerHTML = menuTypes[t]
        title.style.fontSize = "20";
        title.style.fontWeight = "bolder"
        title.style.width = "100%";
        document.getElementById("menuHolder").appendChild(title);
        let table = document.createElement("table");
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";
        table.style.borderStyle = "solid";
        table.style.borderColor = "black"
        table.style.borderWidth = "2px"
        table.value = menuTypes[t]
        let headerTr = document.createElement("tr")
        headerTr.style.borderStyle = "solid";
        headerTr.style.borderColor = "black"
        headerTr.style.borderWidth = "2px"
        let headerTh0 = document.createElement("th");
        headerTh0.style.borderStyle = "solid";
        headerTh0.style.borderColor = "black"
        headerTh0.style.borderWidth = "1px 2px 1px 1px"
        headerTh0.style.width = "10%"
        headerTh0.innerHTML = "Sl. No"
        headerTr.appendChild(headerTh0);
        let headerTh1 = document.createElement("th");
        headerTh1.style.borderStyle = "solid";
        headerTh1.style.borderColor = "black"
        headerTh1.style.borderWidth = "1px 2px 1px 1px"
        headerTh1.innerHTML = "Item"
        headerTr.appendChild(headerTh1);
        let headerTh2 = document.createElement("th");
        headerTh2.style.borderStyle = "solid";
        headerTh2.style.borderColor = "black";
        headerTh2.style.borderWidth = "1px";
        headerTh2.style.width = "15%";
        headerTh2.innerHTML = "Price"
        headerTr.appendChild(headerTh2);
        let headerTh3 = document.createElement("th");
        headerTh3.style.borderStyle = "solid";
        headerTh3.style.borderColor = "black";
        headerTh3.style.borderWidth = "1px";
        headerTh3.style.width = "15%";
        headerTh3.innerHTML = "Edit/Delete"
        headerTh3.style.textAlign = "center";
        headerTr.appendChild(headerTh3);
        table.appendChild(headerTr);
        let menuWithType = [];
        for (mwt = 0; mwt < menu.length; mwt++) {
            if (menu[mwt].type == menuTypes[t]) {
                menuWithType.push(menu[mwt]);
            }
        }
        for (let g = 0; g < menuWithType.length; g++) {
            let dishRow = document.createElement("tr")
            let slCell = document.createElement("td");
            slCell.style.borderStyle = "solid";
            slCell.style.borderColor = "black"
            slCell.style.borderWidth = "1px 2px 1px 1px"
            slCell.style.width = "7.5%";
            slCell.innerHTML = parseInt(g) + 1;
            dishRow.appendChild(slCell);
            let itemCell = document.createElement("td");
            itemCell.id = "cell"+indexNum+"."+1
            itemCell.style.borderStyle = "solid";
            itemCell.style.borderColor = "black"
            itemCell.style.borderWidth = "1px 2px 1px 1px"
            itemCell.innerHTML = menuWithType[g].item;
            dishRow.appendChild(itemCell);
            let priceCell = document.createElement("td");
            priceCell.id = "cell"+indexNum+"."+2
            priceCell.style.borderStyle = "solid";
            priceCell.style.borderColor = "black"
            priceCell.style.borderWidth = "1px 2px 1px 1px"
            priceCell.style.width = "15%";
            priceCell.innerHTML = menuWithType[g].price;
            dishRow.appendChild(priceCell);
            let editCell = document.createElement("td");
            editCell.style.borderStyle = "solid";
            editCell.style.borderColor = "black"
            editCell.style.borderWidth = "1px"
            editCell.style.width = "20%";
            editCell.style.textAlign = "center";
            let delBtn = document.createElement("button")
            delBtn.id = "del"+g
            delBtn.innerHTML = "Delete"
            delBtn.value = menuWithType[g].id;
            delBtn.onclick = function(btn) {
                btn.target.innerHTML = "Deleting"
                btn.target.disabled = true;
                deleteRecord("menu", {id:btn.target.value}, function(success) {
                    btn.target.innerHTML = "Delete"
                    btn.target.disabled = false;
                    if (success == true) {
                        updateMenu(menu.splice(findInIds(menu, btn.target.value), 1))
                    }
                });
            }
            let saveBtn = document.createElement("button")
            saveBtn.hidden = true;
            saveBtn.id = "save"+indexNum
            saveBtn.innerHTML = "Save"
            saveBtn.value = JSON.stringify({id: menuWithType[g].id, index: indexNum});
            saveBtn.onclick = function(btn) {
                btn.target.innerHTML = "Saving"
                btn.target.disabled = true;
                let val = JSON.parse(btn.target.value)
                updateRecord("menu", {id:val.id, item: document.getElementById("cell"+val.index+"."+1).childNodes[0].value, price: document.getElementById("cell"+val.index+"."+2).childNodes[0].value, type: document.getElementById("cell"+val.index+"."+2).parentElement.parentElement.value}, function(record, success) {
                    btn.target.innerHTML = "Save"
                    btn.target.disabled = false;
                    if (success == true) {
                        menu[findInIds(menu, val.id)].item = record.item;
                        menu[findInIds(menu, val.id)].price = record.price;
                        menu[findInIds(menu, val.id)].type = record.type;
                        updateMenu(menu)
                    } else {
                        message("Failed", 0);
                    }
                });
            }
            let cancelBtn = document.createElement("button")
            cancelBtn.hidden = true;
            cancelBtn.id = "cancel"+indexNum
            cancelBtn.innerHTML = "Cancel"
            cancelBtn.value = JSON.stringify({id: menuWithType[g].id, index: indexNum});
            cancelBtn.onclick = function() {
                updateMenu(menu)
            }
            let editBtn = document.createElement("button")
            editBtn.id = "edit"+indexNum
            editBtn.innerHTML = "Edit"
            editBtn.value = JSON.stringify({id: menuWithType[g].id, index: indexNum});
            editBtn.onclick = function(btn) {
                let val = JSON.parse(btn.target.value)
                for (let e = 1; e < 3; e++) {
                    let inp = document.createElement("input");
                    if (e == 2) {
                        inp.type = "number"
                    }
                    inp.value = document.getElementById("cell"+val.index+"."+e).innerHTML;
                    inp.style.width = "100%"
                    document.getElementById("cell"+val.index+"."+e).innerHTML = ""
                    document.getElementById("cell"+val.index+"."+e).appendChild(inp);
                    document.getElementById("edit"+val.index).hidden = true;
                    document.getElementById("del"+val.index).hidden = true;
                    document.getElementById("save"+val.index).hidden = false;
                    document.getElementById("cancel"+val.index).hidden = false;
                }
            }
            editCell.appendChild(delBtn)
            editCell.appendChild(cancelBtn)
            editCell.appendChild(editBtn)
            editCell.appendChild(saveBtn)
            dishRow.appendChild(editCell);
            table.appendChild(dishRow);
            indexNum += 1;
        }
        let dishRow = document.createElement("tr")
        let slCell = document.createElement("td");
        slCell.style.borderStyle = "solid";
        slCell.style.borderColor = "black"
        slCell.style.borderWidth = "1px 2px 1px 1px"
        slCell.style.width = "7.5%";
        slCell.innerHTML = "#";
        dishRow.appendChild(slCell);
        let itemCell = document.createElement("td");
        itemCell.id = "add"+t+".1"
        itemCell.style.borderStyle = "solid";
        itemCell.style.borderColor = "black"
        itemCell.style.borderWidth = "1px 2px 1px 1px"
        itemCell.innerHTML = "<input style=\"width: 100%\" placeholder=\"New item name\">";
        dishRow.appendChild(itemCell);
        let priceCell = document.createElement("td");
        priceCell.id = "add"+t+".2"
        priceCell.style.borderStyle = "solid";
        priceCell.style.borderColor = "black"
        priceCell.style.borderWidth = "1px 2px 1px 1px"
        priceCell.style.width = "15%";
        priceCell.innerHTML = "<input style=\"width: 100%\" placeholder=\"Price\" type=\"number\">";
        dishRow.appendChild(priceCell);
        let editCell = document.createElement("td");
        editCell.style.borderStyle = "solid";
        editCell.style.borderColor = "black"
        editCell.style.borderWidth = "1px"
        editCell.style.width = "20%";
        editCell.style.textAlign = "center";
        let addBtn = document.createElement("button")
        addBtn.innerHTML = "Add"
        addBtn.value = t;
        addBtn.onclick = function(btn) {
            let val2 = btn.target.value
            if ((document.getElementById("add"+val2+".1").childNodes[0].value).trim() != "" && (document.getElementById("add"+val2+".2").childNodes[0].value).trim() != "") {
                btn.target.innerHTML = "Adding"
                btn.target.disabled = true;
                createRecord("menu", {item: document.getElementById("add"+val2+".1").childNodes[0].value, price: document.getElementById("add"+val2+".2").childNodes[0].value, type: menuTypes[val2]}, function(record) {
                    menu.push({
                        id: record.id,
                        item: record.item,
                        price: record.price,
                        type: record.type
                    })
                    updateMenu(menu)
                });
            } else {
                message("Fill up all the spaces first", 0)
            }
        }
        editCell.appendChild(addBtn)
        dishRow.appendChild(editCell);
        table.appendChild(dishRow);
        document.getElementById("menuHolder").appendChild(table)
        document.getElementById("menuHolder").appendChild(document.createElement("br"));
    }
    let title = document.createElement("div");
    title.innerHTML = "<input id=\"newCategory\" placeholder=\"New Category Name\" style=\"font-size: 20; font-weight: bolder; \">"
    title.style.width = "100%";
    document.getElementById("menuHolder").appendChild(title);
    let table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";
    table.style.borderStyle = "solid";
    table.style.borderColor = "black"
    table.style.borderWidth = "2px"
    table.value = ""
    let headerTr = document.createElement("tr")
    headerTr.style.borderStyle = "solid";
    headerTr.style.borderColor = "black"
    headerTr.style.borderWidth = "2px"
    let headerTh0 = document.createElement("th");
    headerTh0.style.borderStyle = "solid";
    headerTh0.style.borderColor = "black"
    headerTh0.style.borderWidth = "1px 2px 1px 1px"
    headerTh0.style.width = "10%"
    headerTh0.innerHTML = "Sl. No"
    headerTr.appendChild(headerTh0);
    let headerTh1 = document.createElement("th");
    headerTh1.style.borderStyle = "solid";
    headerTh1.style.borderColor = "black"
    headerTh1.style.borderWidth = "1px 2px 1px 1px"
    headerTh1.innerHTML = "Item"
    headerTr.appendChild(headerTh1);
    let headerTh2 = document.createElement("th");
    headerTh2.style.borderStyle = "solid";
    headerTh2.style.borderColor = "black";
    headerTh2.style.borderWidth = "1px";
    headerTh2.style.width = "15%";
    headerTh2.innerHTML = "Price"
    headerTr.appendChild(headerTh2);
    let headerTh3 = document.createElement("th");
    headerTh3.style.borderStyle = "solid";
    headerTh3.style.borderColor = "black";
    headerTh3.style.borderWidth = "1px";
    headerTh3.style.width = "15%";
    headerTh3.innerHTML = "Edit/Delete"
    headerTh3.style.textAlign = "center";
    headerTr.appendChild(headerTh3);
    table.appendChild(headerTr);
    let dishRow = document.createElement("tr")
    let slCell = document.createElement("td");
    slCell.style.borderStyle = "solid";
    slCell.style.borderColor = "black"
    slCell.style.borderWidth = "1px 2px 1px 1px"
    slCell.style.width = "7.5%";
    slCell.innerHTML = "#";
    dishRow.appendChild(slCell);
    let itemCell = document.createElement("td");
    itemCell.id = "newCell1"
    itemCell.style.borderStyle = "solid";
    itemCell.style.borderColor = "black"
    itemCell.style.borderWidth = "1px 2px 1px 1px"
    itemCell.innerHTML = "<input style=\"width: 100%\" placeholder=\"New item name\">";
    dishRow.appendChild(itemCell);
    let priceCell = document.createElement("td");
    priceCell.id = "newCell2"
    priceCell.style.borderStyle = "solid";
    priceCell.style.borderColor = "black"
    priceCell.style.borderWidth = "1px 2px 1px 1px"
    priceCell.style.width = "15%";
    priceCell.innerHTML = "<input style=\"width: 100%\" placeholder=\"New item's price\" type=\"number\">";
    dishRow.appendChild(priceCell);
    let editCell = document.createElement("td");
    editCell.style.borderStyle = "solid";
    editCell.style.borderColor = "black"
    editCell.style.borderWidth = "1px"
    editCell.style.width = "20%";
    editCell.style.textAlign = "center";
    let addBtn = document.createElement("button")
    addBtn.innerHTML = "Add"
    addBtn.onclick = function(btn) {
        if ((document.getElementById("newCell1").childNodes[0].value).trim() != "" && (document.getElementById("newCell2").childNodes[0].value).trim() != "" && (document.getElementById("newCategory").value).trim() != "") {
            btn.target.innerHTML = "Adding"
            btn.target.disabled = true;
            createRecord("menu", {item: document.getElementById("newCell1").childNodes[0].value, price: document.getElementById("newCell2").childNodes[0].value, type: document.getElementById("newCategory").value}, function(record) {
                btn.target.innerHTML = "Add"
                btn.target.disabled = false;
                menu.push({
                    id: record.id,
                    item: record.item,
                    price: record.price,
                    type: record.type
                })
                updateMenu(menu)
            });
        } else {
            message("Fill up all the spaces first", 0)
        }
    }
    editCell.appendChild(addBtn)
    dishRow.appendChild(editCell);
    table.appendChild(dishRow);
    document.getElementById("menuHolder").appendChild(table)
    document.getElementById("menuHolder").appendChild(document.createElement("br"));
}
var menu;
readRecords("menu", {}, function(records) {
    menu = records;
    updateMenu(records);
});
//Feedbacks
document.getElementById("feedbacks").onclick = function() {
    setScreen("feedbackScrn")
    document.getElementById("homeBtn").hidden = false;
    document.getElementById("feedbackHolder").innerHTML = "Please wait..."
    readRecords("feedbacks", {}, function(records) {
        document.getElementById("feedbackHolder").innerHTML = "";
        for (let f = 0; f < records.length; f++) {
            let holder = document.createElement("div")
            holder.style.padding = "5px"
            holder.style.borderRadius = "10px";
            holder.style.borderWidth = "1px"
            holder.style.borderStyle = "solid"
            holder.style.width = "95%"
            document.getElementById("feedbackHolder").appendChild(holder)
            let name = document.createElement("b")
            if (records[f].username != null) {
                name.innerHTML = records[f].username;
            } else {
                name.innerHTML = "Anonymous";
            }
            holder.appendChild(name)
            let message = document.createElement("div")
            message.innerHTML = records[f].message
            holder.appendChild(message)
            document.getElementById("feedbackHolder").appendChild(document.createElement("br"))
            document.getElementById("feedbackHolder").appendChild(document.createElement("br"))
            document.body.scrollTop = document.body.scrollHeight
        }
    })
}
//Record updates
function playSound(sound) {
    let aud = document.createElement("audio")
    aud.src = sound;
    aud.play();
} 
onRecordEvent("orders", function(record, eventType) {
    if (eventType == 'create') {
        message("New order!", 0)
        playSound("assets/bell.mp3");
    }
});
onRecordEvent("preOrders", function(record, eventType) {
    if (eventType == 'create') {
        message("New pre order!", 0)
        playSound("assets/bell.mp3");
    }
    if (eventType == 'update') {
        message("Seems like the one who pre ordered just arrived!", 0)
        playSound("assets/arrived.mp3");
    }
});
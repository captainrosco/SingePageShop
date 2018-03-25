var currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();
    currentList.items = new Array();

    showShoppingList();
}

function showShoppingList() {
    $("#shoppingListTitle").html(currentList.name);
    $("#shoppingListItems").empty();
    $("#createListContainer").hide();
    $("#shoppingListContainer").show();

    $("#newItem").focus();
    $("#newItem").keyup(function (ev) {
        if (ev.keyCode === 13) {
            addItem();
        }
    });
}

function getShoppingListById(id) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/ShoppingList/" + id,
        success: function (result) {
            currentList = result;
            showShoppingList();
            drawItems();
        }

    });
}

function addItem() {
    var newItem = {};
    newItem.name = $("#newItem").val();
    currentList.items.push(newItem);
    $("#newItem").val('');

    drawItems();
}

function drawItems() {
    var $list = $("#shoppingListItems").empty();
   
    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        var $deleteBtn = $("<button onclick='deleteItem("+ i +")'>X</button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem(" + i +")'>C</button>").appendTo($li);
        $li.appendTo($list);
    }
}

function deleteItem(index) {
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(index) {
    if ($("#item_" + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked");
    } else {
        $("#item_" + index).addClass("checked");
    }
}

$(document).ready(function () {
    console.info("ready");
    $("#shoppingListName").focus();
    $("#shoppingListName").keyup(function (ev) {
        if (ev.keyCode === 13) {
            createShoppingList();
        }
    });
});
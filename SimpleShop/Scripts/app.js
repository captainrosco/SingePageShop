var currentList = {};

function createShoppingList() {
    currentList.name = $("#shoppingListName").val();
    currentList.items = new Array();

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "api/ShoppingList/",
        data: currentList,
        success: function (result) {            
            showShoppingList();
        }
    });
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
        type: 'GET',
        dataType: 'json',
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
    newItem.showShoppingListId = currentList.id;
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: "api/Item/",
        data: newItem,
        success: function (result) {
            currentList = result;
            drawItems();
            $("#newItem").val("");
        }
    });
}

function drawItems() {
    var $list = $("#shoppingListItems").empty();
   
    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        var $deleteBtn = $("<button onclick='deleteItem("+ i +")'>X</button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem(" + i +")'>C</button>").appendTo($li);

        if (currentItem.checked) {
            $li.addClass("Checked");
        }

        $li.appendTo($list);
    }
}

function deleteItem(index) {
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(index) {
    var item = currentList.items[index];
    item.checked = !item.checked;

    $.ajax({
        type: 'PUT',
        dataType: 'json',
        url: "api/Item/" + index,
        data: item,
        success: function (result) {
            currentList = result;
            drawItems();
        }
    });


}

$(document).ready(function () {
    console.info("ready");
    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");
    if (idIndex !== -1) {
        getShoppingListById(pageUrl.substring(idIndex + 4));
    }

    $("#shoppingListName").focus();
    $("#shoppingListName").keyup(function (ev) {
        if (ev.keyCode === 13) {
            createShoppingList();
        }
    });
});
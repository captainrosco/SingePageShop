using SimpleShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SimpleShop.Controllers
{
    public class ItemController : ApiController
    {
      

        // POST: api/Item
        public IHttpActionResult Post([FromBody]Item item)
        {
            ShoppingList shoppingList =
                ShoppingListController.shoppingLists.Where(s => s.Id == item.ShoppingListId).FirstOrDefault();
            
            if(shoppingList == null) {
                return NotFound();
            }

            shoppingList.Items.Add(item);
            return Ok(shoppingList);
        }

        // PUT: api/Item/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Item/5
        public void Delete(int id)
        {
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task2.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Task2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        static List<User> users = new List<User>();

        public LoginController()
        {
            if (users.Count <= 0)
            {
                User user = new User();
                user.Id = 1;
                user.FullName = "omar";
                user.UserName = "omar";
                user.Password = "123";
                user.Email = "omar@test.com";
                user.Mobile = "0798287249";

                users.Add(user);

                User user2 = new User();

                user2.Id = 2;
                user2.FullName = "tareq";
                user2.UserName = "tareq";
                user2.Password = "123";
                user2.Email = "tareq@test.com";
                user2.Mobile = "0777777249";

                users.Add(user2);

                User user3 = new User();

                user3.Id = 3;
                user3.FullName = "ahmad";
                user3.UserName = "ahmad";
                user3.Password = "123";
                user3.Email = "ahmad@test.com";
                user3.Mobile = "0777777249";

                users.Add(user3);

                User user4 = new User();

                user4.Id = 4;
                user4.FullName = "mahmoud";
                user4.UserName = "mahmoud";
                user4.Password = "123";
                user4.Email = "Mahmoud@test.com";
                user4.Mobile = "0777777249";

                users.Add(user4);
            }

        }

        [Route("GetAllUser")]
        [HttpGet]
        public List<User> GetAllUser()
        {
            return users;
        }

        [Route("LoginUser")]
        [HttpPost]
        public bool LoginUser(string username, string password)
        {
            bool flag = false;
            if (username != null|| !string.IsNullOrEmpty(username))
            {
                users.ForEach(e =>
                {
                    if (e.UserName == username && e.Password == password)
                    {
                        flag = true;

                    }
                });

            }

            return flag;
        }

        [Route("GetUserById")]
        [HttpGet]
        public User GetUserById(int Id)
        {
            User ouser = new User();

            users.ForEach(e =>
            {
                if (e.Id == Id)
                {
                    ouser.Id = Id;
                    ouser.UserName = e.UserName;
                    ouser.FullName = e.FullName;
                    ouser.Password = e.Password;
                    ouser.Mobile = e.Mobile;
                    ouser.Email = e.Email;

                }
            });

            return ouser;
        }

        [Route("DeleteById")]
        [HttpGet]
        public IActionResult DeleteById(int Id)
        {
            for (int i = 0; i < users.Count; i++)
            {
                if (users[i].Id == Id)
                {
                    users.RemoveAt(i);
                }
            }
            return Ok();
        }

        [Route("AddEditUser")]
        [HttpPost]
        public IActionResult AddEditUser([FromBody] User ouser)
        {
            if (ouser != null)
            {
                if (ouser.Id == null || ouser.Id == 0)
                {
                    //Write insert
                    ouser.Id = users[users.Count - 1].Id + 1;
                    users.Add(ouser);
                }
                else
                {
                    //Write Update
                    users.ForEach(e =>
                    {
                        if (e.Id == ouser.Id)
                        {
                            e.UserName = ouser.UserName;
                            e.FullName = ouser.FullName;
                            e.Password = ouser.Password;
                            e.Mobile = ouser.Mobile;
                            e.Email = ouser.Email;

                        }
                    });
                }

            }

            return Ok();
        }
        // GET api/<Login>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Login>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Login>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Login>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

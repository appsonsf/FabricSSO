using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecurityTokenWeb.Services;
using Sso.Remoting.Events;

namespace SecurityTokenWeb.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Produces("application/json")]
    [Route("api/MobileLogin")]
    public class MobileLoginController : Controller
    {
        private readonly IMobileCodeSender _codeSender;

        public MobileLoginController(IMobileCodeSender codeSender)
        {
            _codeSender = codeSender;
        }

        // GET: api/token
        [HttpGet]
        public async Task<ActionResult<string>> GetAsync([Required]string mobile)
        {
            if (!ModelState.IsValid)
                return BadRequest("mobile is null");
            await _codeSender.SendAsync(new string[] { mobile });
            return "";
        }
    }
}
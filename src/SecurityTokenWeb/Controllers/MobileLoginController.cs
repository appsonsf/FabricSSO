using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecurityTokenWeb.Services;

namespace SecurityTokenWeb.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Produces("application/json")]
    [Route("api/MobileLogin")]
    public class MobileLoginController : Controller
    {
        private readonly IMobileLoginCodeSender _codeSender;

        public MobileLoginController(IMobileLoginCodeSender codeSender)
        {
            _codeSender = codeSender;
        }

        // GET: api/token
        [HttpGet]
        public async Task<ActionResult<string>> GetAsync([Required]string mobile)
        {
            if (!ModelState.IsValid)
                return BadRequest("mobile is null");
            return await _codeSender.Send(mobile);
        }
    }
}
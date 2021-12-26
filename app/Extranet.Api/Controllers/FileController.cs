using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Extranet.Api.Controllers
{
    [Route( "[controller]" )]
    public class FileController : Controller
    {
        [HttpPost, Route( "upload" )]
        public async Task<IActionResult> UploadFile( IFormFile uploadedFile )
        {
            try
            {
                if ( uploadedFile != null )
                {
                    string projectPath = System.IO.Directory.GetCurrentDirectory();
                    string fileName = Guid.NewGuid().ToString() + "." + uploadedFile.FileName.Split( '.' )[ 1 ];
                    string path = "/Files/" + fileName;
                    using ( var fileStream = new FileStream( projectPath + path, FileMode.Create ) )
                    {
                        await uploadedFile.CopyToAsync( fileStream );
                    }

                    return Ok( "file/download/" + fileName );
                }
                return BadRequest();
            }
            catch ( Exception e )
            {
                return BadRequest( e.Message );
            }
        }

        [HttpGet, Route( "download/{filename}" )]
        public async Task<IActionResult> DownloadFile( string filename )
        {
            string filePath = Directory.GetCurrentDirectory() + "/Files/" + filename;
            var bytes = await System.IO.File.ReadAllBytesAsync( filePath );

            return File( bytes, "image/" + filename.Split( '.' )[ 1 ] );
        }

    }
}

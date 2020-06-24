import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {
  let localFiles: string[] = [];

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get( "/deleteLocalFiles/", async ( req, res ) => {

    for(var i = 0; i<localFiles.length; i++){
    console.log(localFiles[i]);
    }
    console.log(localFiles.length);
    deleteLocalFiles(localFiles);
    res.send("Local files deleted successfully");
  });


app.get("/filteredimage/", async ( req, res) => {

    let image_url = req.query.image_url;
    let abosultePath: string;
    if(!image_url){
      return res.status(400)
                  .send(`Image URL is required`);
    }
    await filterImageFromURL(image_url).then(function(result){
      abosultePath = result;
    });
    localFiles.push(abosultePath);
    console.log(abosultePath);
    res.sendFile(abosultePath, function(err){
      if (err) {
        console.log(err); // Check error if you want
      }
      console.log("Local file deleted: " + abosultePath);
      deleteLocalFiles(localFiles); 
    });
  });

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
// app.js
import { Hono } from "https://deno.land/x/hono/mod.ts";
import { registerUser } from "./routes/register.js"; // Import register logic
import { loginUser } from "./routes/login.js";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";
const app = new Hono();

app.use('/static/*', serveStatic({ root: '.'}));
// app.use('/static/*', serveStatic({ root: './static'}));

// Serve index page
app.get('/', async (c) => {
    return c.html(await Deno.readTextFile('./views/index.html'));
   });
// Serve the registration form
app.get('/register', async (c) => {
 return c.html(await Deno.readTextFile('./views/register.html'));
});

// Serve the login form
app.get('/login', async (c) => {
    return c.html(await Deno.readTextFile('./views/login.html'));
});


// Route for user registration (POST request)
app.post('/register', registerUser);
app.post('/login', loginUser);
Deno.serve(app.fetch);
// Run the app using the command:
// deno run --allow-net --allow-env --allow-read --watch app.js
// app.js
import { Hono } from "https://deno.land/x/hono/mod.ts";
import { registerUser } from "./routes/register.js"; // Import register logic
import { loginUser } from "./routes/login.js";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";
const app = new Hono();

app.use('*', (c, next) => {
    c.header('Content-Type', 'text/html');

    c.header(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self'; " +
        "img-src 'self'; " +
        "frame-ancestors 'none'; " +
        "form-action 'self';"
      );
      
      // Set X-Frame-Options header to prevent Clickjacking
      c.header('X-Frame-Options', 'DENY'); // Completely deny embedding

      c.header('X-Content-Type-Options', 'nosniff');

      return next();
});

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